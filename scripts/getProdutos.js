async function getProdutos(id) {
  try {
    const response = await fetch(`http://localhost:3000/${id}`);
    const data = await response.json();
    return data;
  } catch (erro) {
    console.error("Erro inesperado:", erro);
    return null;
  }
}

getProdutos(0).then((produto) => {
  console.log(produto);
});
