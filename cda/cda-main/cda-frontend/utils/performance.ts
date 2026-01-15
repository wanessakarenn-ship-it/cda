/**
 * Calcula a média ponderada das competências
 */
export const calculateFinalScore = (competencias: { score: number; peso: string }[]): number => {
  const total = competencias.reduce((acc, comp) => {
    const pesoNumerico = parseFloat(comp.peso.replace('%', '')) / 100;
    return acc + (comp.score * pesoNumerico);
  }, 0);
  
  return parseFloat(total.toFixed(1)); // Retorna ex: 68.9
};

/**
 * Define a cor da barra com base no atingimento da meta (Target)
 */
export const getStatusColor = (score: number, target: number): string => {
  if (score >= target) return 'bg-brand-emerald'; // Verde para sucesso
  if (score >= target * 0.8) return 'bg-brand-indigo'; // Indigo para atenção
  return 'bg-brand-rose'; // Rose para gaps críticos
};