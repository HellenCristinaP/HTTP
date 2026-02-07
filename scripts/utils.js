export function listarClientes() {
  const clientesUl = document.getElementById("clientes");

  clientesUl.innerHTML = "";

  fetch("https://698771618bacd1d773ed5c41.mockapi.io/clientes/Clients")
    .then((response) => response.json())
    .then((clientes) => {
      clientes.forEach((cliente) => {
        const li = document.createElement("li");
        li.innerHTML = `
                    <span><strong>${cliente.nome}</strong></span>
                    <span>${cliente.email}</span>
                    <div class="client-actions">
                        <button onclick="excluirCliente(${cliente.id})" class="btn-delete">Excluir</button>
                    </div>
                `;
        clientesUl.appendChild(li);
      });
    })
    .catch((error) => console.error("Erro ao buscar clientes:", error));
}

export async function cadastrarClientes(nome, email) {
  const novoCliente = {
    nome: nome,
    email: email,
  };

  const response = await fetch(
    "https://698771618bacd1d773ed5c41.mockapi.io/clientes/Clients",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(novoCliente),
    },
  );

  if (response.ok) {
    const resultado = await response.json();
    console.log("Cliente cadastrado com sucesso:", resultado);
    listarClientes();
  } else {
    alert("Erro ao cadastrar cliente.");
  }
}

export async function excluirCliente(indexCliente) {
  const response = await fetch(
    `https://698771618bacd1d773ed5c41.mockapi.io/clientes/Clients/${indexCliente}`,
    {
      method: "DELETE",
    },
  );

  if (response.ok) {
    const resultado = await response.json();
    console.log("Cliente excluído com sucesso:", resultado);
    listarClientes();
  } else {
    console.error("Erro ao excluir cliente.");
  }
}
