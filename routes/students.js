const express = require("express");
const router = express.Router();
const Student = require("../models/student");
const Book = require("../models/book");

// Rota para obter todos os alunos
router.get("/", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Rota para cadastrar um novo aluno
router.post("/", async (req, res) => {
  const newStudent = new Student({
    name: req.body.name,
    cpf: req.body.cpf,
    admin: req.body.admin,
  });

  try {
    const savedStudent = await newStudent.save();
    res.status(201).json(savedStudent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Rota para deletar um aluno
router.delete("/delete/:id", async (req, res) => {
  const studentId = req.params.id;
  try {
    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).json({ message: "Aluno não encontrado!" });
    }

    await student.deleteOne();
    res.json({ message: 'Aluno deletado com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;
