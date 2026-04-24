import { Routes, Route } from 'react-router-dom';
import Dashboard from '@/pages/Dashboard';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { Toaster } from '@/components/ui/sonner';

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <ErrorBoundary>
              <Dashboard />
            </ErrorBoundary>
          }
        />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
