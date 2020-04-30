const jwt = require('jwt-simple');
const { Op } = require("sequelize");

const config = require('../config/auth');
const User = require('../models/User');
const Friends = require('../models/Friends');

module.exports = {
    async index(req, res) {
        const { id } = jwt.decode(req.headers.authorization, config.jwtSecret);

        const users = await User.findAll({ where: { id: { [Op.ne]: id } } });

        return res.json(users);
    },

    async friends(req, res) {
        const { id } = jwt.decode(req.headers.authorization, config.jwtSecret);
        
        const response = await Friends.findAll({ where: { id_user: id } });

        if(response.length < 1) {
            return res.status(204).send();
        }
        user = JSON.parse(JSON.stringify(response));
       
        user = user.map(user => {
            return user.id_friend;
        })

        const friends = await User.findAll({ where: { id: { [Op.or]: user } } });

        return res.json(friends);
    },

    async addFriend(req, res) {
        const { id } = jwt.decode(req.headers.authorization, config.jwtSecret);
        const idFriend = req.params.id;

        const friend = await Friends.create({
            id_user: id,
            id_friend: idFriend,
        })

        return res.json(friend)
    },

    async delFriend(req, res) {
        const { id } = jwt.decode(req.headers.authorization, config.jwtSecret);
        const idFriend = req.params.id;
        
        const response = await Friends.findAll({ where: {
            id_user: id,
            id_friend: idFriend,
        } });

        if(response.length < 1) {
            return res.status(204).send();
        }

        const friend = await Friends.destroy({ where: {
            id_user: id,
            id_friend: idFriend,
        } })

        return res.status(204).send();
    }
}