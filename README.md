# CRM - Sistema de Gerenciamento de Clientes

## 📋 Objetivo do Projeto

Este é um **Sistema de Gerenciamento de Clientes (CRM)** desenvolvido como projeto de aprendizado em **HTTP, APIs REST e JavaScript modular**. O objetivo é demonstrar a integração entre frontend e backend através de requisições HTTP, utilizando uma API mockada para operações CRUD (Create, Read, Update, Delete).

### Funcionalidades
- ✅ Cadastrar novos clientes com nome e email
- ✅ Listar todos os clientes cadastrados
- ✅ Excluir clientes existentes
- ✅ Interface responsiva e intuitiva
- ✅ Validação básica de formulário

---

## 🎓 Propósito de Aprendizado

Este projeto foi desenvolvido para consolidar conhecimentos em:

- **Fetch API**: Requisições HTTP (GET, POST, DELETE)
- **JavaScript ES6 Modules**: Organização de código com `import` e `export`
- **Manipulação do DOM**: Criação dinâmica de elementos HTML
- **Event Listeners**: Captura de eventos do usuário
- **Async/Await**: Tratamento de operações assíncronas
- **Responsividade**: CSS Grid e Media Queries
- **REST API**: Consumo de endpoints e tratamento de respostas

---

## 📁 Estrutura de Pastas

```
HTTP/
├── index.html              # Página HTML principal
├── package.json            # Dependências e scripts do projeto
├── .gitignore              # Arquivos ignorados pelo Git
├── README.md               # Este arquivo
│
├── scripts/                # Scripts JavaScript do frontend
│   ├── app.js              # Lógica principal e event listeners
│   ├── utils.js            # Funções de requisição HTTP
│   └── classes.js          # Definições de classes (estrutura)
│
├── src/                    # Backend Node.js (Express)
│   ├── server.js           # Configuração do servidor Express
│   └── dados.js            # Dados estáticos ou modelos
│
└── styles/                 # Arquivos CSS
    ├── reset.css           # Reset e normalização CSS
    └── style.css           # Estilos principais com Grid
```

---

🔌 API Utilizada: mockapi.io

### Endpoints

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| **GET** | `/Clients` | Lista todos os clientes |
| **POST** | `/Clients` | Cria um novo cliente |
| **DELETE** | `/Clients/{id}` | Remove um cliente por ID |

---

## 🛠️ Tecnologias Utilizadas

- **Frontend**: HTML5, CSS3, JavaScript ES6+
- **API**: MockAPI (https://mockapi.io/)

---

## 📝 Observações

- O projeto usa **Fetch API** nativa sem bibliotecas externas
- Os módulos JavaScript estão organizados em funções reutilizáveis
- O CSS utiliza **CSS Grid** para layout responsivo

---

## 👩‍💻 Autor

Criado por [Hellen Cristina](https://github.com/HellenCristinaP)
