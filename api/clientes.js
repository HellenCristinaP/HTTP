// API Serverless para Vercel
import express from 'express';
import cors from 'cors';
import clientes from '../src/dados.js';

const app = express();

app.use(cors({
    origin: ['https://seu-usuario.github.io', 'http://localhost:3000', 'http://localhost:5500'],
    methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type']
}));

app.use(express.json());

const KEY = process.env.KEY || 'dev-key-local';

// GET - Listar todos os clientes
app.get('/clientes', (req, res) => {
    res.status(200).json(clientes);
});

// GET - Listar clientes com autenticação
app.get(`/clientes/${KEY}`, (req, res) => {
    res.status(200).json(clientes);
});

// POST - Adicionar novo cliente
app.post(`/clientes/${KEY}`, (req, res) => {
    const novoCliente = req.body;
    novoCliente.id = clientes.length > 0 ? Math.max(...clientes.map(c => c.id)) + 1 : 1;

    if (!novoCliente.nome || !novoCliente.email) {
        return res.status(400).json({ message: 'Dados do cliente inválidos.' });
    }

    clientes.push(novoCliente);
    
    res.status(201).json({
        message: 'Cliente adicionado com sucesso!',
        cliente: novoCliente,
    });
});

// DELETE - Remover cliente
app.delete(`/clientes/${KEY}/:id`, (req, res) => {
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

export default app;
