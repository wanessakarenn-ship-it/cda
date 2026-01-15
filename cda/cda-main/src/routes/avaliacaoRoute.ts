import { Router } from 'express';
import AvaliacaoController from '../controllers/AvaliacaoController';

/**
 * Arquivo de Definição de Rotas para Avaliações
 * Este roteador lida com o status dos ciclos e progresso dos colaboradores
 */
const router = Router();

// Listar todas as avaliações (com filtros de ciclo, status, etc)
router.get('/', AvaliacaoController.findAll);

// Buscar uma avaliação específica por ID
router.get('/:id', AvaliacaoController.findById);

// Criar uma nova avaliação para um colaborador em um ciclo
router.post('/', AvaliacaoController.create);

// Atualizar status da avaliação (ex: de 'Pendente' para 'Finalizado')
router.put('/:id', AvaliacaoController.update);

// Remover um registro de avaliação
router.delete('/:id', AvaliacaoController.delete);

export default router; // 