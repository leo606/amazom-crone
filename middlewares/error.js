function erroRes(err, req, res, next) {
  res.status(err.error.status).json({ message: err.error.message });
}

module.exports = { erroRes };
