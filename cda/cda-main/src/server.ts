import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';

// Importação das rotas configuradas anteriormente
import avaliacaoRoutes from './routes/avaliacaoRoute';
import competenciaRoutes from './routes/competenciaRoutes';
import nineBoxRoutes from './routes/nineBoxRoutes';
import pontuacaoRoutes from './routes/pontuacaoRoutes';

// Inicializa as variáveis de ambiente do arquivo .env
dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

/**
 * Rotas de Legado / Teste rápido
 * Mantemos para garantir que a interface da Ana García continue funcionando
 */
app.get('/api/v1/avaliacoes/1', (req, res) => {
  res.json({
    nome: 'Ana García Fernández',
    scoreFinal: 68.9,
    status: 'Finalizado'
  });
});

/**
 * Rotas Oficiais do Sistema CDA 2026
 * Alimentam os componentes de Equipe, Relatórios e Administração
 */
app.use('/api/avaliacoes', avaliacaoRoutes);
app.use('/api/competencias', competenciaRoutes);
app.use('/api/ninebox', nineBoxRoutes);
app.use('/api/pontuacoes', pontuacaoRoutes);

// Porta definida no .env ou padrão 4000
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log('---');
  console.log(`🚀 SERVIDOR CDA 2026 ATIVO`);
  console.log(`📡 Porta: ${PORT}`);
  console.log(`🔗 Local: http://localhost:${PORT}`);
  console.log('---');
});