import { Request, Response } from 'express';
import NineBoxService from '../services/NineBoxService';

class NineBoxController {
    /**
     * Lista os resultados do NineBox com suporte a filtros
     * Alimenta os gráficos na aba de Relatórios
     */
    async findAll(req: Request, res: Response) {
        try {
            const { ciclo_id, setor } = req.query;
            
            // Filtros para segmentar a visualização do gráfico
            const nineBoxes = await NineBoxService.findAll({
                ciclo_id: ciclo_id ? Number(ciclo_id) : undefined,
                setor: setor as string
            });

            return res.json(nineBoxes);
        } catch (error) {
            console.error('Erro ao buscar dados do NineBox:', error);
            return res.status(500).json({ message: 'Erro interno ao carregar matriz NineBox' });
        }
    }

    /**
     * Registra o posicionamento de um colaborador na matriz
     */
    async create(req: Request, res: Response) {
        try {
            const nineBox = await NineBoxService.create(req.body);
            return res.status(201).json(nineBox);
        } catch (error) {
            return res.status(400).json({ message: 'Erro ao criar registro NineBox' });
        }
    }

    /**
     * Busca o posicionamento específico de um colaborador por ID
     */
    async findById(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            if (isNaN(id)) return res.status(400).json({ message: 'ID inválido' });

            const nineBox = await NineBoxService.findById(id);
            if (!nineBox) return res.status(404).json({ message: 'Registro não encontrado' });
            
            return res.json(nineBox);
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao buscar dados' });
        }
    }

    /**
     * Atualiza o quadrante de um colaborador
     */
    async update(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const nineBox = await NineBoxService.update(id, req.body);
            return res.json(nineBox);
        } catch (error) {
            return res.status(400).json({ message: 'Erro ao atualizar NineBox' });
        }
    }

    /**
     * Remove um registro da matriz
     */
    async delete(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            await NineBoxService.delete(id);
            return res.status(204).send();
        } catch (error) {
            return res.status(400).json({ message: 'Erro ao deletar registro' });
        }
    }
}

export default new NineBoxController();