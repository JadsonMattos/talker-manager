const HTTP_UNAUTHORIZED_STATUS = 401;

const validateToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(HTTP_UNAUTHORIZED_STATUS).json({
      message: 'Token não encontrado',
    });
  }

  if (token.length !== 16 || typeof token !== 'string') {
    return res.status(HTTP_UNAUTHORIZED_STATUS).json({
      message: 'Token inválido',
    });
  }
  next();
};

module.exports = validateToken;