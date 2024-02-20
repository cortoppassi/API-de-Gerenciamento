const jwt = require('jsonwebtoken');

const authorizeAdmin = (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido. Acesso negado!' });
  }

  try {
    const decodedToken = jwt.verify(token, 'secreto'); // Substitua 'secreto' pelo segredo real usado na criação do token

    if (!decodedToken || !decodedToken.admin) {
      return res.status(403).json({ message: 'Acesso negado! Somente para administradores.' });
    }

    // Se chegou até aqui, o usuário é um admin
    next(); // Chama o próximo middleware ou a rota pretendida
  } catch (err) {
    res.status(401).json({ message: 'Token inválido. Acesso negado!' });
  }
};

module.exports = authorizeAdmin;
