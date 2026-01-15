/*
Script para verificar se as tabelas definidas no CDA 2026 foram criadas.
Roda consultas `SELECT to_regclass` e verifica colunas críticas.
*/

import pool from '../config/db';

const tables = [
  'perfil',
  'cargo',
  'usuario',
  'colaborador',
  'ciclo_desempenho',
  'ciclo_colaborador',
  'competencia',
  'meta',
  'avaliacao',
  'pontuacao',
  'nine_box',
  'plano_carreira',
  'colaborador_trilha',
  'colaborador_import',
];

async function main() {
  try {
    console.log('---');
    console.log('🔍 INICIANDO DIAGNÓSTICO DO BANCO DE DADOS CDA 2026');
    console.log('---');
    
    let missing: string[] = [];

    for (const t of tables) {
      try {
        const res = await pool.query(`SELECT to_regclass('public.${t}') as found`);
        const found = res.rows[0]?.found;

        if (found) {
          console.log(`✅ OK: ${t}`);
          
          // Verificação específica para a mudança de senha_hash -> senha
          if (t === 'usuario') {
            const colRes = await pool.query(`
              SELECT column_name 
              FROM information_schema.columns 
              WHERE table_name = 'usuario' AND column_name = 'senha'
            `);
            if (colRes.rowCount && colRes.rowCount > 0) {
              console.log('   ↳ ✨ Coluna "senha" validada.');
            } else {
              console.log('   ↳ ⚠️ ATENÇÃO: Coluna "senha" não encontrada na tabela usuario!');
            }
          }
        } else {
          console.log(`❌ MISSING: ${t}`);
          missing.push(t);
        }
      } catch (err) {
        console.error(`❗ Erro consultando tabela ${t}:`, err);
        missing.push(t);
      }
    }

    console.log('---');
    if (missing.length > 0) {
      console.log('📊 RESULTADO: Falha na integridade do banco.');
      console.log('Tabelas faltando:', missing.join(', '));
      process.exitCode = 2;
    } else {
      console.log('📊 RESULTADO: Estrutura completa. Pronto para o deploy.');
    }
    console.log('---');

  } catch (err) {
    console.error('❌ Erro inesperado durante a verificação:', err);
    process.exitCode = 1;
  } finally {
    // Encerra a conexão com o pool para o script finalizar
    await pool.end();
  }
}

main();