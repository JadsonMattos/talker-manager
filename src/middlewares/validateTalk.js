const validateTalk = (talkValue, res, value) => {
  if (!talkValue) {
    return res.status(400).json({ message: `O campo "${value}" é obrigatório` });
  }
};

module.exports = (req, res, next) => {
  const { talk } = req.body;
  
  return validateTalk(talk, res, 'talk')
    || validateTalk(talk.watchedAt, res, 'watchedAt')
    || next();
};