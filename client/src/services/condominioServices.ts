export const deletarReceita = async (id: string) => {
  const confirmacao = window.confirm('Você tem certeza que deseja deletar essa Receita?');
  if(!confirmacao) return;

  try {
    const response = await fetch(`http://localhost:4000/condominio/receita/deletar/${id}`, {
      method: 'delete',
    });

    if(!response.ok) {
      throw new Error('Erro ao deletar Receita');
    }

    return true;

  } catch (error) {
    console.error('Erro ao deletar Receita:', error);
  }
}

export const deletarDespesa = async (id: string) => {
  const confirmacao = window.confirm('Você tem certeza que deseja deletar essa Despesa?');
  if(!confirmacao) return;

  try {
    const response = await fetch(`http://localhost:4000/condominio/despesa/deletar/${id}`, {
      method: 'delete',
    });

    if(!response.ok) {
      throw new Error('Erro ao deletar Despesa');
    }

    return true;

  } catch (error) {
    console.error('Erro ao deletar Despesa:', error);
  }
}