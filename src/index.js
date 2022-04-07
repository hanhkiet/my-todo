import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './pages/register.page';
import NotFoundPage from './pages/not-found.page';
import Main from './pages/main.page';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="sign-in" element={<Register action="sign-in" />} />
        <Route path="sign-up" element={<Register action="sign-up" />} />
        <Route path="main" element={<Main />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// get user data by navigating to path '/userId'
// get user data about list todo by navigating path '/userId/listId'
// get user data about specific task in a list by navigatin to path '/userId/listId/taskId'

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
