import { useCallback } from 'react';

export const useValidation = () => {
  const validarCiclo = useCallback((competencias: any[]) => {
    // RF 1.3: Verifica se todas as competências obrigatórias possuem nota
    const pendentes = competencias.filter(c => !c.score || c.score === 0);
    
    return {
      podeFinalizar: pendentes.length === 0,
      totalPendentes: pendentes.length,
      erro: pendentes.length > 0 ? `Existem ${pendentes.length} competências pendentes.` : null
    };
  }, []);

  return { validarCiclo };
};