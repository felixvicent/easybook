const jwt = require('jwt-simple');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const config = require('../config/auth');
const User = require('../models/User');
const Book = require('../models/Book');
const Post = require('../models/Post');

module.exports = {

    async index(req, res) {
        const { id } = jwt.decode(req.headers.authorization, config.jwtSecret);

        const user = await User.findByPk(id, {
            attributes: [
                'id',
                'name',
                'email',
                'tellphone',
                'image',
                'city',
                'uf'
            ]
        });

        return res.json(user);
    },

    async show(req, res) {
        const { id } = req.params;

        const user = await User.findByPk(id, {
            attributes: [
                'id',
                'name',
                'email',
                'tellphone',
                'image',
                'city',
                'uf'
            ]
        });

        return res.json(user);
    },

    async userBooks(req, res) {
        const { id } = req.params;

        const books = await Book.findAll({
            where: { user_id: id },
            order: [ [ 'id', 'DESC' ] ]
        });

        return res.json(books);
    },

    async userPosts(req, res) {
        const { id } = req.params;

        const posts = await Post.findAll({
            where: { user_id: id },
            order: [ [ 'id', 'DESC' ] ]
        });

        return res.json(posts);
    },

    async store(req, res) {

        try{
            const { name, email, password, tellphone, city, uf } = req.body;
            const { filename: image } = req.file;

            const[ imageName ] = image.split(".");
            const fileName = `${imageName}.jpg`

            await sharp(req.file.path)
                .resize(500)
                .jpeg({ quality: 70 })
                .toFile(path.resolve(req.file.destination, 'resized', fileName));

            fs.unlinkSync(req.file.path);

            const user = await User.create({
                name,
                email,
                password,
                tellphone,
                city,
                uf,
                bp: 0,
                image: fileName,
            });

            return res.json(user);
        }
        catch(err) {
            return res.json({ err: 'Email already exists' });
        }
        
    },

    async show(req, res) {
        const { id } = req.params;

        const user = await User.findOne({ 
            where: { id },
            attributes: [
                'name',
                'email',
                'tellphone',
                'city',
                'uf',
                'bp',
                'image',
                'password'
            ]
        });

        return res.json(user);
    },

    async update(req, res) {
        try{
            const { id } = jwt.decode(req.headers.authorization, config.jwtSecret);

            const { name, email, password, tellphone, city, uf } = req.body;

            const oldUser = await User.findByPk(id);

            if(!oldUser){
                return res.status(400).json({ erro: 'User nor found' });
            }

            if(req.file){
                const { filename: image } = req.file;

                const [ imgName ] = image.split('.');
                const fileName = `${imgName}.jpg`;

                fs.unlinkSync(path.resolve(__dirname, '..', '..', 'uploads', 'resized', oldUser.image))
                
                await sharp(req.file.path)
                    .resize(500)
                    .jpeg({ quality: 70 })
                    .toFile(path.resolve(req.file.destination, 'resized', fileName));

                fs.unlinkSync(req.file.path);  

                await User.update({ image: fileName }, { where: { id } });
            }

            const user = await User.update({
                name,
                email,
                password,
                tellphone,
                city,
                uf
            }, { where: { id } });

            const newUser = await User.findByPk(id);

            return res.json(newUser);
        }
        catch(err) {
            return res.status(400).json({ err: 'Email already exists' });
        }
    },

    async destroy(req, res) {
        const { id } = jwt.decode(req.headers.authorization.replace('JWT ', ''), config.jwtSecret);

        const user = await User.findByPk(id);

        if(!user) {
            return res.status(400).json({ erro: 'User nor found' });
        }
        try{
            fs.unlinkSync(path.resolve(__dirname, '..', '..', 'uploads','resized', user.image));
        }
        catch(err){

        }

        await User.destroy({ where: { id }});

        return res.status(204).send();
    }
}