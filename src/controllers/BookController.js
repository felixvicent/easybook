const Book = require('../models/Book');
const User = require('../models/User');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');


module.exports = {
    async index(req, res){
        const books = await Book.findAll();

        return res.json(books);
    },

    async show(req, res) {
        const { id } = req.params;

        const book = await Book.findByPk(id);

        if(!book){
            return res.status(400).json({ error: 'Book not found' });
        }

        return res.json(book);
    },

    async store(req, res){
        const { id } = req.params;
        const { title, synopsis, author, publisher, category, pages } = req.body;
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

        const book = await Book.create({
            title,
            synopsis,
            author,
            publisher,
            category,
            pages,
            image: fileName,
            user_id: id,
        })

        return res.json(book);
    },

    async update(req, res){
        const { id } = req.params;

        const { title, synopsis, author, publisher, category, pages } = req.body;

        const oldBook = await Book.findByPk(id);
        
        if(!oldBook){
            return res.status(400).json({ error: 'Book not found' });
        }

        if(req.file){
            const { filename: image } = req.file;

            const [ name ] = image.split('.');
            const fileName = `${name}.jpg`;

            fs.unlinkSync(path.resolve(__dirname, '..', '..', 'uploads', 'resized', oldBook.image))
            
            await sharp(req.file.path)
                .resize(500)
                .jpeg({ quality: 70 })
                .toFile(path.resolve(req.file.destination, 'resized', fileName));

            fs.unlinkSync(req.file.path);  

            await Book.update({ image: fileName }, { where: { id } });
        }

        await Book.update({
            title,
            synopsis,
            author,
            publisher,
            category,
            pages,
        }, {
            where: { id }
        });

        const newBook = await Book.findByPk(id);
        
        res.json(newBook);
    },

    async destroy(req, res){
        const { id } = req.params;

        const book = await Book.findByPk(id);
        
        fs.unlinkSync(path.resolve(__dirname, '..', '..', 'uploads','resized', book.image));

        await Book.destroy({
            where: { id }
        });

        return res.status(204).send();
    }
};