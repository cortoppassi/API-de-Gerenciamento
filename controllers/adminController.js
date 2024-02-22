const express = require("express");
const router = express.Router();
const Admin = require("../models/admin");
const jwt = require("jsonwebtoken");

const criarAdministrador = async (req, res) => {
  const { login, password } = req.body;

  const newAdmin = new Admin({
    login: req.body.login,
    password: req.body.password,
  });

  try {
    const savedAdmin = await newAdmin.save();
    res.status(201).json(savedAdmin);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
const listarAdministrador = async (req, res) => {
  try {
    const admins = await Admin.find();
    res.json(admins);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const loginAdministrador = async (req, res) => {
  const { login, password } = req.body;
  const admin = await Admin.findOne({ login, password });

  if (login === admin.login && password === admin.password) {
    const token = jwt.sign({ admin: 1 }, process.env.SECRET, {
      expiresIn: 300,
    });
    res.json({ auht: true, token, message: "Login efetuado com sucesso!" });
  } else {
    res.status(401).json({ message: "Usuário ou senha inválidos!" });
  }
};
const deletarAdminitrador = async (req, res) => {
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
};

module.exports = {
  criarAdministrador,
  listarAdministrador,
  loginAdministrador,
  deletarAdminitrador,
};