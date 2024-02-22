const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");
const auth = require("../middleware/auth");

router.get("/", studentController.listarTodosAlunos);
router.post("/cadastrar", auth, studentController.cadastrarAluno);
router.delete("/deletar/:id", auth, studentController.deletarAluno);

module.exports = router;