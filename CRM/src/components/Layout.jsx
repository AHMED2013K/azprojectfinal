import { Outlet } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { useAuth } from '../context/AuthContext';
import { useSocket } from '../context/SocketContext';
import { apiRequest } from '../lib/api';
import { useTheme } from '../context/ThemeContext';

export default function Layout() {
  const { token } = useAuth();
  const { socket } = useSocket();
  const { theme } = useTheme();
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [toasts, setToasts] = useState([]);
  const audioRef = useRef(null);
  const [audioUnlocked, setAudioUnlocked] = useState(false);

  const pushToast = (item) => {
    const toastId = `${item.id || item._id || Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    setToasts((current) => [...current, { id: toastId, title: item.title, body: item.body }]);
    window.setTimeout(() => {
      setToasts((current) => current.filter((toast) => toast.id !== toastId));
    }, 4200);
  };

  function playNotificationSound() {
    const sound = audioRef.current;
    if (!sound) {
      return;
    }

    sound.currentTime = 0;
    sound.volume = 1;
    sound.play().catch(() => {});
  }

  useEffect(() => {
    const sound = new Audio('/ringtone.mp3');
    sound.preload = 'auto';
    audioRef.current = sound;

    const unlockAudio = () => {
      if (!audioRef.current || audioUnlocked) {
        return;
      }

      audioRef.current.volume = 0;
      audioRef.current.play()
        .then(() => {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
          audioRef.current.volume = 1;
          setAudioUnlocked(true);
        })
        .catch(() => {});
    };

    window.addEventListener('pointerdown', unlockAudio, { once: true });
    window.addEventListener('keydown', unlockAudio, { once: true });

    return () => {
      window.removeEventListener('pointerdown', unlockAudio);
      window.removeEventListener('keydown', unlockAudio);
      audioRef.current = null;
    };
  }, [audioUnlocked]);

  useEffect(() => {
    async function loadNotifications() {
      const data = await apiRequest('/api/notifications', { token });
      setNotifications(data.notifications);
    }

    loadNotifications().catch(() => {});
  }, [token]);

  useEffect(() => {
    if (!socket) {
      return undefined;
    }

    const handleAnnouncement = (announcement) => {
      setNotifications((current) => [
        {
          _id: announcement.id,
          title: announcement.title,
          body: announcement.body,
          readAt: null,
        },
        ...current,
      ]);
      pushToast(announcement);
    };

    const handleNotification = (notification) => {
      setNotifications((current) => [
        {
          _id: notification.id,
          title: notification.title,
          body: notification.body,
          type: notification.type,
          readAt: null,
        },
        ...current,
      ]);
      pushToast(notification);
      playNotificationSound();
    };

    socket.on('announcement:new', handleAnnouncement);
    socket.on('notification:new', handleNotification);
    return () => {
      socket.off('announcement:new', handleAnnouncement);
      socket.off('notification:new', handleNotification);
    };
  }, [socket]);

  async function markAllNotificationsRead() {
    await apiRequest('/api/notifications/read-all', { method: 'POST', token });
    setNotifications((current) => current.map((item) => ({ ...item, readAt: item.readAt || new Date().toISOString() })));
  }

  return (
    <div className={theme === 'dark' ? 'min-h-screen bg-app' : 'min-h-screen bg-slate-100 text-slate-900'}>
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex min-h-screen flex-1 flex-col">
          <div className="pointer-events-none fixed right-5 top-5 z-[80] flex w-full max-w-sm flex-col gap-3">
            {toasts.map((toast) => (
              <div
                key={toast.id}
                className={theme === 'dark'
                  ? 'pointer-events-auto overflow-hidden rounded-2xl border border-cyan-400/15 bg-slate-950/92 shadow-2xl backdrop-blur'
                  : 'pointer-events-auto overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl'}
              >
                <div className="h-1.5 bg-gradient-to-r from-sky-500 via-cyan-400 to-emerald-400" />
                <div className="p-4">
                  <p className={theme === 'dark' ? 'text-sm font-semibold text-white' : 'text-sm font-semibold text-slate-900'}>
                    {toast.title}
                  </p>
                  <p className={theme === 'dark' ? 'mt-1 text-sm text-slate-300' : 'mt-1 text-sm text-slate-600'}>
                    {toast.body}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <Header
            notifications={notifications}
            onOpenNotifications={() => setShowNotifications((value) => !value)}
          />

          {showNotifications && (
            <div className={theme === 'dark' ? 'mx-6 mt-4 rounded-3xl border border-white/10 bg-slate-950/85 p-5 shadow-2xl' : 'mx-6 mt-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-xl'}>
              <div className="mb-4 flex items-center justify-between">
                <h3 className={theme === 'dark' ? 'text-lg font-semibold text-white' : 'text-lg font-semibold text-slate-900'}>Notifications</h3>
                <button type="button" onClick={markAllNotificationsRead} className={theme === 'dark' ? 'text-sm text-cyan-200' : 'text-sm text-sky-700'}>
                  Mark all read
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

          <main className="flex-1 px-6 py-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
