import { useCallback, useEffect, useState } from 'react';

import type { Senha } from '@/features/fila/fila-domain';
import { filaStorage } from '@/services/fila-storage';

export function useSenhaAtual() {
  const [senha, setSenha] = useState<Senha | null>(null);
  const [carregando, setCarregando] = useState(true);

  const restaurar = useCallback(async () => {
    try {
      const senhaRestaurada = await filaStorage.obterSenha();
      setSenha(senhaRestaurada);
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    void restaurar();
  }, [restaurar]);

  const salvar = useCallback(async (novaSenha: Senha) => {
    await filaStorage.salvarSenha(novaSenha);
    setSenha(novaSenha);
  }, []);

  const limpar = useCallback(async () => {
    await filaStorage.limparSenha();
    setSenha(null);
  }, []);

  return { senha, carregando, restaurar, salvar, limpar };
}
