import { criarSenha } from '@/features/fila/fila-domain';

describe('criarSenha', () => {
  it('cria uma senha aguardando atendimento com posição inicial', () => {
    expect(
      criarSenha({
        estudante: 'Marcos Gabryel da Silva Moreira',
        servicoId: 'secretaria',
        servicoNome: 'Secretaria Acadêmica',
        pessoasNaFrente: 4,
        agora: new Date('2026-11-11T10:00:00.000Z'),
      }),
    ).toEqual({
      id: 'secretaria-1794391200000',
      estudante: 'Marcos Gabryel da Silva Moreira',
      servicoId: 'secretaria',
      servicoNome: 'Secretaria Acadêmica',
      posicao: 5,
      status: 'aguardando',
      criadoEm: '2026-11-11T10:00:00.000Z',
    });
  });
});
