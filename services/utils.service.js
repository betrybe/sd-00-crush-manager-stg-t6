const fs = require('fs').promises;
const path = require('path');

const FIRST = 0;

// LEITURA DE TODOS OS CRUSH
const crushDB = async () => fs.readFile(
  path.join(__dirname, '../crush.json'),
  'utf8',
);

const replaceCrushDB = async (newDB) => {
  await fs.writeFile(
    path.join(__dirname, '../crush.json'),
    JSON.stringify(newDB),
    'utf8',
  );
};

const getCrushDB = async () => JSON.parse(await crushDB());

const getCrushById = async (id) => JSON
  .parse(await crushDB())
  .filter(({ id: crushId }) => Number(crushId) === Number(id));

const getCrushByQuery = async (q) => JSON
  .parse(await crushDB())
  .filter(({ name }) => name.includes(q));

const getCrushLastId = async () => JSON
  .parse(await crushDB())
  .reduce((id, current) => (id > current.id ? id : current.id), FIRST);

const deleteCrushById = async (id) => {
  const crushList = JSON
    .parse(await crushDB())
    .filter(({ id: crushId }) => crushId !== Number(id));
  await replaceCrushDB(crushList);
  return true;
};

const updateCrushById = async (id, updatedCrush) => {
  const crushList = JSON.parse(await crushDB())
    .map((crush) => (crush.id === Number(id) ? { ...updatedCrush, id: Number(id) } : crush));
  console.log(crushList);
  await replaceCrushDB(crushList);
  return { ...updatedCrush, id: Number(id) };
};

const registerCrush = async (crush) => {
  const crushList = await getCrushDB() || [];
  const id = await getCrushLastId() + 1;
  // const id = await crushList.length + 1;
  crushList.push({ ...crush, id });
  await replaceCrushDB(crushList);
  return { ...crush, id };
};

module.exports = {
  registerCrush,
  updateCrushById,
  getCrushDB,
  getCrushById,
  getCrushByQuery,
  getCrushLastId,
  deleteCrushById,
  crushDB,
};
