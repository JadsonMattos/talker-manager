const express = require('express');
const generateToken = require('../utils/token');
const validateEmail = require('../middlewares/validateEmail');
const validatePassword = require('../middlewares/validatePassword');

const router = express.Router();
const HTTP_OK_STATUS = 200;

router.post('/login', validateEmail, validatePassword, async (req, res) => {
  const { email, password } = req.body;
  if ([email, password].includes(undefined)) {
    return res.status(401).json({ message: 'All fields must be filled' });
  }
  const token = generateToken();
  res.status(HTTP_OK_STATUS).json({ token });
});

module.exports = router;