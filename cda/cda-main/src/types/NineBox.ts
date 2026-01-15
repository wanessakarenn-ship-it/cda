export interface NineBox {
    id?: number;
    ciclo_colaborador_id: number;
    posicao_x_potencial: string;   // Ex: '1', '2', '3' ou 'Baixo', 'Médio', 'Alto'
    posicao_y_desempenho: string; // Ex: '1', '2', '3'
    score_competencias: number;
    score_metas: number;
    score_final_merito: number;
    elegivel_carreira: boolean;
    
    // Campo virtual vindo do JOIN no Repository para o Frontend
    colaborador_nome?: string; 
    
    data_calculo?: Date | string;
    created_at?: Date | string;
    updated_at?: Date | string;
}