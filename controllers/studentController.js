const express = require("express");
const router = express.Router();
const Student = require("../models/student");

const listarTodosAlunos = async (req, res) => {
  try {
    const alunos = await Student.find();
    res.json(alunos);
  } catch (err) {
    res.status(500).json({ mensagem: err.message });
  }
};
const cadastrarAluno = async (req, res) => {
  const novoAluno = new Student({
    nome: req.body.nome,
    cpf: req.body.cpf,
    admin: req.body.admin,
  });

  try {
    const alunoSalvo = await novoAluno.save();
    res.json({ mensagem: "Aluno cadastrado com sucesso!" });
  } catch (err) {
    res.status(400).json({ mensagem: err.message });
  }
};
const deletarAluno = async (req, res) => {
  const { id } = req.params;
  try {
    const alunoId = await Student.findById(id);

    if (!alunoId) {
      return res.status(404).json({ mensagem: "Aluno não encontrado!" });
    }

    await Student.deleteOne({ _id: id });
    res.json({ mensagem: "Aluno deletado com sucesso!" });
  } catch (error) {
    res.status(500).json({ mensagem: error.message });
  }
};

module.exports = {
  listarTodosAlunos,
  cadastrarAluno,
  deletarAluno,
};