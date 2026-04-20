import { Routes, Route } from 'react-router-dom';
import Dashboard from '@/pages/Dashboard';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';

function App() {
  return (
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
  );
}

export default App;
