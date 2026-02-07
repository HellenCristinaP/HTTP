import express from 'express';
import clientes from './dados.js';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const PORT = process.env.PORT || 3001;
const KEY = process.env.KEY || 'dev-key-local';

const app = express();

// Configurar CORS para múltiplos domínios
app.use(cors({
    origin: [
        'https://HellenCristinaP.github.io',
        'http://localhost:3000',
        'http://localhost:5500',
        'http://127.0.0.1:5500',
        'http://localhost:3001'
    ],
    methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use(express.json());

// Health check
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

// GET - Listar todos os clientes (sem autenticação)
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
    
    // Validação
    if (!novoCliente.nome || !novoCliente.email) {
        return res.status(400).json({ 
            message: 'Dados do cliente inválidos. Nome e email são obrigatórios.' 
        });
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(novoCliente.email)) {
        return res.status(400).json({ 
            message: 'Formato de email inválido.' 
        });
    }

    // Gerar ID único
    novoCliente.id = clientes.length > 0 ? Math.max(...clientes.map(c => c.id)) + 1 : 1;

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

// Tratamento de erro 404
app.use((req, res) => {
    res.status(404).json({ message: 'Rota não encontrada.' });
});

// Iniciar servidor
const server = app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
    console.log(`📍 URL: http://localhost:${PORT}`);
    console.log(`✅ API pronta para receber requisições`);
});

// Tratamento de erros não capturados
process.on('unhandledRejection', (reason, promise) => {
    console.error('Promise rejection não tratada em:', promise, 'razão:', reason);
});

export { PORT, KEY };