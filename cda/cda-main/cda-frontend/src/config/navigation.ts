
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
