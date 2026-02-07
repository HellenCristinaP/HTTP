# Gerenciador de Clientes - API + Frontend

Aplicação full-stack para gerenciar clientes com API (backend) hospedada na Vercel e Frontend no GitHub Pages.

## 🚀 Estrutura do Projeto

```
├── index.html                 # Página principal do frontend
├── styles/
│   └── style.css             # Estilos CSS
├── scripts/
│   └── script.js             # Lógica do frontend
├── src/
│   ├── server.js             # Servidor Express
│   └── dados.js              # Dados dos clientes
├── api/
│   └── clientes.js           # API serverless para Vercel
├── package.json              # Dependências
├── vercel.json               # Configuração Vercel
├── .env.example              # Exemplo de variáveis de ambiente
└── .env.local                # Variáveis de ambiente local
```

## 📋 Pré-requisitos

- Node.js v16+
- npm ou yarn
- Conta no [Vercel](https://vercel.com) (para deploy da API)
- Conta no GitHub (para deploy do Frontend)

## 🔧 Instalação Local

### 1. Clonar o repositório

```bash
git clone <seu-repositorio>
cd HTTP
```

### 2. Instalar dependências

```bash
npm install
```

### 3. Configurar variáveis de ambiente

Copie o arquivo `.env.example` para `.env.local`:

```bash
cp .env.example .env.local
```

Edite o `.env.local` com suas configurações:

```
PORT=3001
KEY=sua_chave_secreta_aqui
```

### 4. Executar localmente

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:3001`

## 🌐 Deploy no GitHub Pages (Frontend)

### 1. Criar repositório no GitHub

1. Vá para [github.com/new](https://github.com/new)
2. Crie um repositório com o nome: `seu-usuario.github.io`
3. Clone o repositório localmente

### 2. Preparar os arquivos

Copie apenas os arquivos necessários para o GitHub Pages:
- `index.html`
- `styles/`
- `scripts/`

**Nota:** A pasta `src/` e `api/` não são necessárias no GitHub Pages.

### 3. Atualizar URL da API no `scripts/script.js`

Procure pela linha:

```javascript
const API_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:3001'
    : 'https://seu-projeto.vercel.app'; // Substitua por sua URL do Vercel
```

Substitua `seu-projeto.vercel.app` pela URL real do seu projeto na Vercel (você terá após fazer deploy).

### 4. Push para GitHub

```bash
git add .
git commit -m "Deploy frontend no GitHub Pages"
git push origin main
```

## 🚀 Deploy da API na Vercel

### 1. Criar conta e projeto na Vercel

1. Vá para [vercel.com](https://vercel.com)
2. Clique em "New Project"
3. Selecione seu repositório GitHub

### 2. Configurar variáveis de ambiente

Na dashboard do Vercel:
1. Vá para "Settings" > "Environment Variables"
2. Adicione as variáveis:
   - `PORT`: `3001`
   - `KEY`: sua_chave_secreta_segura

### 3. Deploy automático

O Vercel fará deploy automaticamente quando você fazer push para o repositório.

### 4. Atualizar URL no Frontend

Após o deploy, atualize a URL no `scripts/script.js`:

```javascript
const API_URL = 'https://seu-projeto.vercel.app';
```

## 📝 API Endpoints

### GET `/clientes`
Listar todos os clientes (sem autenticação)

```javascript
fetch('https://seu-projeto.vercel.app/clientes')
    .then(res => res.json())
    .then(data => console.log(data))
```

### POST `/clientes/{KEY}`
Adicionar novo cliente (requer chave de autenticação)

```javascript
fetch('https://seu-projeto.vercel.app/clientes/sua-chave', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome: 'João', email: 'joao@email.com' })
})
```

### DELETE `/clientes/{KEY}/{id}`
Remover cliente (requer chave de autenticação)

```javascript
fetch('https://seu-projeto.vercel.app/clientes/sua-chave/1', {
    method: 'DELETE'
})
```

## 🔒 Segurança

- A chave (`KEY`) é usada para autenticar requisições de escrita
- Configure uma chave segura e complexa
- Mantenha a chave em variáveis de ambiente
- Nunca commit `.env.local` no repositório

## 📱 Desenvolvimento Local

Para testar tanto a API quanto o Frontend localmente:

1. Terminal 1 - Executar o servidor:
```bash
npm run dev
```

2. Terminal 2 - Servir arquivos estáticos (opcional):
```bash
npx http-server .
```

Acesse em `http://localhost:8080` (ou a porta indicada)

## 🛠️ Scripts Disponíveis

- `npm run dev` - Executar servidor de desenvolvimento

## 📚 Tecnologias Utilizadas

- **Backend**: Node.js, Express.js
- **Frontend**: HTML5, CSS3, JavaScript (Fetch API)
- **Deployment**: Vercel (API), GitHub Pages (Frontend)
- **CORS**: Habilitado para múltiplos domínios

## 🤝 Contribuindo

1. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
2. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
3. Push para a branch (`git push origin feature/AmazingFeature`)
4. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

## ❓ FAQ

**P: Por que usar Vercel para a API?**
R: Vercel oferece hosting serverless gratuito com suporte a Node.js, CORS configurável e deploy automático via GitHub.

**P: Posso usar outro serviço como backend?**
R: Sim! Você pode usar Firebase, AWS, Heroku, ou qualquer outro serviço que suporte Node.js/Express.

**P: Como aumentar o limite de clientes armazenados?**
R: Atualmente os dados são armazenados em memória. Para dados persistentes, integre um banco de dados como MongoDB ou Firebase.

---

**Criado com ❤️ para o curso EBAC**
