// Configuração da URL da API
const API_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:3001'
    : 'https://seu-projeto.vercel.app'; // Substitua por sua URL do Vercel

const KEY = 'dev-key-local'; // Substitua pela sua chave

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

    try {
        const response = await fetch(`${API_URL}/clientes/${KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(novoCliente),
        });

        if (response.ok) {
            const resultado = await response.json();
            console.log(resultado.message);
            document.getElementById('name').value = '';
            document.getElementById('email').value = '';
            listarClientes();
        } else {
            const erro = await response.json();
            alert('Erro ao cadastrar cliente: ' + erro.message);
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
        alert('Erro ao conectar com o servidor.');
    }
}

async function excluirCliente(indexCliente) {
    if (!confirm('Tem certeza que deseja excluir este cliente?')) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}/clientes/${KEY}/${indexCliente}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            const resultado = await response.json();
            console.log(resultado.message);
            listarClientes();
        } else {
            const erro = await response.json();
            console.error('Erro ao excluir cliente:', erro.message);
            alert('Erro ao excluir cliente.');
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
        alert('Erro ao conectar com o servidor.');
    }
}

function listarClientes() {
    clientesUl.innerHTML = '<li>Carregando...</li>';

    fetch(`${API_URL}/clientes`)
        .then(response => response.json())
        .then(clientes => {
            clientesUl.innerHTML = '';
            
            if (clientes.length === 0) {
                clientesUl.innerHTML = '<li>Nenhum cliente cadastrado.</li>';
                return;
            }

            clientes.forEach((cliente) => {
                const li = document.createElement('li');
                li.innerHTML = `<strong>${cliente.nome}</strong> - ${cliente.email} <button onclick="excluirCliente(${cliente.id})">Excluir</button>`;
                clientesUl.appendChild(li);
            });
        })
        .catch(error => {
            console.error('Erro ao buscar clientes:', error);
            clientesUl.innerHTML = '<li>Erro ao carregar clientes.</li>';
        });
}

// Carregar clientes ao iniciar a página
document.addEventListener('DOMContentLoaded', listarClientes);

window.excluirCliente = excluirCliente;