type TodoRemoto = {
  id: number;
  title: string;
  completed: boolean;
};

type Resposta = {
  ok: boolean;
  json(): Promise<TodoRemoto[]>;
};

type FetchFila = () => Promise<Resposta>;

export type AtualizacaoFila = {
  id: string;
  titulo: string;
  situacao: 'pendente' | 'confirmada';
};

const endpoint = 'https://jsonplaceholder.typicode.com/todos?_limit=4';

export async function carregarAtualizacoesFila(
  fetchFila: FetchFila = () => fetch(endpoint),
): Promise<AtualizacaoFila[]> {
  const resposta = await fetchFila();

  if (!resposta.ok) {
    throw new Error('Não foi possível atualizar as filas.');
  }

  const dados = await resposta.json();

  return dados.map((item) => ({
    id: `api-${item.id}`,
    titulo: item.title.charAt(0).toUpperCase() + item.title.slice(1),
    situacao: item.completed ? 'confirmada' : 'pendente',
  }));
}
