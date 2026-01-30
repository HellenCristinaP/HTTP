const form = document.querySelector('form');
const clientesUl = document.getElementById('clientes');

form.addEventListener('submit', function(event) {
    event.preventDefault();
    cadastrarClientes();
});

async function cadastrarClientes() {
    const nome = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    
    const novoCliente = {
        nome: nome,
        email: email
    };

    const response = await fetch('http://localhost:3300/clientes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(novoCliente),
    });

    if (response.ok) {
        const resultado = await response.json();
        console.log(resultado.message);
        listarClientes();
    } else {
        alert('Erro ao cadastrar cliente.');
    }
}

async function excluirCliente(indexCliente) {
    const response = await fetch(`http://localhost:3300/clientes/${indexCliente}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        const resultado = await response.json();
        console.log(resultado.message);
        listarClientes();
    } else {
        console.error('Erro ao excluir cliente.');
    }
}

function listarClientes() {
    clientesUl.innerHTML = '';

    fetch('http://localhost:3300/clientes')
        .then(response => response.json())
        .then(clientes => {
            clientes.forEach((cliente) => {
                const li = document.createElement('li');
                li.innerHTML = `Nome: ${cliente.nome}, Email: ${cliente.email} <button onclick="excluirCliente(${cliente.id})">Excluir</button>`;
                clientesUl.appendChild(li);
            });
        })
        .catch(error => console.error('Erro ao buscar clientes:', error));
}

window.excluirCliente = excluirCliente;