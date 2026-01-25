/**
 * Configuração de Navegação CDA 2026
 * Controla o menu lateral conforme o perfil vindo do BACKEND
 *
 * 🔐 O BACKEND define:
 *  - quem é o usuário
 *  - qual o perfil (ADMIN | GESTOR | COLABORADOR)
 *
 * 🎯 O FRONTEND decide:
 *  - quais menus aparecem
 *  - quais rotas são acessíveis
 */

/**
 * Papéis do sistema
 * ⚠️ Deve refletir EXATAMENTE o que a API retorna
 * Ex: /auth/login | /usuarios/me
 */
export type UserRole = 'ADMIN' | 'GESTOR' | 'COLABORADOR';

/**
 * Ícones permitidos no Sidebar
 * (Devem existir no resolver de ícones)
 */
export type NavIcon =
  | 'home'
  | 'users'
  | 'chart'
  | 'settings'
  | 'target'
  | 'fileText';

/**
 * Item de navegação
 */
export interface NavItem {
  label: string;
  path: string;
  icon: NavIcon;
  roles: UserRole[]; // 🔐 Sempre obrigatório
}

/**
 * =====================================================
 * ITENS DE NAVEGAÇÃO
 * =====================================================
 * ⚠️ Os paths DEVEM bater exatamente com AppRoutes.tsx
 */
export const NAV_ITEMS: NavItem[] = [
  {
    label: 'Meu Painel',
    path: '/',
    icon: 'home',
    roles: ['COLABORADOR', 'GESTOR', 'ADMIN'],
  },

  {
    label: 'Minha Equipe',
    path: '/gestor',
    icon: 'users',
    roles: ['GESTOR', 'ADMIN'],
  },

  {
    label: 'Relatórios',
    path: '/gestor/relatorios',
    icon: 'chart',
    roles: ['GESTOR', 'ADMIN'],
  },

  {
    label: 'Administração',
    path: '/admin',
    icon: 'settings',
    roles: ['ADMIN'],
  },
];

/**
 * =====================================================
 * FILTRAGEM POR PERFIL
 * =====================================================
 * 🔐 Backend define o perfil
 * 👁️ Frontend apenas exibe o permitido
 */
export const getVisibleNavItems = (
  userRole?: UserRole
): NavItem[] => {
  if (!userRole) return [];

  return NAV_ITEMS.filter(item =>
    item.roles.includes(userRole)
  );
};
