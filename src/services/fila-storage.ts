import AsyncStorage from '@react-native-async-storage/async-storage';

import type { Senha } from '@/features/fila/fila-domain';

const CHAVE_SENHA_ATUAL = '@filasmart/senha-atual';

type KeyValueStorage = {
  getItem(key: string): Promise<string | null>;
  setItem(key: string, value: string): Promise<void>;
  removeItem(key: string): Promise<void>;
};

export function createFilaStorage(storage: KeyValueStorage) {
  return {
    async salvarSenha(senha: Senha) {
      await storage.setItem(CHAVE_SENHA_ATUAL, JSON.stringify(senha));
    },
    async obterSenha(): Promise<Senha | null> {
      const valor = await storage.getItem(CHAVE_SENHA_ATUAL);
      return valor ? (JSON.parse(valor) as Senha) : null;
    },
    async limparSenha() {
      await storage.removeItem(CHAVE_SENHA_ATUAL);
    },
  };
}

export const filaStorage = createFilaStorage(AsyncStorage);
