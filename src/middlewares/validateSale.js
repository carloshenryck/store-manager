module.exports = (req, res, next) => {
  const salesInfo = req.body;
  salesInfo.forEach((sale) => {
    if (!('productId' in sale)) return res.status(400).json({ message: '"productId" is required' });
    if (!('quantity' in sale)) return res.status(400).json({ message: '"quantity" is required' });
  });
  next();
};