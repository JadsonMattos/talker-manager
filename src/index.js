const express = require('express');
const loginRoute = require('./routes/loginRoute');
const talkerRoute = require('./routes/talkerRoute');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

app.use(talkerRoute);
app.use(loginRoute);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
