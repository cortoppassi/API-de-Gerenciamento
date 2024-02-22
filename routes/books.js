const express = require("express");
const router = express.Router();
const bookController = require('../controllers/bookConstroller')
const auth = require("../middleware/auth");

router.get("/filter",bookController.listarLivros);
router.get("/location/:title/:id", bookController.locarLivro);
router.post("/devolution/:title", bookController.devolverLivro);
router.post("/cadastro", auth, bookController.cadastrarLivro);
router.delete("/:id", auth, bookController.excluirLivro);

module.exports = router;