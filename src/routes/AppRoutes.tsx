import { Routes, Route, Navigate } from 'react-router-dom';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { useAuth } from '../contexts/AuthContext';
import type { UserRole } from '../config/navigation';

// Auth & Erros
import { LoginPage } from '../pages/auth/LoginPage';
import { NotFoundPage } from '../pages/erros/NotFoundPage';
import { UnauthorizedPage } from '../pages/erros/UnauthorizedPage';

// Colaborador
import ColaboradorDashboardPage from '../pages/colaborador/ColaboradorDashboardPage';
import { AvaliacaoPage } from '../pages/colaborador/AvaliacaoPage';
import FeedbackPage from '../pages/colaborador/FeedbackPage';
import MetasPage from '../pages/colaborador/MetasPage';

// Gestor / Admin (Novas Páginas Adicionadas)
import { GestorDashboardPage } from '../pages/gestor/GestorDashboardPage';
import { RelatoriosPage } from '../pages/gestor/RelatoriosPage';
import { AlertasPage } from '../pages/gestor/AlertasPage';
import { NineBoxPage } from '../pages/gestor/NineBoxPage';
import { ColaboradorDetalhePage } from '../pages/gestor/ColaboradorDetalhePage';

// Admin
import { AdminDashboardPage } from '../pages/admin/AdminDashboardPage';
import { CiclosPage } from '../pages/admin/CiclosPage';
import { MetasGlobaisPage } from '../pages/admin/MetasGlobaisPage';
import { ImportacaoColaboradoresPage } from '../pages/admin/ImportacaoColaboradoresPage';
import { NineBoxConfigPage } from '../pages/admin/NineBoxConfigPage';
import { UsuariosPage } from '../pages/admin/UsuariosPage';
import { CompetenciasPage } from '../pages/admin/CompetenciasPage';

interface PrivateRouteProps {
  children: JSX.Element;
  allowedRoles?: UserRole[];
}

const PrivateRoute = ({ children, allowedRoles }: PrivateRouteProps) => {
  const { user, loading } = useAuth(); // Padronizado para 'user'

  if (loading) return (
    <div className="h-screen w-full flex items-center justify-center bg-slate-50">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
    </div>
  );

  if (!user) return <Navigate to="/login" replace />;

  if (allowedRoles && !allowedRoles.includes(user.perfil as UserRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route element={<DashboardLayout />}>
        {/* ROTA RAIZ: Redireciona baseado no perfil (Backend-ready) */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <ColaboradorDashboardPage />
            </PrivateRoute>
          }
        />

        {/* MÓDULO: COLABORADOR */}
        <Route path="/avaliacao" element={<PrivateRoute><AvaliacaoPage /></PrivateRoute>} />
        <Route path="/feedback" element={<PrivateRoute><FeedbackPage /></PrivateRoute>} />
        <Route path="/metas" element={<PrivateRoute><MetasPage /></PrivateRoute>} />

        {/* MÓDULO: GESTÃO (GESTOR & ADMIN) */}
        <Route path="/gestao">
          <Route
            index
            element={<PrivateRoute allowedRoles={['GESTOR', 'ADMIN']}><GestorDashboardPage /></PrivateRoute>}
          />
          <Route
            path="alertas"
            element={<PrivateRoute allowedRoles={['GESTOR', 'ADMIN']}><AlertasPage /></PrivateRoute>}
          />
          <Route
            path="nine-box"
            element={<PrivateRoute allowedRoles={['GESTOR', 'ADMIN']}><NineBoxPage /></PrivateRoute>}
          />
          <Route
            path="relatorios"
            element={<PrivateRoute allowedRoles={['GESTOR', 'ADMIN']}><RelatoriosPage /></PrivateRoute>}
          />
          {/* Rota com ID para ver perfil de liderados */}
          <Route
            path="colaborador/:id"
            element={<PrivateRoute allowedRoles={['GESTOR', 'ADMIN']}><ColaboradorDetalhePage /></PrivateRoute>}
          />
        </Route>

        {/* MÓDULO: ADMINISTRAÇÃO SISTÊMICA */}
        <Route path="/admin">
          <Route index element={<PrivateRoute allowedRoles={['ADMIN']}><AdminDashboardPage /></PrivateRoute>} />
          <Route path="ciclos" element={<PrivateRoute allowedRoles={['ADMIN']}><CiclosPage /></PrivateRoute>} />
          <Route path="metas" element={<PrivateRoute allowedRoles={['ADMIN']}><MetasGlobaisPage /></PrivateRoute>} />
          <Route path="importar" element={<PrivateRoute allowedRoles={['ADMIN']}><ImportacaoColaboradoresPage /></PrivateRoute>} />
          <Route path="competencias" element={<PrivateRoute allowedRoles={['ADMIN']}><CompetenciasPage /></PrivateRoute>} />
          <Route path="usuarios" element={<PrivateRoute allowedRoles={['ADMIN']}><UsuariosPage /></PrivateRoute>} />
          <Route path="nine-box-config" element={<PrivateRoute allowedRoles={['ADMIN']}><NineBoxConfigPage /></PrivateRoute>} />
        </Route>
      </Route>

      <Route path="/unauthorized" element={<UnauthorizedPage />} />
      <Route path="/404" element={<NotFoundPage />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
};