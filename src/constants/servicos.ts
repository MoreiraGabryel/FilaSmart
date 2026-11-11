export type Servico = {
  id: string;
  nome: string;
  descricao: string;
  pessoasNaFrente: number;
  tempoEstimado: string;
};

export const servicos: Servico[] = [
  {
    id: 'secretaria',
    nome: 'Secretaria Acadêmica',
    descricao: 'Matrícula, documentos e requerimentos.',
    pessoasNaFrente: 4,
    tempoEstimado: '20 min',
  },
  {
    id: 'biblioteca',
    nome: 'Biblioteca',
    descricao: 'Renovação, suporte ao acervo e credenciais.',
    pessoasNaFrente: 1,
    tempoEstimado: '8 min',
  },
  {
    id: 'laboratorio',
    nome: 'Laboratórios',
    descricao: 'Apoio técnico e reserva de equipamentos.',
    pessoasNaFrente: 6,
    tempoEstimado: '30 min',
  },
  {
    id: 'financeiro',
    nome: 'Atendimento Financeiro',
    descricao: 'Boletos, acordos e comprovantes.',
    pessoasNaFrente: 3,
    tempoEstimado: '15 min',
  },
];

export function encontrarServico(id: string | undefined) {
  return servicos.find((servico) => servico.id === id) ?? servicos[0];
}
