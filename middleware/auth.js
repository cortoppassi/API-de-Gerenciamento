const jwt = require('jsonwebtoken');
const admin = require('../models/admin');
require('dotenv').config();

const auth = (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido. Acesso negado!' });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) res.status(401).json({ message: 'Token inválido. Acesso negado!' });

      req.admin = decoded.admin;
    });

    
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token inválido. Acesso negado!' });
  }
};

module.exports = auth;
