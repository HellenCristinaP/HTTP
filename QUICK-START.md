# 🚀 Quick Start - Desenvolvimento Local

## ⚡ Opção 1: Com npm e Node.js (Recomendado)

### Pré-requisitos
- Node.js v16+ instalado
- npm ou yarn

### Passo 1: Instalar dependências
```bash
npm install
```

### Passo 2: Rodar servidor em um terminal
```bash
npm run dev
# ou com hot reload (recomendado)
npm run watch
```

Você verá:
```
🚀 Servidor rodando na porta 3001
📍 URL: http://localhost:3001
✅ API pronta para receber requisições
```

### Passo 3: Em outro terminal, servir os arquivos estáticos (opcional)
```bash
npx http-server . -p 8080
```

### Passo 4: Abrir no navegador
- API: `http://localhost:3001/health`
- Aplicação: `http://localhost:8080` (ou se estiver servindo em outra porta)

### Passo 5: Testar a API
```bash
npm test
```

---

## 🔥 Opção 2: Com VS Code Live Server (Mais Fácil)

### Instalação
1. Abra VS Code
2. Vá para Extensions (Ctrl+Shift+X)
3. Procure por "Live Server"
4. Instale a extensão por Ritwick Dey

### Como usar
1. Clique com botão direito em `index.html`
2. Selecione "Open with Live Server"
3. Seu navegador abrirá automaticamente em `http://127.0.0.1:5500`

### Próximos passos
1. Abra outro terminal
2. Digite: `npm run dev`
3. A API estará rodando em `http://localhost:3001`

A aplicação já vai estar apontando para `http://localhost:3001` automaticamente!

---

## 📁 Estrutura de Pastas Explicada

```
HTTP/
├── index.html              ← Página principal
├── styles/
│   └── style.css          ← Estilos CSS
├── scripts/
│   ├── script.js          ← Lógica do frontend
│   └── test-api.js        ← Script de testes
├── src/
│   ├── server.js          ← Servidor Express (Backend)
│   └── dados.js           ← Base de dados em memória
├── api/
│   └── clientes.js        ← API serverless (Vercel)
├── package.json           ← Dependências do projeto
├── vercel.json            ← Config do deploy Vercel
├── nodemon.json           ← Config do auto-reload
├── .env.example           ← Exemplo de variáveis
├── .env.local             ← Variáveis de dev
├── README.md              ← Documentação principal
├── DEPLOY.md              ← Guia de deployment
└── API-EXAMPLES.md        ← Exemplos de requisições
```

---

## 🧪 Testando a Aplicação

### Teste 1: Verificar se a API está funcionando
```bash
# Terminal 1
npm run dev

# Terminal 2
curl http://localhost:3001/health
# Resposta esperada: {"status":"ok"}
```

### Teste 2: Fazer uma requisição GET
```bash
curl http://localhost:3001/clientes
```

### Teste 3: Criar um cliente
```bash
curl -X POST http://localhost:3001/clientes/dev-key-local \
  -H "Content-Type: application/json" \
  -d '{"nome":"João","email":"joao@email.com"}'
```

### Teste 4: Usar o script automatizado
```bash
npm test
```

---

## 🔧 Configuração de Variáveis de Ambiente

### Arquivo `.env.local` (para desenvolvimento)
```
PORT=3001
KEY=dev-key-local
```

Esse arquivo é usado apenas localmente. **Nunca commit** no Git!

### Arquivo `.env.example` (template para produção)
```
PORT=3001
KEY=sua_chave_secreta_aqui
```

Copie e renomeie para `.env.local` e substitua os valores.

---

## 🐛 Troubleshooting

### ❌ "Port 3001 already in use"
```bash
# Linux/Mac: encontre o processo
lsof -i :3001
# Mate o processo
kill -9 <PID>

# Windows:
netstat -ano | findstr :3001
taskkill /PID <PID> /F
```

### ❌ "Cannot find module 'express'"
```bash
npm install
# ou
npm install --force
```

### ❌ CORS error no navegador
O arquivo `scripts/script.js` deve ter a URL correta:
```javascript
const API_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:3001'
    : 'https://seu-projeto.vercel.app';
```

### ❌ "nodemon: command not found"
```bash
npm install -g nodemon
# ou use
npx nodemon src/server.js
```

---

## 📝 Fluxo Típico de Desenvolvimento

```
1. Terminal 1: npm run watch
   ↓
2. Terminal 2: npm test (validar API)
   ↓
3. Abrir http://localhost:5500 (Live Server) ou outro servidor
   ↓
4. Desenvolver/Testar no navegador
   ↓
5. Fazer mudanças no código
   ↓
6. Nodemon reinicia servidor automaticamente
   ↓
7. Browser recarrega automaticamente (Live Server)
```

---

## 🚀 Deploy Rápido

Quando tudo estiver testado localmente:

### 1. Deploy do Frontend (GitHub Pages)
```bash
# Copiar arquivos necessários
# - index.html
# - styles/
# - scripts/

git add .
git commit -m "Deploy frontend"
git push origin main
```

### 2. Deploy da API (Vercel)
```bash
# Vercel fará deploy automaticamente ao fazer push

# Ou use a CLI da Vercel:
npm i -g vercel
vercel
```

---

## ✅ Checklist Antes de Fazer Deploy

- [ ] Testei localmente com `npm test`
- [ ] Não há erros no console (F12)
- [ ] Frontend está funcionando em http://localhost:5500 ou similar
- [ ] API responde em http://localhost:3001/clientes
- [ ] Posso criar um cliente com sucesso
- [ ] Posso deletar um cliente com sucesso
- [ ] Atualizei a URL da API em `scripts/script.js` para a URL do Vercel (se for fazer deploy)

---

## 📚 Próximos Passos

1. **Persistência de dados**: Integrar banco de dados
2. **Autenticação**: Adicionar login com JWT
3. **Validação**: Melhorar validações no frontend
4. **UI/UX**: Melhorar design e responsividade
5. **Testes**: Adicionar testes unitários com Jest

---

## 📞 Precisa de Ajuda?

- Leia o `README.md` para documentação completa
- Consulte `API-EXAMPLES.md` para exemplos de requisições
- Veja `DEPLOY.md` para instruções de deployment
- Procure por comentários no código (/* ... */)

**Bom desenvolvimento! 🎉**
