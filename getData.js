const fs = require('fs').promises;

const arquive = './crush.json';

const getData = async () => {
  const newData = await fs.readFile(arquive, 'utf8')
    .then((data) => data)
    .catch((err) => {
      console.error(`Não foi possível ler o arquivo ${arquive}\n! Erro: ${err}`);
    });
  return newData;
};

module.exports = { getData };
