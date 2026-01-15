import { AvaliacaoProvider } from './contexts/AvaliacaoContext';
import { DashboardLayout } from './layouts/DashboardLayout';
import { AvaliacaoPage } from './pages/AvaliacaoPage';

function App() {
  return (
    // Erro TS2741 ocorre se você não colocar nada dentro das tags abaixo
    <AvaliacaoProvider>
      <DashboardLayout>
        <AvaliacaoPage />
      </DashboardLayout>
    </AvaliacaoProvider>
  );
}