import NineBoxRepository from '../repositories/NineBoxRepository';
import { NineBox } from '../types/NineBox';

// Interface para definir os filtros (Ciclo e Setor)
interface NineBoxFilters {
    ciclo_id?: number;
    setor?: string;
}

class NineBoxService {
    /**
     * Registra o posicionamento de um colaborador na matriz
     */
    async create(nineBox: NineBox) {
        return NineBoxRepository.create(nineBox);
    }

    /**
     * Busca todos os registros da matriz NineBox.
     * Atualizado para aceitar filtros e repassá-los ao Repository.
     * Isso resolve o erro de argumentos no NineBoxController.
     */
    async findAll(filters: NineBoxFilters = {}) {
        return NineBoxRepository.findAll(filters);
    }

    /**
     * Busca um registro específico pelo ID
     */
    async findById(id: number) {
        return NineBoxRepository.findById(id);
    }

    /**
     * Atualiza os dados de desempenho ou potencial de um registro
     */
    async update(id: number, patch: Partial<NineBox>) {
        return NineBoxRepository.update(id, patch);
    }

    /**
     * Remove um registro da matriz
     */
    async delete(id: number) {
        return NineBoxRepository.delete(id);
    }
}

export default new NineBoxService();