const jwt = require('jwt-simple');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const config = require('../config/auth');

const Post = require('../models/Post');
const User = require('../models/User');

module.exports = {
    async index(req, res) {
        const posts = await Post.findAll({ order: [ [ 'id', 'DESC' ] ] });

        return res.json(posts);
    },

    async store(req, res) {
        const { id } = jwt.decode(req.headers.authorization, config.jwtSecret);

        const { title, body } = req.body;
        const { filename: image } = req.file;

        const [ name ] = image.split('.');
        const fileName = `${name}.jpg`;

        const user = await User.findByPk(id);

        if(!user){
            return res.status(400).json({ error: 'User not found' });
        }

        await sharp(req.file.path)
            .resize(500)
            .jpeg({ quality: 70 })
            .toFile(path.resolve(req.file.destination, 'resized', fileName));

        fs.unlinkSync(req.file.path);

        const post = await Post.create({
            title,
            body,
            image: fileName,
            user_id: id,
        })

        return res.json(post);
    },

    async update(req, res){
        const { id } = req.params;

        const { title, body } = req.body;

        const oldPost = await Post.findByPk(id);
        
        if(!oldPost){
            return res.status(400).json({ error: 'Post not found' });
        }

        if(req.file){
            const { filename: image } = req.file;

            const [ name ] = image.split('.');
            const fileName = `${name}.jpg`;

            fs.unlinkSync(path.resolve(__dirname, '..', '..', 'uploads', 'resized', oldPost.image))
            
            await sharp(req.file.path)
                .resize(500)
                .jpeg({ quality: 70 })
                .toFile(path.resolve(req.file.destination, 'resized', fileName));

            fs.unlinkSync(req.file.path);  

            await Post.update({ image: fileName }, { where: { id } });
        }

        await Post.update({
            title,
            body,
        }, {
            where: { id }
        });

        const newPost = await Post.findByPk(id);
        
        res.json(newPost);
    },

    async destroy(req, res){
        const { id } = req.params;

        const post = await Post.findByPk(id);

        if(!post) {
            return res.status(400).json({ error: 'Post not found' });
        }
        
        fs.unlinkSync(path.resolve(__dirname, '..', '..', 'uploads','resized', post.image));

        await Post.destroy({
            where: { id }
        });

        return res.status(204).send();
    }
}