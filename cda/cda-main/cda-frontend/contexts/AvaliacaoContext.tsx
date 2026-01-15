import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AvaliacaoContextData {
  ciclo: string;
  status: string;
  resultadoFinal: string;
  resultadoCompetencias: string;
  aderenciaCargo: string;
  diferenca: string;
}

const AvaliacaoContext = createContext<AvaliacaoContextData>({} as AvaliacaoContextData);

export const AvaliacaoProvider = ({ children }: { children: ReactNode }) => {
  // Dados extraídos diretamente da imagem de referência
  const [dados] = useState<AvaliacaoContextData>({
    ciclo: '1T 2024',
    status: 'Finalizado',
    resultadoFinal: '68,9%',
    resultadoCompetencias: '22,9%',
    aderenciaCargo: '+ 78%',
    diferenca: '-25%'
  });

  return (
    <AvaliacaoContext.Provider value={dados}>
      {children}
    </AvaliacaoContext.Provider>
  );
};

export const useAvaliacao = () => useContext(AvaliacaoContext);