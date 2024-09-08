import { createRoot } from 'react-dom/client';
import AppRoutes from './Routes';
import { BrowserRouter } from 'react-router-dom';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <AppRoutes />
  </BrowserRouter>,
);