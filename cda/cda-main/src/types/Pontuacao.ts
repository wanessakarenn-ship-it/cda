// src/types/Pontuacao.ts

export interface Pontuacao {
    id?: number;
    avaliacao_id: number;
    
    // IDs das referências (um ou outro será preenchido)
    competencia_id?: number; 
    meta_id?: number;        
    
    nota: number; // Ex: 1 a 5 ou 0 a 100
    comentario?: string;
    peso_aplicado?: number; // Peso da competência no momento da avaliação
    
    // Campos virtuais úteis para o Frontend exibir nomes em vez de IDs
    nome_referencia?: string; // Ex: "Comunicação" ou "Meta de Vendas"
    tipo_referencia?: 'COMPETENCIA' | 'META';

    // Tipagem flexível para tráfego JSON (Data ou String ISO)
    created_at?: Date | string;
    updated_at?: Date | string;
}