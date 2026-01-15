import CompetenciaRepository from '../repositories/CompetenciaRepository';
import { Competencia } from '../types/Competencia';

export default class CompetenciaService {
  private repo = new CompetenciaRepository();

  /**
   * Lista as competências aceitando um termo de busca opcional.
   * Isso resolve o erro de argumentos no CompetenciaController.
   */
  async list(search?: string): Promise<Competencia[]> {
    // Repassa o filtro para o repositório buscar no banco de dados
    return this.repo.findAll(search);
  }

  async getById(id: number): Promise<Competencia | null> {
    return this.repo.findById(id);
  }

  async create(data: Partial<Competencia>): Promise<Competencia> {
    return this.repo.create(data);
  }

  async update(id: number, data: Partial<Competencia>): Promise<Competencia | null> {
    return this.repo.update(id, data);
  }

  async delete(id: number): Promise<void> {
    return this.repo.delete(id);
  }
}