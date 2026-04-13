import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children, roles }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-app px-6 py-10 text-app">
        <div className="mx-auto flex max-w-xl flex-col items-center justify-center rounded-3xl border border-white/10 bg-white/6 px-8 py-16 text-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-cyan-400/20 border-t-cyan-300" />
          <p className="mt-6 text-xl font-semibold text-white">Loading workspace...</p>
          <p className="mt-3 text-sm text-slate-300">Connexion au CRM et reveil du backend. Si Render etait en veille, cela peut prendre quelques secondes.</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
