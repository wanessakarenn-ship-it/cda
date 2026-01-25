import { api } from './Api';

export interface Ciclo {
  id: number;
  nome: string;
  data_inicio: string; // ISO (YYYY-MM-DD)
  data_fim: string;    // ISO (YYYY-MM-DD)
  status: 'ABERTO' | 'FECHADO' | 'PLANEJADO'; // Adicionado status para controle
  descricao?: string;
  created_at?: string;
  updated_at?: string;
}

export type CriarCicloDTO = Omit<Ciclo, 'id' | 'created_at' | 'updated_at'>;
export type AtualizarCicloDTO = Partial<CriarCicloDTO>;

export const cicloService = {
  /**
   * 📋 Lista todos os ciclos (Ordenados por data)
   */
  async listar(): Promise<Ciclo[]> {
    const { data } = await api.get<Ciclo[]>('/ciclos-desempenho');
    return data;
  },

  /**
   * 🎯 Busca o ciclo atualmente ativo
   * GET /api/ciclos-desempenho/ativo
   */
  async buscarAtivo(): Promise<Ciclo | null> {
    const { data } = await api.get<Ciclo>('/ciclos-desempenho/ativo');
    return data;
  },

  /**
   * ➕ Cria um novo ciclo
   */
  async criar(payload: CriarCicloDTO): Promise<Ciclo> {
    const { data } = await api.post<Ciclo>('/ciclos-desempenho', payload);
    return data;
  },

  /**
   * 📝 Atualiza um ciclo existente
   * PUT /api/ciclos-desempenho/:id
   */
  async atualizar(id: number, payload: AtualizarCicloDTO): Promise<Ciclo> {
    const { data } = await api.put<Ciclo>(`/ciclos-desempenho/${id}`, payload);
    return data;
  },

  /**
   * 🗑️ Remove um ciclo
   */
  async deletar(id: number): Promise<void> {
    await api.delete(`/ciclos-desempenho/${id}`);
  },
};