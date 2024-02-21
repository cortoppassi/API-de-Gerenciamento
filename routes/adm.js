const express = require("express");
const router = express.Router();
const Admin = require("../models/admin");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const auth = require("../middleware/auth");

//Rota para criar um novo administrador - Somente para ADM
router.post("/", auth, async (req, res) => {
  const { name, password } = req.params;

    const newAdmin = new Admin({
        name: req.body.name,
        password: req.body.password 
    });

  try {
    const savedAdmin = await newAdmin.save();
    res.status(201).json(savedAdmin);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Rota para obter todos os administradores - Somente para ADM
router.get("/", auth, async (req, res) => {
  try {
    const admins = await Admin.find();
    res.json(admins);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Rota para logar um administrador
router.post("/login", async (req, res) => {
  const { name, password } = req.body;
  const admin = await Admin.findOne({ name, password });

  if (name === admin.name && password === admin.password) {
    
    const token = jwt.sign({ admin: 1}, process.env.SECRET, {expiresIn: 300 });
    res.json({auht: true , token, message: "Login efetuado com sucesso!" });

  }else{
    res.status(401).json({ message: "Usuário ou senha inválidos!" });
  }
});

//Rota para deletar um administrador - Somente para ADM
router.delete("/admin/:id", auth, async (req, res) => {
  const adminId = req.params.id;
  try {
    const admin = await Admin.findById(adminId);

    if (!admin) {
      return res.status(404).json({ message: "Administrador não encontrado!" });
    }

    await admin.deleteOne();
    res.json({ message: "Administrador deletado com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
