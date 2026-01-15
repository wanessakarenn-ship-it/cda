import { useState, useEffect } from 'react';

// Interface atualizada para incluir a lógica de mérito
interface CarreiraResult {
  isElegivel: boolean;
  mensagem: string;
  loading: boolean;
}

/**
 * Hook para validar elegibilidade de carreira (Item 3.1)
 * Aceita o score (number) como parâmetro
 */
export const useCarreira = (score: number): CarreiraResult => {
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState({ isElegivel: false, mensagem: '' });

  useEffect(() => {
    // Simulação de regra de negócio para o CDA 2026
    const validarElegibilidade = () => {
      setLoading(true);
      
      // Regra: Score acima de 60% é elegível para mérito
      const elegivel = score >= 60;
      const msg = elegivel 
        ? "Colaborador apto para progressão de mérito." 
        : "Abaixo do score mínimo para promoção.";

      setResult({ isElegivel: elegivel, mensagem: msg });
      setLoading(false);
    };

    validarElegibilidade();
  }, [score]);

  return { ...result, loading };
};