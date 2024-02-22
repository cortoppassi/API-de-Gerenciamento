const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");
const auth = require("../middleware/auth");

// Rotas para para obter todos os alunos
router.get("/", studentController.obterTodosAlunos);
//Rota para cadastrar um novo aluno (Somente para ADM)
router.post("/cadastrar", auth, studentController.cadastrarAluno);
//Rota para deletar um aluno (Somente para ADM)
router.delete("/deletar/:id", auth, studentController.deletarAluno);

module.exports = router;
