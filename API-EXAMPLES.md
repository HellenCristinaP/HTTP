# 🧪 Exemplos de Requisições API

## Configuração Base
```
URL Base: https://seu-projeto.vercel.app
Chave de Autenticação: sua-chave-secreta
Content-Type: application/json
```

---

## 1️⃣ GET - Listar Clientes (Público)

### Endpoint
```
GET /clientes
```

### cURL
```bash
curl -X GET "https://seu-projeto.vercel.app/clientes"
```

### JavaScript (Fetch)
```javascript
fetch('https://seu-projeto.vercel.app/clientes')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Erro:', error));
```

### Python (Requests)
```python
import requests

response = requests.get('https://seu-projeto.vercel.app/clientes')
print(response.json())
```

### Resposta (200 OK)
```json
[
    {
        "id": 1,
        "nome": "João Silva",
        "email": "joao.silva@email.com"
    },
    {
        "id": 2,
        "nome": "Maria Santos",
        "email": "maria.santos@email.com"
    }
]
```

---

## 2️⃣ POST - Criar Novo Cliente

### Endpoint
```
POST /clientes/{KEY}
```

### Headers
```
Content-Type: application/json
```

### Body
```json
{
    "nome": "Ana Costa",
    "email": "ana.costa@email.com"
}
```

### cURL
```bash
curl -X POST "https://seu-projeto.vercel.app/clientes/sua-chave-secreta" \
  -H "Content-Type: application/json" \
  -d '{"nome":"Ana Costa","email":"ana.costa@email.com"}'
```

### JavaScript (Fetch)
```javascript
const novoCliente = {
    nome: "Ana Costa",
    email: "ana.costa@email.com"
};

fetch('https://seu-projeto.vercel.app/clientes/sua-chave-secreta', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(novoCliente)
})
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Erro:', error));
```

### Python (Requests)
```python
import requests

novo_cliente = {
    "nome": "Ana Costa",
    "email": "ana.costa@email.com"
}

response = requests.post(
    'https://seu-projeto.vercel.app/clientes/sua-chave-secreta',
    json=novo_cliente
)
print(response.json())
```

### Resposta Sucesso (201 Created)
```json
{
    "message": "Cliente adicionado com sucesso!",
    "cliente": {
        "id": 4,
        "nome": "Ana Costa",
        "email": "ana.costa@email.com"
    }
}
```

### Resposta Erro (400 Bad Request)
```json
{
    "message": "Dados do cliente inválidos. Nome e email são obrigatórios."
}
```

### Resposta Erro Email Inválido (400 Bad Request)
```json
{
    "message": "Formato de email inválido."
}
```

---

## 3️⃣ DELETE - Remover Cliente

### Endpoint
```
DELETE /clientes/{KEY}/{id}
```

### Parâmetros
- `KEY`: Sua chave de autenticação
- `id`: ID do cliente a ser removido

### cURL
```bash
curl -X DELETE "https://seu-projeto.vercel.app/clientes/sua-chave-secreta/4"
```

### JavaScript (Fetch)
```javascript
const clienteId = 4;

fetch(`https://seu-projeto.vercel.app/clientes/sua-chave-secreta/${clienteId}`, {
    method: 'DELETE'
})
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Erro:', error));
```

### Python (Requests)
```python
import requests

cliente_id = 4
response = requests.delete(
    f'https://seu-projeto.vercel.app/clientes/sua-chave-secreta/{cliente_id}'
)
print(response.json())
```

### Resposta Sucesso (200 OK)
```json
{
    "message": "Cliente removido com sucesso!",
    "cliente": [
        {
            "id": 4,
            "nome": "Ana Costa",
            "email": "ana.costa@email.com"
        }
    ]
}
```

### Resposta Erro Cliente Não Encontrado (404 Not Found)
```json
{
    "message": "Cliente não encontrado."
}
```

---

## 4️⃣ Health Check

### Endpoint
```
GET /health
```

### Propósito
Verificar se o servidor está online e respondendo.

### cURL
```bash
curl -X GET "https://seu-projeto.vercel.app/health"
```

### JavaScript
```javascript
fetch('https://seu-projeto.vercel.app/health')
    .then(response => response.json())
    .then(data => console.log('Servidor status:', data.status))
    .catch(error => console.error('Servidor offline:', error));
```

### Resposta (200 OK)
```json
{
    "status": "ok"
}
```

---

## 📊 Códigos de Status HTTP

| Código | Significado | Exemplo |
|--------|-------------|---------|
| `200` | OK | GET retornou dados |
| `201` | Created | Cliente criado com sucesso |
| `400` | Bad Request | Dados inválidos |
| `404` | Not Found | Cliente não existe |
| `500` | Server Error | Erro no servidor |

---

## 🛡️ Erros Comuns

### ❌ CORS Error
```
Access to XMLHttpRequest at '...' from origin '...' has been blocked by CORS policy
```
**Solução**: Verificar se o domínio está na lista de CORS do servidor.

### ❌ 401 Unauthorized
```json
{
    "message": "Não autorizado"
}
```
**Solução**: Verificar se a chave (KEY) está correta.

### ❌ 400 Bad Request
```json
{
    "message": "Dados do cliente inválidos."
}
```
**Solução**: Verificar se `nome` e `email` foram enviados.

---

## 📝 Dicas de Teste

### Usar Postman/Insomnia
1. Baixe [Postman](https://www.postman.com/downloads/)
2. Importe a coleção ou crie manualmente
3. Salve em variáveis de ambiente
4. Teste antes de fazer deploy

### Usar cURL em Terminal
```bash
# GET
curl https://seu-projeto.vercel.app/clientes

# POST
curl -X POST https://seu-projeto.vercel.app/clientes/sua-chave \
  -H "Content-Type: application/json" \
  -d '{"nome":"Teste","email":"teste@email.com"}'

# DELETE
curl -X DELETE https://seu-projeto.vercel.app/clientes/sua-chave/1
```

### Usar DevTools do Navegador
1. Abra a página em seu navegador
2. Pressione `F12`
3. Vá para aba "Network"
4. Execute ações (cadastro, exclusão)
5. Veja as requisições em tempo real

---

## 🔒 Boas Práticas de Segurança

✅ **Faça**:
- Use HTTPS em produção
- Guarde a chave segura
- Valide dados no backend
- Use variáveis de ambiente
- Implemente rate limiting

❌ **Não faça**:
- Deixar chave no código
- Usar chave simples (123456)
- Enviar dados sensíveis sem HTTPS
- Confiar apenas em validação frontend
- Compartilhar chave publicamente

---

## 📚 Links Úteis

- [MDN - Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [Express.js Docs](https://expressjs.com/)
- [HTTP Status Codes](https://httpwg.org/specs/rfc7231.html)
- [REST API Best Practices](https://restfulapi.net/)
