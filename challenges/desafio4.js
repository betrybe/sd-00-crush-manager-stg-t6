const { registerCrush } = require('../services/utils.service');

const REG_SUCCESS = 201;

module.exports = {
  async index(request, response, _next) {
    const { crush } = request;
    const result = await registerCrush(crush);
    response.status(REG_SUCCESS).json(result);
  },
};
