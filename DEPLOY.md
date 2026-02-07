# 📘 Guia de Deploy - GitHub Pages + Vercel

## Passo 1: Preparar o Frontend para GitHub Pages

### 1.1 Criar novo repositório no GitHub
1. Acesse [github.com/new](https://github.com/new)
2. Crie um repositório com o nome: **seu-usuario.github.io**
3. Escolha "Public"
4. Não inicialize com README (vamos fazer isso)

### 1.2 Preparar os arquivos
Na sua máquina local, organize os arquivos:
```
seu-repositorio/
├── index.html
├── styles/
│   └── style.css
├── scripts/
│   └── script.js
└── README.md
```

⚠️ **NÃO inclua**:
- `src/` (servidor Node.js)
- `api/` (funções serverless)
- `node_modules/`
- `.env*` (variáveis de ambiente)

### 1.3 Atualizar URL da API
No arquivo `scripts/script.js`, altere:
```javascript
const API_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:3001'
    : 'https://SEU-PROJETO.vercel.app'; // ← Substitua aqui
```

### 1.4 Fazer push para GitHub
```bash
cd seu-repositorio
git init
git add .
git commit -m "Deploy inicial do frontend"
git branch -M main
git remote add origin https://github.com/seu-usuario/seu-usuario.github.io.git
git push -u origin main
```

### 1.5 Ativar GitHub Pages
1. Vá para Settings do repositório
2. Procure por "Pages"
3. Em "Source", selecione "Deploy from a branch"
4. Branch: **main** | Folder: **root**
5. Clique em Save

🎉 Seu site estará disponível em: `https://seu-usuario.github.io`

---

## Passo 2: Fazer Deploy da API na Vercel

### 2.1 Criar conta Vercel
1. Acesse [vercel.com](https://vercel.com)
2. Clique em "Sign Up"
3. Use sua conta GitHub para facilitar

### 2.2 Criar novo projeto
1. Na dashboard, clique em "New Project"
2. Selecione "Import Git Repository"
3. Escolha o repositório com seu código (HTTP)

### 2.3 Configurar variáveis de ambiente
1. Vá para "Settings" > "Environment Variables"
2. Adicione:
   - **PORT**: `3001`
   - **KEY**: `sua-chave-secreta-complexa-aqui`

💡 **Dica de segurança**: Use uma chave forte, algo como:
```
abcd1234efgh5678ijkl9012mnop3456
```

### 2.4 Deploy
1. Clique em "Deploy"
2. Espere completar (geralmente 2-3 minutos)
3. Copie a URL fornecida (ex: https://seu-projeto.vercel.app)

### 2.5 Atualizar URL no GitHub Pages
Volte ao repositório do GitHub Pages e:
1. Edite `scripts/script.js`
2. Altere:
```javascript
const API_URL = 'https://seu-projeto.vercel.app';
```
3. Commit e push

🚀 Agora tudo está integrado!

---

## Passo 3: Testando a Aplicação

### Teste Local
```bash
# Terminal 1 - Rodar API localmente
npm run dev

# Terminal 2 - Servir arquivos estáticos (opcional)
npx http-server .
```

Acesse: `http://localhost:8080` (ou a porta indicada)

### Teste em Produção
1. Acesse sua URL do GitHub Pages: `https://seu-usuario.github.io`
2. Tente cadastrar um cliente
3. Verifique no console se não há erros (F12)

---

## Passo 4: Troubleshooting

### ❌ Erro: "Failed to fetch"
**Solução**: Verifique se:
- [ ] API está rodando na Vercel
- [ ] URL em `script.js` está correta
- [ ] CORS está habilitado no `server.js`

### ❌ Erro: "CORS Policy"
**Solução**: No `server.js`, adicione seu domínio ao CORS:
```javascript
app.use(cors({
    origin: [
        'https://seu-usuario.github.io',  // ← Adicione
        // ... outros domínios
    ]
}));
```

Depois faça push para Vercel.

### ❌ Dados não persistem após reload
**Solução**: Normal! Os dados estão em memória.
Para dados permanentes, integre um banco de dados:
- Firebase Realtime Database
- MongoDB
- PostgreSQL

---

## Passo 5: Próximas Melhorias

### 📊 Integrar Banco de Dados
```javascript
// Exemplo com Firebase (Realtime Database)
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, remove } from "firebase/database";

const db = getDatabase(app);
```

### 🔐 Autenticação de Usuários
```javascript
// Exemplo com Firebase Auth
import { getAuth, signInWithGoogle } from "firebase/auth";
```

### 📱 Melhorar Interface
- Adicionar validação em tempo real
- Spinner de carregamento
- Notificações de sucesso/erro
- Design responsivo melhorado

---

## 📞 Links Úteis

- [Documentação Vercel](https://vercel.com/docs)
- [GitHub Pages Docs](https://docs.github.com/pt/pages)
- [Express.js](https://expressjs.com/)
- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

---

## ✅ Checklist Final

- [ ] Repositório GitHub criado (seu-usuario.github.io)
- [ ] Frontend enviado para GitHub
- [ ] GitHub Pages ativado
- [ ] Projeto Vercel criado
- [ ] Variáveis de ambiente configuradas na Vercel
- [ ] API fazendo deploy com sucesso
- [ ] URL da API atualizada no frontend
- [ ] Teste local realizado com sucesso
- [ ] Teste em produção realizado com sucesso

🎉 **Tudo pronto! Sua aplicação está online!**
