import db from '../config/db';
import { NineBox } from '../types/NineBox';

// Interface para os filtros da matriz
interface NineBoxFilters {
    ciclo_id?: number;
    setor?: string;
}

class NineBoxRepository {
    async create(nineBox: NineBox): Promise<NineBox> {
        const query = `
            INSERT INTO nine_box (
                ciclo_colaborador_id, posicao_x_potencial, posicao_y_desempenho,
                score_competencias, score_metas, score_final_merito, elegivel_carreira
            )
            VALUES ($1,$2,$3,$4,$5,$6,$7)
            RETURNING *`;
        const values = [
            nineBox.ciclo_colaborador_id,
            nineBox.posicao_x_potencial,
            nineBox.posicao_y_desempenho,
            nineBox.score_competencias,
            nineBox.score_metas,
            nineBox.score_final_merito,
            nineBox.elegivel_carreira
        ];
        const { rows } = await db.query(query, values);
        return rows[0];
    }

    /**
     * Atualizado para suportar filtros de ciclo e setor
     * Essencial para os gráficos de desempenho
     */
    async findAll(filters: NineBoxFilters = {}): Promise<NineBox[]> {
        let query = `
            SELECT nb.*, u.nome as colaborador_nome 
            FROM nine_box nb
            JOIN ciclo_colaborador cc ON nb.ciclo_colaborador_id = cc.id
            JOIN usuario u ON cc.colaborador_id = u.id
            WHERE 1=1`;
        
        const values: any[] = [];
        let i = 1;

        if (filters.ciclo_id) {
            query += ` AND cc.ciclo_id = $${i}`;
            values.push(filters.ciclo_id);
            i++;
        }

        // Adiciona ordenação para facilitar a plotagem no gráfico
        query += ' ORDER BY nb.score_final_merito DESC';

        const { rows } = await db.query(query, values);
        return rows;
    }

    async findById(id: number): Promise<NineBox | null> {
        const { rows } = await db.query('SELECT * FROM nine_box WHERE id = $1', [id]);
        return rows[0] || null;
    }

    async update(id: number, patch: Partial<NineBox>): Promise<NineBox> {
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
        const query = `UPDATE nine_box SET ${fields.join(', ')}, updated_at = now() WHERE id = $${i} RETURNING *`;
        const { rows } = await db.query(query, values);
        return rows[0];
    }

    async delete(id: number): Promise<void> {
        await db.query('DELETE FROM nine_box WHERE id = $1', [id]);
    }
}

export default new NineBoxRepository();