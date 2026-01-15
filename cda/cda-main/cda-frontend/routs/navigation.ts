/**
 * Configuração de Navegação CDA 2026
 * Define os itens do menu lateral e permissões de acesso
 */

export interface NavItem {
  label: string;
  path: string;
  icon: string;
  role?: 'ADMIN' | 'GESTOR' | 'COLABORADOR'; // Controle de acesso (Item 5.2)
}

export const NAV_ITEMS: NavItem[] = [
  {
    label: 'Avaliações',
    path: '/',
    icon: 'home', // Alinhado ao ícone de casa na sidebar
  },
  {
    label: 'Minha Equipe',
    path: '/equipe',
    icon: 'users',
  },
  {
    label: 'Relatórios',
    path: '/relatorios',
    icon: 'chart', // Ícone de gráfico para análise estratégica
  },
  {
    label: 'Administração',
    path: '/admin',
    icon: 'settings',
    role: 'ADMIN', // Restrito apenas para administradores
  }
];

/**
 * Utilitário para filtrar itens baseados no papel do usuário logado
 */
export const getVisibleNavItems = (userRole?: string) => {
  return NAV_ITEMS.filter(item => !item.role || item.role === userRole);
};