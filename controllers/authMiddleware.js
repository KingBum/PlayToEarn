const jwt = require('jsonwebtoken');
const Users = require('../models/Users');

function verifyToken(req, res, next) {
    const token = req.header('Authorization').split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Access denied' });
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};

function verifyTokenWithAdmin(req, res, next) {
    const token = req.header('Authorization').split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Access denied' });
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        Users.findById(decoded.userId).exec()
            .then(user => {
                if (user.isAdmin) {
                    req.userId = decoded.userId;
                    next();
                } else {
                    res.status(403).json({ error: 'Access denied, you are not an Admin' });
                }
            })
            .catch(error => {
                res.status(500).json({ error: 'Server error' });
            });
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};

const verifyTokenWithCookies = (req, res, next) => {
    const token = req.cookies.token;
  
    if (!token) return res.status(401).json({ message: "Not Authenticated!" });
  
    jwt.verify(token, process.env.SECRET_KEY, async (err, payload) => {
      if (err) return res.status(403).json({ message: "Token is not Valid!" });
      req.userId = payload.id;
  
      next();
    });
  };
  

module.exports = { verifyToken, verifyTokenWithAdmin,verifyTokenWithCookies };