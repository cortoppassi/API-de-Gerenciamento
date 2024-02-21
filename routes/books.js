const express = require("express");
const router = express.Router();
const Book = require("../models/book");
const Student = require("../models/student");
const auth = require("../middleware/auth");
const student = require("../models/student");

//Obter todos os livros ou filtar por title, category e author
router.get("/filter", async (req, res) => {
  const {title, category, author} = req.query;

 try {
  const filter = {};
  if (title) filter.title = new RegExp(title, 'i');
  if (category) filter.category = new RegExp(category, 'i')
  if (author) filter.author = new RegExp(author, 'i')

  const books = await Book.find(filter)
    if(books.length > 0){
      res.json(books)
    } else {
      res.status(404).json({ message: 'Nenhum livro encontrado com os critérios fornecidos.' });
    }
  } catch (error) {
    res.status(500).json({ message: err.message })
  }
})

// Rota para locação de um livro - Somente para alunos //TODO - Adicionar Livro Locado ao rentedBooks
router.get("/location/:title/:id", async (req, res) => {
  const { title, id } = req.params;
  try {
    const studentID = await Student.findById(id);
    
    if (!studentID) {
      return res.status(404).json({ message: "Aluno não encontrado!" });
    }

    const book = await Book.findOne({ title, disponibility: true });
    if (!book) {
      return res.status(404).json({
        message: "Livro não encontrado ou não disponível para locação.",
      });
    }

    book.disponibility = false;
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 3);
    book.deliveryDate = deliveryDate;

    
    if (!studentID.rentedBooks) {
      studentID.rentedBooks = [];
    }

    studentID.rentedBooks.push(book._id);

    await book.save();
    await studentID.save();

    res.json({ message: "Livro locado com sucesso!", book, studentID });
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
