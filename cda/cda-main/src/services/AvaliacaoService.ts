import AvaliacaoRepository from '../repositories/AvaliacaoRepository';
import { Avaliacao } from '../types/Avaliacao';

// Definimos a interface para os filtros para manter o TypeScript feliz
interface AvaliacaoFilters {
    status?: string;
    search?: string;
}

class AvaliacaoService {
    async create(avaliacao: Avaliacao) {
        return AvaliacaoRepository.create(avaliacao);
    }

    /**
     * Atualizado para receber filtros e repassar ao Repository
     * Isso permite que a busca e os filtros da tela funcionem
     */
    async findAll(filters: AvaliacaoFilters = {}) {
        return AvaliacaoRepository.findAll(filters);
    }

    async findById(id: number) {
        return AvaliacaoRepository.findById(id);
    }

    async update(id: number, patch: Partial<Avaliacao>) {
        return AvaliacaoRepository.update(id, patch);
    }

    async delete(id: number) {
        return AvaliacaoRepository.delete(id);
    }
}

export default new AvaliacaoService();