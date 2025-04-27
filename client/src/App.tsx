import { useEffect } from 'react';

import {
  Route,
  Switch,
  useLocation,
} from 'wouter';

import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import LoginPage from '@/pages/login-page';
import NotFound from '@/pages/not-found';
import WelcomePage from '@/pages/welcome-page';
import { QueryClientProvider } from '@tanstack/react-query';

import { AuthProvider } from './context/auth-context';
import { useAuth } from './hooks/use-auth';
import { queryClient } from './lib/queryClient';

function ProtectedRoute({ component: Component }: { component: React.ComponentType }) {
  const { user, isLoading } = useAuth();
  const [, setLocation] = useLocation();
  
  useEffect(() => {
    if (!isLoading && !user) {
      setLocation("/");
    }
  }, [isLoading, user, setLocation]);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  return <Component />;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={LoginPage} />
      <Route path="/welcome">
        {() => <ProtectedRoute component={WelcomePage} />}
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;