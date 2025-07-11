async function produtoPorId(id) {
  try {
    const response = await fetch(`http://localhost:3000/produtos/${id}`);
    if (!response.ok) {
      throw new Error(
        `Produto com ID ${id} não encontrado (status ${response.status})`
      );
    }
    const data = await response.json();
    return data;
  } catch (erro) {
    console.error("Erro inesperado:", erro);
    return null;
  }
}
/*
 produtoPorId(1).then((produto) => {
 console.log(produto);
});*/

async function buscarProdutos() {
  try {
    const response = await fetch("http://localhost:3000/produtos");
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Ocorreu um erro", err);
    return null;
  }
}

// buscarProdutos().then((response) => console.log(response));

async function criarProduto(nome, categoria, preco) {
  try {
    let objetoProduto = {
      nome: nome,
      categoria: categoria,
      preco: Number(preco).toLocaleString("pt-br", {
        style: "currency",
        currency: "BRL",
      }),
    };
    await buscarProdutos()
      .then((dados) => {
        let maiorId = dados.reduce((anterior, atual) => {
          return +atual.id > anterior ? +atual.id : anterior;
        }, 0);

        Object.assign(objetoProduto, {
          id: ++maiorId,
        });
        return objetoProduto;
      })
      .then(async (novoProduto) => {
        try {
          const resposta = await fetch("http://localhost:3000/produtos", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(novoProduto),
          });

          const produtoCriado = await resposta.json();
          console.log("Produto criado:", produtoCriado);
        } catch (erro) {
          console.error("Erro ao criar produto:", erro.message);
        }
      });
  } catch (err) {
    console.log(err);
  }
}
// criarProduto("Televisão 800 polegadas", "eletrônicos", 3880.4);

async function produtosPorCategorias() {
  try {
    const response = await fetch("http://localhost:3000/produtos");
    const data = await response.json();
    return Object.groupBy(data, ({ categoria }) => categoria);
  } catch (err) {
    console.error("Ocorreu um erro", err);
    return null;
  }
}

produtosPorCategorias().then((response) => console.log(response));
