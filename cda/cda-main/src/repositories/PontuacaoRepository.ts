import db from '../config/db';
import { Pontuacao } from '../types/Pontuacao';

// Interface para os filtros de busca
interface PontuacaoFilters {
    ciclo_id?: number;
    colaborador_id?: number;
    avaliacao_id?: number;
}

class PontuacaoRepository {
    async create(pontuacao: Pontuacao): Promise<Pontuacao> {
        const query = `
            INSERT INTO pontuacao (avaliacao_id, competencia_id, meta_id, nota, comentario, peso_aplicado)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *`;
        const values = [
            pontuacao.avaliacao_id,
            pontuacao.competencia_id || null,
            pontuacao.meta_id || null,
            pontuacao.nota,
            pontuacao.comentario || null,
            pontuacao.peso_aplicado || 1
        ];
        const { rows } = await db.query(query, values);
        return rows[0];
    }

    /**
     * Busca pontuações com filtros dinâmicos.
     * Faz JOIN com avaliacao e ciclo_colaborador para permitir filtros de alto nível.
     */
    async findAll(filters: PontuacaoFilters = {}): Promise<Pontuacao[]> {
        let query = `
            SELECT p.* FROM pontuacao p
            JOIN avaliacao a ON p.avaliacao_id = a.id
            JOIN ciclo_colaborador cc ON a.ciclo_colaborador_id = cc.id
            WHERE 1=1`;
        
        const values: any[] = [];
        let i = 1;

        if (filters.ciclo_id) {
            query += ` AND cc.ciclo_id = $${i}`;
            values.push(filters.ciclo_id);
            i++;
        }

        if (filters.colaborador_id) {
            query += ` AND cc.colaborador_id = $${i}`;
            values.push(filters.colaborador_id);
            i++;
        }

        if (filters.avaliacao_id) {
            query += ` AND p.avaliacao_id = $${i}`;
            values.push(filters.avaliacao_id);
            i++;
        }

        query += ' ORDER BY p.id ASC';

        const { rows } = await db.query(query, values);
        return rows;
    }

    async findById(id: number): Promise<Pontuacao | null> {
        const { rows } = await db.query('SELECT * FROM pontuacao WHERE id = $1', [id]);
        return rows[0] || null;
    }

    async update(id: number, patch: Partial<Pontuacao>): Promise<Pontuacao> {
        const fields: string[] = [];
        const values: any[] = [];
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
        const query = `UPDATE pontuacao SET ${fields.join(', ')}, updated_at = now() WHERE id = $${i} RETURNING *`;
        const { rows } = await db.query(query, values);
        return rows[0];
    }

    async delete(id: number): Promise<void> {
        await db.query('DELETE FROM pontuacao WHERE id = $1', [id]);
    }
}

export default new PontuacaoRepository();