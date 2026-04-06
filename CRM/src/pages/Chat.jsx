import { useEffect, useMemo, useState } from 'react';
import { apiRequest } from '../lib/api';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useSocket } from '../context/SocketContext';
import { formatDate } from '../lib/format';

export default function Chat() {
  const { token, user } = useAuth();
  const { theme } = useTheme();
  const { socket } = useSocket();
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState('');

  useEffect(() => {
    apiRequest('/api/chat/users', { token }).then((data) => {
      const filteredUsers = data.users.filter((item) => item.id !== user.id);
      setUsers(filteredUsers);
      if (filteredUsers[0]) {
        setSelectedUserId(filteredUsers[0].id);
      }
    }).catch(() => {});
  }, [token, user]);

  useEffect(() => {
    if (!selectedUserId) {
      return;
    }

    apiRequest(`/api/chat/messages/${selectedUserId}`, { token }).then((data) => setMessages(data.messages)).catch(() => {});
  }, [selectedUserId, token]);

  useEffect(() => {
    if (!socket) {
      return undefined;
    }

    const handleMessage = (message) => {
      if (message.sender.id === selectedUserId || message.recipient.id === selectedUserId) {
        setMessages((current) => [...current, message]);
      }
    };

    const handlePresence = ({ userId, isOnline, lastSeenAt }) => {
      setUsers((current) => current.map((item) => (
        item.id === userId ? { ...item, isOnline, lastSeenAt } : item
      )));
    };

    socket.on('chat:message', handleMessage);
    socket.on('presence:update', handlePresence);

    return () => {
      socket.off('chat:message', handleMessage);
      socket.off('presence:update', handlePresence);
    };
  }, [socket, selectedUserId]);

  const selectedUser = useMemo(
    () => users.find((item) => item.id === selectedUserId),
    [users, selectedUserId],
  );

  async function handleSend() {
    if (!selectedUserId || !draft.trim()) {
      return;
    }

    const body = draft.trim();
    setDraft('');

    if (socket) {
      socket.emit('chat:send', { recipientId: selectedUserId, body });
      return;
    }

    const data = await apiRequest(`/api/chat/messages/${selectedUserId}`, {
      method: 'POST',
      token,
      body: { body },
    });
    setMessages((current) => [...current, data.message]);
  }

  return (
    <div className="grid min-h-[75vh] gap-6 xl:grid-cols-[300px_1fr]">
      <aside className={theme === 'dark' ? 'rounded-3xl border border-white/10 bg-white/6 p-5' : 'rounded-3xl border border-slate-200 bg-white p-5 shadow-sm'}>
        <h1 className={theme === 'dark' ? 'text-2xl font-semibold text-white' : 'text-2xl font-semibold text-slate-900'}>Team chat</h1>
        <div className="mt-5 space-y-3">
          {users.map((member) => (
            <button
              key={member.id}
              type="button"
              onClick={() => setSelectedUserId(member.id)}
              className={[
                'w-full rounded-2xl border p-4 text-left transition',
                selectedUserId === member.id
                  ? 'border-cyan-400/60 bg-cyan-500/10'
                  : theme === 'dark'
                    ? 'border-white/10 bg-slate-950/50 hover:bg-white/5'
                    : 'border-slate-200 bg-slate-50 hover:bg-slate-100',
              ].join(' ')}
            >
              <div className="flex items-center justify-between">
                <p className={theme === 'dark' ? 'font-medium text-white' : 'font-medium text-slate-900'}>{member.name}</p>
                <span className={member.isOnline ? 'status-dot online' : 'status-dot offline'} />
              </div>
              <p className={theme === 'dark' ? 'mt-1 text-sm text-slate-400' : 'mt-1 text-sm text-slate-500'}>{member.role}</p>
            </button>
          ))}
        </div>
      </aside>

      <section className={theme === 'dark' ? 'rounded-3xl border border-white/10 bg-white/6 p-5' : 'rounded-3xl border border-slate-200 bg-white p-5 shadow-sm'}>
        <div className={theme === 'dark' ? 'border-b border-white/10 pb-4' : 'border-b border-slate-200 pb-4'}>
          <h2 className={theme === 'dark' ? 'text-xl font-semibold text-white' : 'text-xl font-semibold text-slate-900'}>{selectedUser?.name || 'Select a teammate'}</h2>
          <p className={theme === 'dark' ? 'text-sm text-slate-400' : 'text-sm text-slate-500'}>
            {selectedUser?.isOnline ? 'Online now' : selectedUser ? `Last seen ${formatDate(selectedUser.lastSeenAt)}` : 'Choose a conversation'}
          </p>
        </div>

        <div className="mt-5 h-[460px] space-y-3 overflow-y-auto pr-2">
          {messages.map((message) => {
            const mine = message.sender.id === user.id;
            return (
              <div key={message.id} className={mine ? 'flex justify-end' : 'flex justify-start'}>
                <div className={mine ? 'chat-bubble mine' : 'chat-bubble'}>
                  <p className="text-sm">{message.body}</p>
                  <p className="mt-2 text-[11px] opacity-70">{formatDate(message.createdAt)}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-5 flex gap-3">
          <input
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault();
                handleSend();
              }
            }}
            placeholder="Write a message"
            className={theme === 'dark' ? 'flex-1 rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white' : 'flex-1 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900'}
          />
          <button type="button" onClick={handleSend} className="btn-primary">Send</button>
        </div>
      </section>
    </div>
  );
}
