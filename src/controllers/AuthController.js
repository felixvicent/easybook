const jwt = require('jwt-simple');
const config = require('../config/auth');
const User = require('../models/User');

module.exports = {
    async auth(req, res) {
        if(req.body.email && req.body.password) {

            const { email, password } = req.body;

            const user = await User.findOne({ where: { email } })

            if(!user){
                return res.status(401).send();
            }
            
            if(user.isPassword(user.password, password)){
                const payload = { id: user.id };

                res.json({ token: jwt.encode(payload, config.jwtSecret) });
            }
            else{
                res.status(401).send();
            }
        }
        else{
            res.sendStatus(401);
        }
    }
}