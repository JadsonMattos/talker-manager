const express = require('express');
const { readFile, writeFile, updateFile, deleteFile } = require('../utils/fileUtils');
const validateToken = require('../middlewares/validateToken');
const validateName = require('../middlewares/validateName');
const validateAge = require('../middlewares/validateAge');
const validateTalk = require('../middlewares/validateTalk');
const validateWatchedAt = require('../middlewares/validateWatchedAt');
const validateRate = require('../middlewares/validateRate');

const router = express.Router();

const HTTP_OK_STATUS = 200;
const HTTP_CREATED_STATUS = 201;

router.get('/talker/search', validateToken, validateRate, async (req, res) => {
  try {
    const searchTerm = req.query.q;
    const rateNumber = req.query.rate;
    const data = await readFile();
    if (!searchTerm || searchTerm === '') {
      res.status(HTTP_OK_STATUS).json(data);
    } else {
      const filterTalker = data.filter((talker) => talker.name.includes(searchTerm));
      return res.status(HTTP_OK_STATUS).json(filterTalker);
    }
    if (rateNumber) {
      const filterRate = data.filter((talker) => talker.talk.rate === Number(rateNumber));
      return res.status(HTTP_OK_STATUS).json(filterRate);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro' });
  }
});

router.get('/talker', async (_req, res) => {
  try {
    const data = await readFile();
    if (!data || data.length === 0) {
      return res.status(HTTP_OK_STATUS).json([]);
    }
    res.status(HTTP_OK_STATUS).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro' });
  }
});

router.get('/talker/:id', async (req, res) => {
  try {
    const data = await readFile();
    const talker = data.find(({ id }) => id === Number(req.params.id));
    if (!talker) {
      res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }
    res.status(HTTP_OK_STATUS).json(talker);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro interno' });
  }
});

router.post('/talker',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
  async (req, res) => {
    try {
      const data = await readFile();
      const newTalker = { id: data.length + 1, ...req.body };
      data.push(newTalker);
      await writeFile(data);
      res.status(HTTP_CREATED_STATUS).json(newTalker);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro interno' });
    }
  });

router.put('/talker/:id',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
  async (req, res) => {
    try {
      const id = Number(req.params.id);
      const updatedTalker = req.body;
      const data = await readFile();
      const talker = data.find((talk) => talk.id === id);
      if (!updatedTalker || !talker) {
        return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
      }
      const update = { ...talker, ...updatedTalker };
      await updateFile(id, update);
      return res.status(HTTP_OK_STATUS).json(update);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro interno' });
    }
  });

router.delete('/talker/:id', validateToken, async (req, res) => {
  try {
    const id = Number(req.params.id);
    const deleteTalker = await deleteFile(id);
    if (!deleteTalker) {
      return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }
    return res.status(204).end();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro interno' });
  }
});

module.exports = router;
