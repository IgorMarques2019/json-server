async function buscarClientes() {
  try {
    const response = await fetch("http://localhost:3000/clientes");
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Ocorreu um erro", err);
    return null;
  }
}

async function criarCliente(nome, idade, cidade) {
  try {
    let objetoCliente = {
      nome: nome,
      idade: idade,
      cidade: cidade,
    };
    await buscarClientes()
      .then((dados) => {
        let maiorId = dados.reduce((anterior, atual) => {
          return +atual.id > anterior ? +atual.id : anterior;
        }, 0);

        Object.assign(objetoCliente, {
          id: ++maiorId,
        });
        return objetoCliente;
      })
      .then(async (novoCliente) => {
        try {
          const resposta = await fetch("http://localhost:3000/clientes", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(novoCliente),
          });

          const clienteCriado = await resposta.json();
          console.log("Cliente criado:", clienteCriado);
        } catch (erro) {
          console.error("Erro ao criar cliente:", erro.message);
        }
      });
  } catch (err) {
    console.log(err);
  }
}

// criarCliente("Igor", 29, "São paulo");
