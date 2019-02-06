const jwt = require('jsonwebtoken');

exports.tokenValidator = (req, res, next) => {
    // check header or url parameters or post parameters for token
    if (req.headers && req.headers['refer']) {
        let t = req.headers['refer'].split('?token=%');
        t = t[1];
    }
    var token = req.query.token || req.headers['token'] || t;

    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, "Hola", (err, decoded) => {
            if (err) {
                res.status(401).json({ message: 'invalid token', error: 'InvalidToken' });
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });

    } else {
        res.status(400).json({ message: 'token not provided', error: 'TokenNotProvided' });
    }
};