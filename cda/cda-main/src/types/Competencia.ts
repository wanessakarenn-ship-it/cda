// src/types/Competencia.ts

export interface Competencia {
  id?: number; // Opcional para permitir a criação de novas competências sem ID prévio
  nome: string; // Ex: "Comunicação", "Liderança"
  descricao?: string; // Detalhamento do que será avaliado
  peso: number; // Valor numérico para o cálculo da média (ex: 1, 2, 3)
  
  // Metadados para controle do sistema
  created_at?: Date | string; 
  updated_at?: Date | string;
}

/**
 * Interface auxiliar para os formulários de avaliação no Frontend
 * Isso ajuda a renderizar a lista de notas (1 a 5) para cada competência
 */
export interface CompetenciaAvaliada extends Competencia {
  nota?: number;
  comentario_individual?: string;
}