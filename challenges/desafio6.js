const SUCCESS = 200;

const { deleteCrushById } = require('../services/utils.service');
const { DELETED_CRUSH } = require('../dictionary/success.dictionary');

module.exports = {
  async index(request, response) {
    const { params: { id } } = request;
    const result = await deleteCrushById(id);
    if (result) response.status(SUCCESS).json({ message: DELETED_CRUSH });
    else response.status(SUCCESS).json({ message: 'Nenhuma' });
  },
};
