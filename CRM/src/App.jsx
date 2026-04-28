import { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { SocketProvider } from './context/SocketContext';
import { ToastProvider } from './context/ToastContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import { initMarketing, trackPageView } from './lib/marketing';

const Login = lazy(() => import('./pages/Login'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Leads = lazy(() => import('./pages/Leads'));
const Treated = lazy(() => import('./pages/Treated'));
const Pipeline = lazy(() => import('./pages/Pipeline'));
const Chat = lazy(() => import('./pages/Chat'));
const Tracking = lazy(() => import('./pages/Tracking'));
const Team = lazy(() => import('./pages/Team'));
const Backups = lazy(() => import('./pages/Backups'));
const Settings = lazy(() => import('./pages/Settings'));
const PublicLeadForm = lazy(() => import('./pages/PublicLeadForm'));
const LinkedInApplicationForm = lazy(() => import('./pages/LinkedInApplicationForm'));

function AppLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-slate-200">
      <div className="w-full max-w-lg rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur">
        <div className="skeleton-shimmer h-4 w-32 rounded-full" />
        <div className="mt-6 space-y-3">
          <div className="skeleton-shimmer h-12 rounded-2xl" />
          <div className="skeleton-shimmer h-12 rounded-2xl" />
          <div className="skeleton-shimmer h-40 rounded-3xl" />
        </div>
      </div>
    </div>
  );
}

function RouteTracker() {
  const location = useLocation();

  useEffect(() => {
    initMarketing();
  }, []);

  useEffect(() => {
    trackPageView(`${location.pathname}${location.search}${location.hash}`);
  }, [location]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <RouteTracker />
      <ThemeProvider>
        <ToastProvider>
          <AuthProvider>
            <SocketProvider>
              <Suspense fallback={<AppLoader />}>
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/public/:token" element={<PublicLeadForm />} />
                  <Route path="/apply" element={<LinkedInApplicationForm />} />
                  <Route path="/alternance-2026" element={<Navigate to="/apply" replace />} />
                  <Route path="/inscription" element={<LinkedInApplicationForm />} />
                  <Route
                    element={(
                      <ProtectedRoute>
                        <Layout />
                      </ProtectedRoute>
                    )}
                  >
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/leads" element={<Leads />} />
                    <Route path="/treated" element={<Treated />} />
                    <Route path="/pipeline" element={<Pipeline />} />
                    <Route path="/chat" element={<Chat />} />
                    <Route path="/tracking" element={<Tracking />} />
                    <Route path="/team" element={<ProtectedRoute roles={['admin']}><Team /></ProtectedRoute>} />
                    <Route path="/backups" element={<ProtectedRoute roles={['admin']}><Backups /></ProtectedRoute>} />
                    <Route path="/settings" element={<Settings />} />
                  </Route>
                </Routes>
              </Suspense>
            </SocketProvider>
          </AuthProvider>
        </ToastProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
