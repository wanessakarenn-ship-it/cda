import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppRoutes } from './routs/AppRoutes';
import { AuthProvider } from './contexts/AuthContext';

// Importação dos estilos globais e animações
import './styles/global.css';
import './styles/animations.css';

const rootElement = document.getElementById('root');

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
<React.StrictMode>
  <AuthProvider>
    <AppRoutes />
  </AuthProvider>
</React.StrictMode>
  );
} else {
  console.error("Não foi possível encontrar o elemento root. Verifique seu index.html.");
}