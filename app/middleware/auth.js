const jwt = require('jsonwebtoken');
const {JWT_SECRET} = process.env;

module.exports = async(req, res, next) => {
  try {
    const token = req.headers.authorization ? req.headers.authorization.replace('Bearer ', '') : null;
    jwt.verify(token, JWT_SECRET, function(err, decoded) {
    if (err) {
      return res.status(403).json({ message: err.message });
    }
    
    req.user = decoded;
    return next();
    });
    
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message
    })
  }
}