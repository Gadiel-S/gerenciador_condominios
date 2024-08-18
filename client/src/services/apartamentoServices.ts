export const deletarApartamento = async (id: string) => {
  const confirmacao = window.confirm('Você tem certeza que deseja deletar esse apartamento?');
  if(!confirmacao) return;

  try {
    const response = await fetch(`http://localhost:4000/apartamento/deletar/${id}`, {
      method: 'delete',
    });

    if(!response.ok) {
      throw new Error('Erro ao deletar Apartamento');
    }

    return true;

  } catch (error) {
    console.error('Erro ao deletar apartamento:', error);
  }
}

export const deletarDivida = async (id: string) => {
  const confirmacao = window.confirm('Você tem certeza que deseja deletar essa dívida?');
  if(!confirmacao) return;

  try {
    const response = await fetch(`http://localhost:4000/divida/deletar/${id}`, {
      method: 'delete',
    });

    if(!response.ok) {
      throw new Error('Erro ao deletar Dívida');
    }

    return true;

  } catch (error) {
    console.error('Erro ao deletar dívida:', error);
  }
}

export const deletarPagamento = async (id: string) => {
  const confirmacao = window.confirm('Você tem certeza que deseja deletar esse pagamento?');
  if(!confirmacao) return;

  try {
    const response = await fetch(`http://localhost:4000/pagamento/deletar/${id}`, {
      method: 'delete',
    });

    if(!response.ok) {
      throw new Error('Erro ao deletar Pagamento');
    }

    return true;

  } catch (error) {
    console.error('Erro ao deletar Pagamento:', error);
  }
}

export const transformarNumero = (numero: string) => {
  const numeroValor = parseInt(numero, 10);
  if(isNaN(numeroValor)) {
    throw new Error('O campo número deve ser um valor numérico inteiro válido');
  }
  return numeroValor;
}

export const formatarData = (data: string) => {
  const [ano, mes, dia] = data.split('-');
  return `${dia}/${mes}/${ano}`;
}

export const formatarValor = (valor: string) => {
  const valorNumerico = parseFloat(valor);
  if(isNaN(valorNumerico)) {
    throw new Error("Valor deve ser um número válido");
  }
  // Verifica se tem no máximo duas casas decimais
  const valorFormatado = valorNumerico.toFixed(2);
  if(valor !== valorFormatado && valor !== valorNumerico.toString()) {
    throw new Error("Valor deve ter no máximo duas casas decimais");
  }
  return valorNumerico;
}