const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido. Acesso negado!' });
  }

  try {
    const decodedToken = jwt.verify(token, 'secreto');

    if (!decodedToken) {
      return res.status(403).json({ message: 'Acesso negado! Somente para administradores.' });
    }

    
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token inválido. Acesso negado!' });
  }
};

module.exports = auth;
