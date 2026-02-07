#!/usr/bin/env node

/**
 * Script de teste para validar a API
 * Use: node scripts/test-api.js
 */

const API_URL = 'http://localhost:3001';
const KEY = 'dev-key-local';

const colors = {
    reset: '\x1b[0m',
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
};

function log(type, message) {
    const prefix = {
        success: `${colors.green}✓${colors.reset}`,
        error: `${colors.red}✗${colors.reset}`,
        info: `${colors.blue}ℹ${colors.reset}`,
        warn: `${colors.yellow}⚠${colors.reset}`,
    }[type] || '';
    
    console.log(`${prefix} ${message}`);
}

async function testHealthCheck() {
    log('info', 'Testando health check...');
    try {
        const response = await fetch(`${API_URL}/health`);
        if (response.ok) {
            log('success', 'Health check OK');
            return true;
        } else {
            log('error', `Health check falhou com status ${response.status}`);
            return false;
        }
    } catch (error) {
        log('error', `Health check erro: ${error.message}`);
        return false;
    }
}

async function testGetClientes() {
    log('info', 'Testando GET /clientes...');
    try {
        const response = await fetch(`${API_URL}/clientes`);
        if (response.ok) {
            const data = await response.json();
            log('success', `GET /clientes retornou ${data.length} cliente(s)`);
            return true;
        } else {
            log('error', `GET /clientes falhou com status ${response.status}`);
            return false;
        }
    } catch (error) {
        log('error', `GET /clientes erro: ${error.message}`);
        return false;
    }
}

async function testCreateCliente() {
    log('info', 'Testando POST /clientes...');
    try {
        const novoCliente = {
            nome: `Teste ${Date.now()}`,
            email: `teste${Date.now()}@email.com`,
        };

        const response = await fetch(`${API_URL}/clientes/${KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(novoCliente),
        });

        if (response.ok) {
            const data = await response.json();
            log('success', `Cliente criado com ID: ${data.cliente.id}`);
            return data.cliente.id;
        } else {
            const data = await response.json();
            log('error', `POST falhou: ${data.message}`);
            return null;
        }
    } catch (error) {
        log('error', `POST erro: ${error.message}`);
        return null;
    }
}

async function testDeleteCliente(id) {
    log('info', `Testando DELETE /clientes/${id}...`);
    try {
        const response = await fetch(`${API_URL}/clientes/${KEY}/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            log('success', `Cliente ${id} deletado com sucesso`);
            return true;
        } else {
            const data = await response.json();
            log('error', `DELETE falhou: ${data.message}`);
            return false;
        }
    } catch (error) {
        log('error', `DELETE erro: ${error.message}`);
        return false;
    }
}

async function runTests() {
    console.log('\n' + '='.repeat(50));
    console.log('🧪 Testando API - HTTP');
    console.log('='.repeat(50) + '\n');

    const tests = [
        { name: 'Health Check', fn: testHealthCheck },
        { name: 'GET /clientes', fn: testGetClientes },
        { name: 'POST /clientes', fn: testCreateCliente },
    ];

    let clienteId = null;
    let passedTests = 0;

    for (const test of tests) {
        console.log(`\n${colors.blue}→ ${test.name}${colors.reset}`);
        
        if (test.name === 'POST /clientes') {
            clienteId = await test.fn();
            if (clienteId) passedTests++;
        } else {
            const result = await test.fn();
            if (result) passedTests++;
        }
    }

    // Test DELETE se POST funcionou
    if (clienteId) {
        console.log(`\n${colors.blue}→ DELETE /clientes${colors.reset}`);
        const deleteResult = await testDeleteCliente(clienteId);
        if (deleteResult) passedTests++;
    }

    console.log('\n' + '='.repeat(50));
    console.log(`${colors.green}Testes: ${passedTests}/${tests.length + 1} passaram${colors.reset}`);
    console.log('='.repeat(50) + '\n');

    if (passedTests === tests.length + 1) {
        log('success', 'Todos os testes passaram! 🎉');
        process.exit(0);
    } else {
        log('warn', 'Alguns testes falharam. Verifique os logs acima.');
        process.exit(1);
    }
}

// Iniciar testes
runTests().catch(error => {
    log('error', `Erro ao executar testes: ${error.message}`);
    process.exit(1);
});
