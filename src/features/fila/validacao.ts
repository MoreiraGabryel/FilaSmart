type EntradaFila = {
  estudante: string;
  servicoId: string;
};

export type ErrosEntradaFila = Partial<Record<keyof EntradaFila, string>>;

export function validarEntradaNaFila({ estudante, servicoId }: EntradaFila): ErrosEntradaFila {
  return {
    ...(estudante.trim() ? {} : { estudante: 'Informe o nome completo.' }),
    ...(servicoId ? {} : { servicoId: 'Selecione um serviço.' }),
  };
}
