const jwt = require('jsonwebtoken');
const verify = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);
    try {
        const vf = jwt.verify(token, process.env.SECRET_KEY);
        console.log('vf', vf);
        next();
    } catch (error) {
        res.status(401).json('Invalid token');
    }
};
module.exports = { verify };
