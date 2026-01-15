import db from '../config/db';
import { Avaliacao } from '../types/Avaliacao';

// Interface para definir os filtros possíveis
interface AvaliacaoFilters {
    status?: string;
    search?: string;
}

class AvaliacaoRepository {
    async create(avaliacao: Avaliacao): Promise<Avaliacao> {
        const query = `
            INSERT INTO avaliacao (ciclo_colaborador_id, avaliador_id, tipo, status, pontuacao_merito, data_envio, comentario)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *`;
        const values = [
            avaliacao.ciclo_colaborador_id,
            avaliacao.avaliador_id,
            avaliacao.tipo,
            avaliacao.status,
            avaliacao.pontuacao_merito || null,
            avaliacao.data_envio || null,
            avaliacao.comentario || null
        ];
        const { rows } = await db.query(query, values);
        return rows[0];
    }

    /**
     * Atualizado para suportar os filtros da interface
     * Resolve o erro de argumentos que aparecia no Service/Controller
     */
    async findAll(filters: AvaliacaoFilters = {}): Promise<Avaliacao[]> {
        let query = 'SELECT * FROM avaliacao WHERE 1=1';
        const values: any[] = [];
        let placeholderIndex = 1;

        // Filtro por Status (ex: FINALIZADO)
        if (filters.status) {
            query += ` AND status = $${placeholderIndex}`;
            values.push(filters.status);
            placeholderIndex++;
        }

        // Filtro de Busca Textual (ex: busca por nome no ciclo)
        if (filters.search) {
            query += ` AND (comentario ILIKE $${placeholderIndex} OR tipo ILIKE $${placeholderIndex})`;
            values.push(`%${filters.search}%`);
            placeholderIndex++;
        }

        query += ' ORDER BY data_envio DESC NULLS LAST';

        const { rows } = await db.query(query, values);
        return rows;
    }

    async findById(id: number): Promise<Avaliacao | null> {
        const { rows } = await db.query('SELECT * FROM avaliacao WHERE id = $1', [id]);
        return rows[0] || null;
    }

    async update(id: number, patch: Partial<Avaliacao>): Promise<Avaliacao> {
        const fields = [];
        const values = [];
        let i = 1;

        for (const key in patch) {
            if (Object.prototype.hasOwnProperty.call(patch, key)) {
                fields.push(`${key} = $${i}`);
                // @ts-ignore
                values.push(patch[key]);
                i++;
            }
        }
        
        values.push(id);
        const query = `UPDATE avaliacao SET ${fields.join(', ')}, updated_at = now() WHERE id = $${i} RETURNING *`;
        const { rows } = await db.query(query, values);
        return rows[0];
    }

    async delete(id: number): Promise<void> {
        await db.query('DELETE FROM avaliacao WHERE id = $1', [id]);
    }
}

export default new AvaliacaoRepository();