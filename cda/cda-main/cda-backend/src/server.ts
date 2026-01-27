import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

// 1. DEFINIÇÃO DO PRISMA (Resolve o erro 'prisma' não encontrado)
const prisma = new PrismaClient();
const app = express();

app.use(cors({
  origin: [
    'http://localhost:3000', 
    'http://localhost:5173', 
    'https://cda-gestao-desempenho-2026.web.app'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());

// 2. DEFINIÇÃO DO ROUTER (Resolve o erro 'router' não encontrado)
const router = express.Router();

// 3. ROTA DE LOGIN
router.post('/login', async (req, res) => {
  const { email, senha, firebaseUid } = req.body;

  console.log(`🔍 Tentativa de login: ${email}`);

  try {
    // Atenção: Use 'usuario' ou 'usuarios' conforme o Prisma gerou no seu schema
    const usuarioEncontrado = await prisma.usuario.findUnique({
      where: { email }
    });

    // Validação usando os nomes que o seu TypeScript reconheceu (firebaseUid e senha)
    if (usuarioEncontrado && (usuarioEncontrado.senha === senha || usuarioEncontrado.firebaseUid === firebaseUid)) {
      console.log(`✅ Login autorizado: ${email}`);
      
      return res.status(200).json({
        id: usuarioEncontrado.id,
        nome: usuarioEncontrado.nome,
        email: usuarioEncontrado.email,
        perfil: usuarioEncontrado.perfil,
        firebaseUid: usuarioEncontrado.firebaseUid
      });
    }

    return res.status(401).json({ message: 'E-mail ou senha inválidos.' });

  } catch (error) {
    console.error('❌ Erro no login:', error);
    return res.status(500).json({ message: 'Erro interno no banco de dados.' });
  }
});

// 4. USO DAS ROTAS
app.use('/api', router);

const PORT = 4000;
app.listen(PORT, () => {
  console.log('---');
  console.log(`🚀 BACKEND CDA 2026 ONLINE NA PORTA ${PORT}`);
  console.log('---');
});