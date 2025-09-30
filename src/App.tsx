import './App.css';
import { BrowserRouter } from "react-router-dom";
import AppRoutes from './routes/routes';
import { NotificationsProvider } from './context/NotificationsContext';
import { AuthProvider } from './context/AuthContext';
import { AlertsProvider, AlertsViewport, useAlerts } from './context/AlertsContext';
import React from 'react';

function App() {
  return (
    <AlertsProvider>
      <AuthProvider>
        <NotificationsProvider>
          <BrowserRouter>
            <GlobalAlertsBridge />
            <AlertsViewport />
            <AppRoutes />
          </BrowserRouter>
        </NotificationsProvider>
      </AuthProvider>
    </AlertsProvider>
  );
}

function GlobalAlertsBridge() {
  const { push } = useAlerts();
  React.useEffect(() => {
    const handler = (e: any) => {
      push(e.detail?.type === 'success' ? 'success' : 'error', e.detail?.message || '');
    };
    window.addEventListener('app_alert', handler as EventListener);
    return () => window.removeEventListener('app_alert', handler as EventListener);
  }, [push]);
  return null;
}

export default App;
