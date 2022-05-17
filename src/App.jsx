import './App.css';
import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import TaskDetail from './pages/task-detail.page';
import Settings from './pages/settings.page';
import Dashboard from './pages/dashboard.page';
import TaskBoard from './components/task-board.component';

const Register = React.lazy(() => import('./pages/register.page'));
const NotFoundPage = React.lazy(() => import('./pages/not-found.page'));

function App() {
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="signin" element={<Register action="sign-in" />} />
        <Route path="signup" element={<Register action="sign-up" />} />
        <Route path="forgot" element={<Register action="forgot" />} />
        <Route path="dashboard" element={<Dashboard />}>
          <Route path="settings" element={<Settings />} />
          <Route path=":collectionId" element={<TaskBoard />}>
            <Route path=":taskId" element={<TaskDetail />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
