/**
 * Formata valores percentuais para exibição em labels pequenas
 */
export const formatPercent = (value: number): string => {
  return `${value.toString().replace('.', ',')}%`;
};

/**
 * Mascara nomes longos para manter o layout limpo em resoluções menores
 */
export const truncateName = (name: string, limit: number = 20): string => {
  return name.length > limit ? `${name.substring(0, limit)}...` : name;
};