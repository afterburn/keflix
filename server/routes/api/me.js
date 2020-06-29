module.exports = (context, req, res) => {
  const { Errors } = context
  if (!req.account) {
    res.status(200).json({ errors: [Errors.Unauthorized] })
  }
  res.status(200).json({ payload: req.account })
}