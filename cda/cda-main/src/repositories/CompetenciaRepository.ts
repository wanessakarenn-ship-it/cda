import db from '../config/db';
import { Competencia } from '../types/Competencia';

export default class CompetenciaRepository {
  /**
   * Busca todas as competências com suporte a filtro de nome
   * Resolve o erro de argumentos no Service
   */
  async findAll(search?: string): Promise<Competencia[]> {
    let query = 'SELECT * FROM competencia';
    const values: any[] = [];

    if (search) {
      query += ' WHERE nome ILIKE $1 OR descricao ILIKE $1';
      values.push(`%${search}%`);
    }

    query += ' ORDER BY nome ASC';

    const { rows } = await db.query(query, values);
    return rows;
  }

  async findById(id: number): Promise<Competencia | null> {
    const { rows } = await db.query('SELECT * FROM competencia WHERE id=$1', [id]);
    return rows[0] || null;
  }

  async create(data: Partial<Competencia>): Promise<Competencia> {
    const { nome, descricao, peso } = data;
    const { rows } = await db.query(
      `INSERT INTO competencia (nome, descricao, peso)
       VALUES ($1, $2, $3) RETURNING *`,
      [nome, descricao || null, peso ?? 1]
    );
    return rows[0];
  }

  async update(id: number, data: Partial<Competencia>): Promise<Competencia | null> {
    // Busca os dados atuais para não sobrescrever com null se o campo não for enviado
    const atual = await this.findById(id);
    if (!atual) return null;

    const nome = data.nome ?? atual.nome;
    const descricao = data.descricao ?? atual.descricao;
    const peso = data.peso ?? atual.peso;

    const { rows } = await db.query(
      `UPDATE competencia SET nome=$1, descricao=$2, peso=$3, updated_at=now()
       WHERE id=$4 RETURNING *`,
      [nome, descricao, peso, id]
    );
    return rows[0] || null;
  }

  async delete(id: number): Promise<void> {
    await db.query('DELETE FROM competencia WHERE id=$1', [id]);
  }
}