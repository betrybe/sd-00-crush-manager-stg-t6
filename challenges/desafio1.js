const {
  crushDB,
} = require('../services/utils.service');

module.exports = {
  async index(request, response, _next) {
    const data = await crushDB();
    return response.status(200).json(JSON.parse(data));
  },
};
