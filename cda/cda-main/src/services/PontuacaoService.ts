import PontuacaoRepository from '../repositories/PontuacaoRepository';
import { Pontuacao } from '../types/Pontuacao';

// Interface para definir os filtros de busca (Ciclo, Colaborador ou Avaliação específica)
interface PontuacaoFilters {
    ciclo_id?: number;
    colaborador_id?: number;
    avaliacao_id?: number;
}

class PontuacaoService {
    /**
     * Registra uma nova nota para uma competência ou meta.
     */
    async create(pontuacao: Pontuacao) {
        return PontuacaoRepository.create(pontuacao);
    }

    /**
     * Busca todas as pontuações.
     * Atualizado para aceitar filtros e repassá-los ao Repository.
     * Resolve o erro de argumentos no PontuacaoController.
     */
    async findAll(filters: PontuacaoFilters = {}) {
        return PontuacaoRepository.findAll(filters);
    }

    /**
     * Busca uma pontuação específica pelo ID.
     */
    async findById(id: number) {
        return PontuacaoRepository.findById(id);
    }

    /**
     * Atualiza uma nota ou comentário de um registro existente.
     */
    async update(id: number, patch: Partial<Pontuacao>) {
        return PontuacaoRepository.update(id, patch);
    }

    /**
     * Remove um registro de pontuação.
     */
    async delete(id: number) {
        return PontuacaoRepository.delete(id);
    }
}

export default new PontuacaoService();