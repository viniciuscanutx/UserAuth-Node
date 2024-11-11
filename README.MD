# Projeto de API de Autenticação com Node.js e Express

Este é um projeto de exemplo de uma API de autenticação desenvolvida com Node.js, Express e MongoDB. A API permite que os usuários se registrem, façam login e acessem rotas protegidas mediante autenticação por token JWT.

## Funcionalidades

- Registro de usuários com hashing seguro de senha usando bcrypt.
- Login de usuário com autenticação JWT.
- Rota pública para verificação do status da API.
- Rota privada que busca dados do usuário, protegida por verificação de token.

## Endpoints

:information_source: **Aviso:** Substitua `<baseUrl>` pelo URL base da API para acessar os endpoints.

| Endpoint | Descrição | Exemplo de Uso (bash) |
|----------|-----------|-----------------------|
| `/` | Retorna uma apresentação da API | `curl <baseUrl>/` |
| `/auth/register` | Registro de usuário através de um formulario JSON | `curl <baseUrl>//auth/register` |
| `/auth/login` | Login de usuário através de um formulário JSON | `curl <baseUrl>/auth/login` |

:information_source: **Aviso:** Essa API tem rotas privadas que só são acessadas através de Tokens.

## Tecnologias Utilizadas

- Node.js: Ambiente de execução JavaScript do lado do servidor.
- Express: Framework para aplicações web em Node.js.
- MongoDB: Banco de dados NoSQL para armazenamento de dados.
- Mongoose: ODM (Object Data Modeling) para interação com MongoDB.
- bcrypt: Biblioteca para hashing de senhas.
- jsonwebtoken: Biblioteca para criação e verificação de tokens JWT.
- dotenv: Carregamento de variáveis de ambiente a partir de um arquivo .env.

## Pré-requisitos

- Node
- Dependências

## Como Executar o Projeto

### 1. Clone o Repositório

```bash
$ git clone https://github.com/seu-usuario/seu-repositorio.git
$ cd seu-repositorio
```

### 2. Instalar Dependências

```bash
$ npm install
```

### 3. Configurar Variáveis de Ambiente

Crie um arquivo .env na raiz do projeto e adicione as seguintes variáveis:

```bash
MONGO_URI=sua_string_de_conexao_mongodb
JWT_SECRET=sua_chave_secreta_para_jwt
PORT=3000
```

### 4. Executar o Projeto

```bash
$ npm start
```

## Contribuindo

Contribuições são bem-vindas! Se você deseja adicionar novos filmes, séries, ou fazer melhorias, basta criar um Pull Request e daremos uma olhada o quanto antes.

## Licença
Licenciado sob a Open Software License v3.0.

