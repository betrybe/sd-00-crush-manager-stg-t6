const fs = require('fs');
const path = require('path');

const FIRST = 0;

const getCrushes = async () => fs.readFileSync(
  path.join(__dirname, '../crush.json'),
  'utf8',
);

const replaceCrushDB = async (newDB) => {
  await fs.writeFileSync(
    path.join(__dirname, '../crush.json'),
    JSON.stringify(newDB),
    'utf8',
  );
};

const getCrushDB = async () => JSON.parse(await getCrushes());

const getCrushById = async (id) => JSON
  .parse(await getCrushes())
  .filter(({ id: crushId }) => Number(crushId) === Number(id));

const getCrushByQuery = async (q) => JSON
  .parse(await getCrushes())
  .filter(({ name }) => name.includes(q));

const getCrushLastId = async () => JSON
  .parse(await getCrushes())
  .reduce((id, current) => (id > current.id ? id : current.id), FIRST);

const deleteCrushById = async (id) => {
  const crushList = JSON
    .parse(await getCrushes())
    .filter(({ id: crushId }) => crushId !== Number(id));
  await replaceCrushDB(crushList);
  return true;
};

const updateCrushById = async (id, updatedCrush) => {
  const crushList = JSON
    .parse(await getCrushes())
    .map((crush) => (crush.id === Number(id)
      ? { ...updatedCrush, id: Number(id) } : crush));
  await replaceCrushDB(crushList);
  return { ...updatedCrush, id: Number(id) };
};

const registerCrush = async (crush) => {
  const crushList = await getCrushDB() || [];
  // const id = await getCrushLastId() + 1;
  const id = await crushList.length + 1;
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
};