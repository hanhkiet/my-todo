import './App.css';
import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

const Register = React.lazy(() => import('./pages/register.page'));
const NotFoundPage = React.lazy(() => import('./pages/not-found.page'));
const Dashboard = React.lazy(() => import('./pages/dashboard.page'));
const TaskBoard = React.lazy(() => import('./components/task-board.component'));

function App() {
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="signin" element={<Register action="sign-in" />} />
        <Route path="signup" element={<Register action="sign-up" />} />
        <Route path="dashboard" element={<Dashboard />}>
          <Route path=":collectionId" element={<TaskBoard />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
