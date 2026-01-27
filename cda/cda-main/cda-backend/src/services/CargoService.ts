import { usuarioRepository } from '../repositories/UsuarioRepository';
import { Usuario } from '../types/Usuario';

type UsuarioCreateDTO = Omit<
  Usuario,
  'id' | 'created_at' | 'updated_at'
>;

export const usuarioService = {
  /**
   * 🔐 Busca usuário pelo UID do Firebase
   */
  async obterPorFirebaseUid(firebaseUid: string): Promise<Usuario | null> {
    return usuarioRepository.buscarPorFirebaseUid(firebaseUid);
  },

  async listarTodos(): Promise<Usuario[]> {
    return usuarioRepository.listarTodos();
  },

  async obterPorId(id: number): Promise<Usuario> {
    const usuario = await usuarioRepository.buscarPorId(id);
    if (!usuario) {
      throw new Error('USUARIO_NAO_ENCONTRADO');
    }
    return usuario;
  },

  async obterPorEmail(email: string): Promise<Usuario> {
    const usuario = await usuarioRepository.buscarPorEmail(email);
    if (!usuario) {
      throw new Error('USUARIO_NAO_ENCONTRADO');
    }
    return usuario;
  },

  async criar(dados: UsuarioCreateDTO): Promise<Usuario> {
    const existente = await usuarioRepository.buscarPorEmail(dados.email);
    if (existente) {
      throw new Error('EMAIL_JA_REGISTRADO');
    }

    return usuarioRepository.criar(dados);
  },

  async atualizar(
    id: number,
    dados: Partial<Usuario>
  ): Promise<Usuario> {
    const atualizado = await usuarioRepository.atualizar(id, dados);
    if (!atualizado) {
      throw new Error('USUARIO_NAO_ENCONTRADO');
    }
    return atualizado;
  },

  async remover(id: number): Promise<void> {
    const ok = await usuarioRepository.remover(id);
    if (!ok) {
      throw new Error('USUARIO_NAO_ENCONTRADO');
    }
  },
};
