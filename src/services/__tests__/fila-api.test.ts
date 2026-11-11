import { carregarAtualizacoesFila } from '@/services/fila-api';

describe('carregarAtualizacoesFila', () => {
  it('processa o JSON remoto para atualizações de fila', async () => {
    const resposta = await carregarAtualizacoesFila(async () => ({
      ok: true,
      json: async () => [
        { id: 1, title: 'confirmar atendimento da secretaria', completed: false },
      ],
    }));

    expect(resposta).toEqual([
      {
        id: 'api-1',
        titulo: 'Confirmar atendimento da secretaria',
        situacao: 'pendente',
      },
    ]);
  });

  it('recusa uma resposta HTTP sem sucesso', async () => {
    await expect(
      carregarAtualizacoesFila(async () => ({ ok: false, json: async () => [] })),
    ).rejects.toThrow('Não foi possível atualizar as filas.');
  });
});
