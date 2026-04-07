import { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { SocketProvider } from './context/SocketContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import { initMarketing, trackPageView } from './lib/marketing';

const Login = lazy(() => import('./pages/Login'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Leads = lazy(() => import('./pages/Leads'));
const Pipeline = lazy(() => import('./pages/Pipeline'));
const Chat = lazy(() => import('./pages/Chat'));
const Tracking = lazy(() => import('./pages/Tracking'));
const Team = lazy(() => import('./pages/Team'));
const Backups = lazy(() => import('./pages/Backups'));
const Settings = lazy(() => import('./pages/Settings'));
const PublicLeadForm = lazy(() => import('./pages/PublicLeadForm'));
const LinkedInApplicationForm = lazy(() => import('./pages/LinkedInApplicationForm'));

function AppLoader() {
  return <div className="min-h-screen bg-slate-950 text-slate-200 flex items-center justify-center">Loading...</div>;
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
        <AuthProvider>
          <SocketProvider>
            <Suspense fallback={<AppLoader />}>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/public/:token" element={<PublicLeadForm />} />
                <Route path="/apply" element={<LinkedInApplicationForm />} />
                <Route path="/alternance-2026" element={<Navigate to="/apply" replace />} />
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
      </ThemeProvider>
    </BrowserRouter>
  );
}
