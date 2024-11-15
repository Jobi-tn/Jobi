// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_jwt_secret_key';

function authenticateJWT(req, res, next) {
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];

    if (!token) {
        return res.status(403).send('Access denied. No token provided.');
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).send('Invalid token.');
        }

        req.user = decoded;
        next();
    });
}

module.exports = authenticateJWT;


// baad nhez authenticateJWT el file router naamlelha importation w naadéha maa route (req.user => feha les donneé décodées taa token ) kif nheb nekhou ken id req.user.Id
// fel front naadi token fel headers Authorization : Bearer token ngetiggg mel localstorage getItem
