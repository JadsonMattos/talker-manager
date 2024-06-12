const HTTP_BAD_REQUEST_STATUS = 400;

const isValidRate = (rate) => {
  const rateAsNumber = Number(rate);
  return Number.isInteger(rateAsNumber) && rateAsNumber >= 1 && rateAsNumber <= 5
    && rateAsNumber !== 0;
};

const validateRate = (req, res, next) => {
  const { rate } = req.body.talk;
  if (rate === undefined) {
    return res.status(HTTP_BAD_REQUEST_STATUS).json({
      message: 'O campo "rate" é obrigatório',
    });
  }

  if (!isValidRate(rate)) {
    return res.status(HTTP_BAD_REQUEST_STATUS).json({
      message: 'O campo "rate" deve ser um número inteiro entre 1 e 5',
    });
  }
  next();
};

module.exports = validateRate;