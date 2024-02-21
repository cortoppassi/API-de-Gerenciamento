const express = require("express");
const router = express.Router();
const Student = require("../models/student");
const Book = require("../models/book");
const auth = require("../middleware/auth");

// Rota para obter todos os alunos
router.get("/", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Rota para cadastrar um novo aluno - Somente para ADM
router.post("/register",  auth, async (req, res) => {
  const newStudent = new Student({
    name: req.body.name,
    cpf: req.body.cpf,
    admin: req.body.admin,
  });

  try {
    const savedStudent = await newStudent.save();
    res.json({ message: 'Aluno cadastrado com sucesso!'});
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Rota para deletar um aluno - Somente para ADM
router.delete("/delete/:id", auth, async (req, res) => {
  const { id } = req.params;
  try {
    const studentId = await Student.findById(id);

    if (!studentId) {
      return res.status(404).json({ message: "Aluno não encontrado!" });
    }

    await Student.deleteOne();
    res.json({ message: 'Aluno deletado com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;
