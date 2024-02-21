const express = require("express");
const router = express.Router();
const Book = require("../models/book");
const Student = require("../models/student");
const auth = require("../middleware/auth");

//Obter todos os livros
router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Rota para locação de um livro - Somente para alunos
router.get("/:title/:studentName", async (req, res) => {
  const { title, studentName } = req.params;

  try {
    const student = await Student.findOne({ name: studentName });
    if (!student) {
      return res.status(404).json({ message: "Aluno não encontrado!" });
    }

    const book = await Book.findOne({ title, disponibility: true });

    if (book) {
      book.disponibility = false;
      const deliveryDate = new Date();
      deliveryDate.setDate(deliveryDate.getDate() + 3);
      await book.save();

      res.json({ message: "Livro locado com sucesso!", book, student });
    } else {
      res.status(404).json({
        message: "Livro não encontrado ou não disponível para locação.",
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Rota para devolução de um livro
router.post("/devolution/:title", async (req, res) => {
  const { title } = req.params;

  try {
    const book = await Book.findOne({ title, disponibility: false });

    if (book) {
      book.disponibility = true;
      book.deliveryDate = null;
      await book.save();

      res.json({ message: "Livro devolvido com sucesso!", book });
    } else {
      res.status(404).json({
        message: "Livro não encontrado ou não disponível para devolução.",
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Cadastrar um novo livro - Somente para ADM
router.post("/cadastro", auth, async (req, res) => {
  const newBook = new Book({
    title: req.body.title,
    author: req.body.author,
    category: req.body.category,
    disponibility: req.body.disponibility,
    deliveryDate: req.body.deliveryDate,
  });

  try {
    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Excluir um livro - Somente para ADM
router.delete("/:id", auth, async (req, res, next) => {
  try {
    await res.book.deleteOne();
    res.json({ message: "Livro removido com sucesso!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
