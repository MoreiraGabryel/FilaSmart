import { validarEntradaNaFila } from '@/features/fila/validacao';

describe('validarEntradaNaFila', () => {
  it('informa os campos obrigatórios sem criar uma senha inválida', () => {
    expect(validarEntradaNaFila({ estudante: '  ', servicoId: '' })).toEqual({
      estudante: 'Informe o nome completo.',
      servicoId: 'Selecione um serviço.',
    });
  });

  it('aceita uma entrada com nome e serviço', () => {
    expect(
      validarEntradaNaFila({
        estudante: 'Marcos Gabryel da Silva Moreira',
        servicoId: 'biblioteca',
      }),
    ).toEqual({});
  });
});
