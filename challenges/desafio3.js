module.exports = {
  async index(request, response, _next) {
    const { token } = request;
    response.status(200).json({ token });
  },
};
