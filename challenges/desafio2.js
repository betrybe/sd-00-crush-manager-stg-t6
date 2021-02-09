const {
  getCrushById,
} = require('../services/utils.service');

const { NO_CRUSH } = require('../dictionary/errors.dictionary');

module.exports = {

  async index(request, response, next) {
    const { id } = request.params;

    const crush = await getCrushById(id);

    try {
      if (crush.length) response.status(200).json(crush[0]);
      else throw new Error(NO_CRUSH);
    } catch ({ message }) {
      next({ message });
    }
  },

  desafio3(request, _response) {
    const { email, password } = request.body;
    console.log(email, password);
  },
};
