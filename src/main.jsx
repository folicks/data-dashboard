import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import Layout from './routes/Layout.jsx';
import DetailView from './routes/DetailView.jsx';
import Dashboard from './routes/Dashboard.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="brewery/:id" element={<DetailView />} />
          </Route>
          <Route path="*" element={<div style={{color:'white',padding:'2rem'}}><h2>404 Not Found</h2></div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
