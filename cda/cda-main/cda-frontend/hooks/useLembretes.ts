import { useEffect } from 'react';

export const useLembretes = (prazoFinal: string, status: string) => {
  useEffect(() => {
    if (status !== 'Finalizado') {
      // Logica para disparar lembrete visual se o prazo estiver próximo
      console.log(`Lembrete: Ciclo vence em ${prazoFinal}. Por favor, complete sua avaliação.`);
    }
  }, [prazoFinal, status]);
};