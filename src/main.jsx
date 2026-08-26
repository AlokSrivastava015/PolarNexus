import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import App from './App';
import { ThemeProvider } from './components/common/ThemeContext';

createRoot(document.getElementById('root')).render(
  <StrictMode><ThemeProvider><App /></ThemeProvider></StrictMode>,
);
