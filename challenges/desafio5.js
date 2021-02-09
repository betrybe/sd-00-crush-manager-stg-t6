const SUCCESS = 200;

const { updateCrushById } = require('../services/utils.service');

module.exports = {
  async index(request, response, _next) {
    const { params: { id }, crush } = request;

    const result = await updateCrushById(id, crush);
    response.status(SUCCESS).json(result);
  },
};
