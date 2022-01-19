# :computer: Desafio frontend

O desafio de frontend consiste em criar uma aplicação com REACT.

## Layout

Você pode encontrar o layout que precisa ser desenvolvido [aqui](https://www.figma.com/file/oe2pxxjeyQOSwlacmun0f8/Satus---Frontend-challenge?node-id=0%3A1)
_**OBS**: Criar o layout responsivo é um bônus._

## API

Para desenvolver o desafio é necessário utilizar a API que está na pasta backend.

### Iniciar API

Ir para a pasta da api: `cd api`
Instalar dependências: `npm install`
Iniciar API: `npm start`

Abaixo seguem as rotas da API necessárias para o desafio.

| Método | URL                                  | Descrição                   |
| ------ | ------------------------------------ | --------------------------- |
| GET    | http://localhost:3001/categories     | Listar todas as categorias  |
| GET    | http://localhost:3001/categories/:id | Buscar categoria por id     |
| GET    | http://localhost:3001/targets/       | Buscar todos os objetivos   |
| GET    | http://localhost:3001/targets/:id    | Buscar objetivo por id      |
| POST   | http://localhost:3001/targets        | Criar um novo objetivo      |
| PATCH  | http://localhost:3001/targets/:id    | Atualizar parte do objetivo |

## Funcionalidades

### Listar Objetivos (Menu Objetivos)

Listar todos os objetivos que o status seja igual a _"active"_ ou _"done"_.
Para isso pode utilizar a rota `http://localhost:3001/targets/`

### Finalizar objetivo

Quando um objetivo tiver o status _active_, é possível finalizá-lo clicando no botão correspondente.
Ao acionar essa ação, a rota de atualização de status deve ser chamada.

Exemplo:
`http://localhost:3001/targets/:id` [PATCH]

```json
{
  "status": "done",
  "achievedAt": "2022-01-14"
}
```

### Excluir objetivo

Quando um objetivo tiver o status _active_, é possível excluí-lo clicando no botão correspondente.
Ao acionar essa ação, a rota de atualização de status deve ser chamada.

**Exemplo**:
`http://localhost:3001/targets/:id` [PATCH]

```json
{
  "status": "deleted",
  "deletedAt": "2022-01-14"
}
```

### Listar Objetivos excluídos (Menu Excluídos)

Listar todos os objetivos que o status seja igual a _"deleted"_.
Para isso pode utilizar a rota `http://localhost:3001/targets/`

### Restaurar objetivo

Quando um objetivo tiver o status _deleted_, é possível restaurá-lo clicando no botão correspondente.
Ao acionar essa ação, a rota de atualização de status deve ser chamada.

**Exemplo**:
`http://localhost:3001/targets/:id` [PATCH]

```json
{
  "status": "active",
  "deletedAt": ""
}
```

### Pesquisar - bônus
Essa funcionalidade não é obrigatória, mas caso queira você pode criar a ação do input de busca e filtrar os objetivos por título.

### Cadastrar um novo objetivo - bônus
Essa funcionalidade não é obrigatória, mas caso queira criar novos objetivos pode criar um modal com os campos título, descrição e categoria.

Para cadastrar um novo objetivo é necessário chamar a rota de cadastro de objetivo.


**Exemplo**:
`http://localhost:3001/targets` [POST]

```json
{
  "title": "Título do objetivo",
  "description": "Descrição do objetivo",
  "category": 5,
  "createdAt": "2022-01-15",
  "status": "active"
}
```
