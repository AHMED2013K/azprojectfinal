import { Outlet, useLocation } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Sidebar from './Sidebar';
import Header from './Header';
import { useAuth } from '../context/AuthContext';
import { useSocket } from '../context/SocketContext';
import { apiRequest } from '../lib/api';
import { useTheme } from '../context/ThemeContext';
import { useToast } from '../context/ToastContext';
import { prefetchRouteModule } from '../lib/prefetch';

function appendNotification(current, nextNotification) {
  const nextId = nextNotification._id || nextNotification.id;
  if (!nextId) {
    return [nextNotification, ...current];
  }

  const deduped = current.filter((item) => (item._id || item.id) !== nextId);
  return [nextNotification, ...deduped];
}

export default function Layout() {
  const MotionMain = motion.div;
  const location = useLocation();
  const { token } = useAuth();
  const { socket } = useSocket();
  const { theme } = useTheme();
  const { showToast } = useToast();
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isMarkingNotificationsRead, setIsMarkingNotificationsRead] = useState(false);
  const audioUnlockedRef = useRef(false);
  const ringtoneRef = useRef(null);
  const samuraiRef = useRef(null);

  function isTbsNotification(notification = {}) {
    const source = String(notification.source || '').toLowerCase();
    const campaign = String(notification.campaign || '').toLowerCase();
    const title = String(notification.title || '').toLowerCase();
    const body = String(notification.body || '').toLowerCase();

    return source === 'tbs-event-form'
      || campaign === 'tbs event'
      || title.includes('tbs event')
      || body.includes('tbs event');
  }

  function isStudentJobNotification(notification = {}) {
    const source = String(notification.source || '').toLowerCase();
    const title = String(notification.title || '').toLowerCase();
    const body = String(notification.body || '').toLowerCase();

    return source === 'student-job-form'
      || title.includes('student-job')
      || body.includes('student-job');
  }

  function playNotificationSound(notification = {}) {
    if (!audioUnlockedRef.current) {
      return;
    }

    const useSamuraiSound = isTbsNotification(notification) || isStudentJobNotification(notification);
    const primaryPrototype = useSamuraiSound ? samuraiRef.current : ringtoneRef.current;
    const fallbackPrototype = useSamuraiSound ? ringtoneRef.current : null;

    if (!primaryPrototype) {
      return;
    }

    const primarySound = primaryPrototype.cloneNode();
    primarySound.volume = 1;
    primarySound.currentTime = 0;
    primarySound.play().catch(() => {
      if (!fallbackPrototype) {
        return;
      }

      const fallbackSound = fallbackPrototype.cloneNode();
      fallbackSound.currentTime = 0;
      fallbackSound.volume = 1;
      fallbackSound.play().catch(() => {});
    });
  }

  function unlockAudioPlayback() {
    if (audioUnlockedRef.current) {
      return;
    }

    [ringtoneRef.current, samuraiRef.current].forEach((audio) => {
      if (!audio) {
        return;
      }

      try {
        audio.muted = true;
        audio.volume = 0;
        audio.currentTime = 0;
        const playAttempt = audio.play();
        if (playAttempt && typeof playAttempt.then === 'function') {
          playAttempt
            .then(() => {
              audio.pause();
              audio.currentTime = 0;
              audio.muted = false;
              audio.volume = 1;
            })
            .catch(() => {
              audio.muted = false;
              audio.volume = 1;
            });
        } else {
          audio.pause();
          audio.currentTime = 0;
          audio.muted = false;
          audio.volume = 1;
        }
      } catch {
        audio.muted = false;
        audio.volume = 1;
      }
    });

    audioUnlockedRef.current = true;
  }

  useEffect(() => {
    const ringtone = new Audio('/ringtone.mp3');
    ringtone.preload = 'auto';
    ringtone.load();
    ringtoneRef.current = ringtone;

    const samurai = new Audio('/samurai.mp3');
    samurai.preload = 'auto';
    samurai.load();
    samuraiRef.current = samurai;

    const unlockAudio = () => {
      unlockAudioPlayback();
    };

    window.addEventListener('pointerdown', unlockAudio);
    window.addEventListener('keydown', unlockAudio);
    window.addEventListener('click', unlockAudio);

    return () => {
      window.removeEventListener('pointerdown', unlockAudio);
      window.removeEventListener('keydown', unlockAudio);
      window.removeEventListener('click', unlockAudio);
      audioUnlockedRef.current = false;
      ringtone.pause();
      ringtoneRef.current = null;
      samurai.pause();
      samuraiRef.current = null;
    };
  }, []);

  useEffect(() => {
    async function loadNotifications() {
      const data = await apiRequest('/api/notifications', { token });
      setNotifications(data.notifications);
    }

    loadNotifications().catch(() => {});
  }, [token]);

  useEffect(() => {
    ['/dashboard', '/leads', '/candidatures', '/pipeline', '/settings'].forEach((route) => {
      prefetchRouteModule(route);
    });
  }, []);

  useEffect(() => {
    if (!socket) {
      return undefined;
    }

    const handleAnnouncement = (announcement) => {
      setNotifications((current) => appendNotification(current, {
          _id: announcement.id,
          title: announcement.title,
          body: announcement.body,
          readAt: null,
        }));
      showToast({
        title: announcement.title,
        message: announcement.body,
        type: 'info',
      });
    };

    const handleNotification = (notification) => {
      setNotifications((current) => appendNotification(current, {
          _id: notification.id,
          title: notification.title,
          body: notification.body,
          type: notification.type,
          source: notification.source || '',
          campaign: notification.campaign || '',
          readAt: null,
        }));
      showToast({
        title: notification.title,
        message: notification.body,
        type: notification.type === 'system' ? 'info' : 'success',
      });
      playNotificationSound(notification);
    };

    socket.on('announcement:new', handleAnnouncement);
    socket.on('notification:new', handleNotification);
    return () => {
      socket.off('announcement:new', handleAnnouncement);
      socket.off('notification:new', handleNotification);
    };
  }, [showToast, socket]);

  async function markAllNotificationsRead() {
    if (isMarkingNotificationsRead || notifications.length === 0) {
      return;
    }

    setIsMarkingNotificationsRead(true);
    try {
      await apiRequest('/api/notifications/read-all', { method: 'POST', token });
      setNotifications((current) => current.map((item) => ({ ...item, readAt: item.readAt || new Date().toISOString() })));
    } catch (error) {
      showToast({
        type: 'error',
        title: 'Notifications',
        message: error.message || 'Impossible de marquer les notifications comme lues.',
      });
    } finally {
      setIsMarkingNotificationsRead(false);
    }
  }

  return (
    <div className={theme === 'dark' ? 'min-h-screen overflow-x-hidden bg-app' : 'min-h-screen overflow-x-hidden bg-slate-100 text-slate-900'}>
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex min-h-screen min-w-0 flex-1 flex-col">
          <Header
            notifications={notifications}
            onOpenNotifications={() => setShowNotifications((value) => !value)}
          />

          {showNotifications && (
            <div className={theme === 'dark' ? 'mx-6 mt-4 rounded-3xl border border-white/10 bg-slate-950/85 p-5 shadow-2xl' : 'mx-6 mt-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-xl'}>
              <div className="mb-4 flex items-center justify-between">
                <h3 className={theme === 'dark' ? 'text-lg font-semibold text-white' : 'text-lg font-semibold text-slate-900'}>Notifications</h3>
                <button
                  type="button"
                  onClick={markAllNotificationsRead}
                  disabled={isMarkingNotificationsRead || notifications.length === 0}
                  className={`${theme === 'dark' ? 'text-sm text-cyan-200' : 'text-sm text-sky-700'} disabled:cursor-not-allowed disabled:opacity-50`}
                >
                  {isMarkingNotificationsRead ? 'Updating...' : 'Mark all read'}
                </button>
              </div>
              <div className="space-y-3">
                {notifications.length === 0 && <p className={theme === 'dark' ? 'text-sm text-slate-400' : 'text-sm text-slate-500'}>No notifications yet.</p>}
                {notifications.map((notification) => (
                  <div key={notification._id} className={theme === 'dark' ? 'rounded-2xl border border-white/5 bg-white/5 p-4' : 'rounded-2xl border border-slate-200 bg-slate-50 p-4'}>
                    <p className={theme === 'dark' ? 'font-medium text-white' : 'font-medium text-slate-900'}>{notification.title}</p>
                    <p className={theme === 'dark' ? 'mt-1 text-sm text-slate-300' : 'mt-1 text-sm text-slate-600'}>{notification.body}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <main className="min-w-0 flex-1 overflow-x-hidden px-4 py-6 sm:px-6">
            <AnimatePresence mode="wait" initial={false}>
              <MotionMain
                key={location.pathname}
                initial={{ opacity: 0, y: 14, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="h-full min-w-0"
              >
                <Outlet />
              </MotionMain>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
}
