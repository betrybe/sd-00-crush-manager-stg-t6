const express = require('express');

const app = express();
const SUCCESS = 200;
const PORT = 3000;

const {
  authMiddleware,
  addCrushMiddleware,
  errorMiddleware,
  loginMiddleware,
} = require('./middleware');

// import desafios
const desafio1 = require('./challenges/desafio1');
const desafio2 = require('./challenges/desafio2');
const desafio3 = require('./challenges/desafio3');
const desafio4 = require('./challenges/desafio4');
const desafio5 = require('./challenges/desafio5');
const desafio6 = require('./challenges/desafio6');

app.use(express.json());
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

// rotas do projeto
app.get('/crush', desafio1.index);
app.get('/crush/:id', desafio2.index);
app.post('/login', loginMiddleware, desafio3.index);
app.post('/crush', addCrushMiddleware, desafio4.index);
app.put('/crush/:id', addCrushMiddleware, desafio5.index);
app.delete('/crush/:id', authMiddleware, desafio6.index);

app.use(errorMiddleware);

app.listen(PORT, () => { console.log('Online'); });
