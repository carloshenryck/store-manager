module.exports = (req, res, next) => {
  const salesInfo = req.body;
  for (let i = 0; i < salesInfo.length; i += 1) {
    if (!('productId' in salesInfo[i])) {
      return res.status(400).json({ message: '"productId" is required' });
    }
    if (!('quantity' in salesInfo[i])) {
      return res.status(400).json({ message: '"quantity" is required' });
    }
  }
  next();
};