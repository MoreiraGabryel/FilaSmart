import type { Senha } from '@/features/fila/fila-domain';

jest.mock('@react-native-async-storage/async-storage', () => ({
  __esModule: true,
  default: { getItem: jest.fn(), setItem: jest.fn(), removeItem: jest.fn() },
}));

import { createFilaStorage } from '@/services/fila-storage';

describe('createFilaStorage', () => {
  it('persiste e restaura a senha atual sem expor o AsyncStorage às telas', async () => {
    const values = new Map<string, string>();
    const storage = createFilaStorage({
      getItem: async (key) => values.get(key) ?? null,
      setItem: async (key, value) => {
        values.set(key, value);
      },
      removeItem: async (key) => {
        values.delete(key);
      },
    });
    const senha: Senha = {
      id: 'biblioteca-1',
      estudante: 'Marcos Gabryel da Silva Moreira',
      servicoId: 'biblioteca',
      servicoNome: 'Biblioteca',
      posicao: 2,
      status: 'aguardando',
      criadoEm: '2026-11-11T10:00:00.000Z',
    };

    await storage.salvarSenha(senha);

    await expect(storage.obterSenha()).resolves.toEqual(senha);
    await storage.limparSenha();
    await expect(storage.obterSenha()).resolves.toBeNull();
  });
});
