## API - Biblioteca

## Aplicação construída em Node.js utilizando o framework Express, MongoDB como banco de dados, e JWT para autenticação. Essa aplicação fornece um conjunto de funcionalidades para administrar o acervo de uma biblioteca, controlar o cadastro de alunos, e gerenciar operações de empréstimo de livros.

---

### Requisitos

- [x] Deve ser possível listar os livros
- [x] Deve ser possivel alugar um livro
- [x] Deve ser possivel devolver o livro locado
- [x] Deve ser possivel cadastrar um novo livro
- [x] Deve ser possivel excluir um livro

---

- [x] Deve ser possivel cadastrar alunos
- [x] Deve ser possivel listar os alunos cadastrados
- [x] Deve ser possivel deletar um aluno

---

- [x] Deve ser possivel cadastrar administradores
- [x] Deve ser possivel listar os administradores cadastrados
- [x] Deve ser possivel deletar um administrador

---

## Regras de negócio

- [x] Apenas administradores devem ter acessos as rotas de cadastro
- [x] Apenas administradores devem ter deletar administradores/estudantes
- [x] Apenas estudantes cadastrados devem locar livros
