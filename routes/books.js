const express = require("express");
const router = express.Router();
const Book = require("../models/book");
const Student = require("../models/student");

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
      res
        .status(404)
        .json({
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
        res
            .status(404)
            .json({
            message: "Livro não encontrado ou não disponível para devolução.",
            });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//Criar um novo livro - Somente para ADM
router.post("/:admin", async (req, res) => {
  const { admin, name} = req.params;
  if (admin !== "true") {
    return res.status(401).json({ message: "Acesso negado!"});
  }
  
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

//Atualizar um livro - Somente para ADM
router.patch("/:id", getBook, async (req, res) => {
  if (req.body.title != null) {
    res.book.title = req.body.title;
  }
  if (req.body.author != null) {
    res.book.author = req.body.author;
  }
  if (req.body.category != null) {
    res.book.category = req.body.category;
  }
  if (req.body.disponibility != null) {
    res.book.disponibility = req.body.disponibility;
  }
  if (req.body.deliveryDate != null) {
    res.book.deliveryDate = req.body.deliveryDate;
  }

  try {
    const updatedBook = await res.book.save();
    res.json(updatedBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Excluir um livro - Somente para ADM
router.delete("/:id", getBook, async (req, res) => {
  try {
    await res.book.deleteOne();
    res.json({ message: "Livro removido com sucesso!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware para obter um livro pelo ID
async function getBook(req, res, next) {
  try {
    const book = await Book.findById(req.params.id);
    if (book == null) {
      return res.status(404).json({ message: "Livro não encontrado!" });
    }
    res.book = book;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

module.exports = router;
