export type StatusSenha = 'aguardando' | 'chamado' | 'atendido';

export type Senha = {
  id: string;
  estudante: string;
  servicoId: string;
  servicoNome: string;
  posicao: number;
  status: StatusSenha;
  criadoEm: string;
};

type NovaSenha = {
  estudante: string;
  servicoId: string;
  servicoNome: string;
  pessoasNaFrente: number;
  agora: Date;
};

export function criarSenha({
  estudante,
  servicoId,
  servicoNome,
  pessoasNaFrente,
  agora,
}: NovaSenha): Senha {
  const criadoEm = agora.toISOString();

  return {
    id: `${servicoId}-${agora.getTime()}`,
    estudante,
    servicoId,
    servicoNome,
    posicao: pessoasNaFrente + 1,
    status: 'aguardando',
    criadoEm,
  };
}
