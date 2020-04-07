const User = require('../models/User');

module.exports = {
    async index(req, res) {
        const users = await User.findAll();

        return res.json(users);
    },

    async store(req, res) {
        const { name, email, tellphone, city, uf } = req.body;

        const user = await User.create({
            name,
            email,
            tellphone,
            city,
            uf
        });

        return res.json(user);
    },

    async show(req, res) {
        const { id } = req.params;

        const user = await User.findByPk(id);

        return res.json(user);
    },

    async update(req, res) {
        const { id } = req.params;
        const { name, email, tellphone, city, uf } = req.body;

        const user = await User.findByPk(id);

        if(!user){
            return res.status(400).json({ erro: 'User nor found' });
        }

        await User.update({
            name,
            email,
            tellphone,
            city,
            uf
        }, { where: { id } });

        const newUser = await User.findByPk(id);

        return res.json(newUser);
    },

    async destroy(req, res) {
        const { id } = req.params;

        const user = await User.findByPk(id);

        if(!user) {
            return res.status(400).json({ erro: 'User nor found' });
        }

        await User.destroy({ where: { id }});

        return res.status(204).send();
    }
}