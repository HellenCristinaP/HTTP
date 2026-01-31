import express from 'express';
import clientes from './dados.js';
import cors from 'cors';
const PORT = 3300;

const app = express();

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/clientes`);
});

app.get('/clientes', (req, res) => {
    res.status(200).json(clientes);
});

app.post('/clientes', (req, res) => {
    const novoCliente = req.body;
    novoCliente.id = clientes.length + 1;

    if(!novoCliente.nome || !novoCliente.email) {
        return res.status(400).json({ message: 'Dados do cliente inválidos.' });
    }

    while(clientes.find(cliente => cliente.id === novoCliente.id)) {
        novoCliente.id++;
    }

    clientes.push(novoCliente);
    
    res.status(201).json({
        message: 'Cliente adicionado com sucesso!',
        cliente: novoCliente,
    });
});

app.delete('/clientes/:id', (req, res) => {
    const { id } = req.params;
    const index = clientes.findIndex((cliente) => cliente.id === Number(id));

    if (index !== -1) {
        const clienteRemovido = clientes.splice(index, 1);
        res.status(200).json({
            message: 'Cliente removido com sucesso!',
            cliente: clienteRemovido,
        });
    } else {
        res.status(404).json({ message: 'Cliente não encontrado.' });
    }
});

export { PORT };