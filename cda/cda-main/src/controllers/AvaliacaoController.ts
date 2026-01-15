import { Request, Response } from 'express';
import AvaliacaoService from '../services/AvaliacaoService';

class AvaliacaoController {
    /**
     * Busca todas as avaliações com suporte a filtros de status e busca textual
     * Alimenta a tela principal de "Minhas Avaliações"
     */
    async findAll(req: Request, res: Response) {
        try {
            const { status, search } = req.query;
            
            // Passa os filtros para o service buscar no banco de dados
            const avaliacoes = await AvaliacaoService.findAll({
                status: status as string,
                search: search as string
            });

            return res.json(avaliacoes);
        } catch (error) {
            console.error('Erro ao buscar avaliações:', error);
            return res.status(500).json({ message: 'Erro interno ao carregar avaliações' });
        }
    }

    /**
     * Cria uma nova avaliação (ex: iniciada pelo RH)
     */
    async create(req: Request, res: Response) {
        try {
            const avaliacao = await AvaliacaoService.create(req.body);
            return res.status(201).json(avaliacao);
        } catch (error) {
            return res.status(400).json({ message: 'Erro ao criar avaliação' });
        }
    }

    /**
     * Busca os detalhes de uma avaliação específica por ID
     */
    async findById(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const avaliacao = await AvaliacaoService.findById(id);
            
            if (!avaliacao) {
                return res.status(404).json({ message: 'Avaliação não encontrada' });
            }
            
            return res.json(avaliacao);
        } catch (error) {
            return res.status(400).json({ message: 'ID inválido' });
        }
    }

    /**
     * Atualiza dados de uma avaliação (ex: quando o usuário salva progresso)
     */
    async update(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const avaliacao = await AvaliacaoService.update(id, req.body);
            return res.json(avaliacao);
        } catch (error) {
            return res.status(400).json({ message: 'Erro ao atualizar avaliação' });
        }
    }

    /**
     * Remove uma avaliação do sistema
     */
    async delete(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            await AvaliacaoService.delete(id);
            return res.status(204).send();
        } catch (error) {
            return res.status(400).json({ message: 'Erro ao deletar avaliação' });
        }
    }
}

export default new AvaliacaoController();