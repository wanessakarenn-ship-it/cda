/*
Script de teste de conexão CDA 2026
Valida variáveis de ambiente e tempo de resposta do PostgreSQL.
*/

import pool from '../config/db';
import * as dotenv from 'dotenv';

// Garante que as variáveis de ambiente sejam carregadas caso o script seja rodado isoladamente
dotenv.config();

const { DB_HOST, DB_USER, DB_DATABASE, DB_PORT } = process.env;

function printConnectionVars() {
    console.log('\n--- 🛠️  DEBUG DE CONFIGURAÇÃO ---');
    console.log(`📍 Host:     ${DB_HOST || 'Não definido'}`);
    console.log(`👤 Usuário:  ${DB_USER || 'Não definido'}`);
    console.log(`📦 Banco:    ${DB_DATABASE || 'Não definido'}`);
    console.log(`🔌 Porta:    ${DB_PORT || 'Não definido'}`);
    
    if (process.env.SHOW_DB_PASSWORD === '1') {
        console.log(`🔑 Senha:    ${process.env.DB_PASSWORD}`);
    } else {
        console.log('🔑 Senha:    ******** (Defina SHOW_DB_PASSWORD=1 para ver)');
    }
    console.log('---------------------------------\n');
}

async function main() {
    const start = Date.now();
    
    try {
        printConnectionVars();
        console.log('⏳ Tentando conectar ao PostgreSQL...');

        // Executa uma consulta simples para validar a saúde do banco
        const res = await pool.query('SELECT NOW() as agora, current_database() as db_atual');
        
        const duration = Date.now() - start;

        console.log('✅ CONEXÃO ESTABELECIDA COM SUCESSO!');
        console.log(`📅 Horário no Banco: ${res.rows[0].agora}`);
        console.log(`📂 Database Ativa:   ${res.rows[0].db_atual}`);
        console.log(`⚡ Latência:         ${duration}ms`);

    } catch (err: any) {
        console.error('\n❌ ERRO DE CONEXÃO:');
        console.error(`🔴 Mensagem: ${err.message}`);
        console.error(`🔴 Código:   ${err.code || 'Desconhecido'}`);
        
        if (err.code === 'ECONNREFUSED') {
            console.error('💡 Dica: O serviço do PostgreSQL parece estar desligado.');
        } else if (err.code === '28P01') {
            console.error('💡 Dica: Senha incorreta no arquivo .env.');
        }
        
        process.exitCode = 1;
    } finally {
        try {
            await pool.end();
            console.log('\n🔌 Pool de conexões encerrado.');
        } catch (e) {
            // Ignora erro no fechamento
        }
    }
}

main();