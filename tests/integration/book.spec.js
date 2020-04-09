const request = require('supertest')
const fs = require('fs');
const app = require('../../src/app');
const connection = require('../../src/database/index');
const Book = require('../../src/models/Book');
const User = require('../../src/models/User');

var id = 0;
var user_id = 0;

const filePath = `${__dirname}/testFiles/testFile.jpg`;

describe('BOOK', () => {
    beforeEach(async () => {
        const user = await User.create({
            name: "Félix Vicente",
            email: "felixvicent@gmail.com",
            tellphone: "083987081294",
            city: "Areial",
            uf: "PB",
        });

        user_id = user.id;

        const book = await Book.create({
            title: "Livro Teste update",
            synopsis: "Um livro criado em prol do test",
            author: "Félix Vicente",
            publisher: "FelpsDev",
            category: "test",
            pages: 150,
            image: "testFile.jpg",
            user_id: user.id,
        })

        id = book.id;
    })

    afterAll(async () => {
        await Book.truncate();
        await connection.close();
    })

    it('should be able to list all books', async () => {
        const response = await request(app)
            .get('/books')
            .expect(200);
    })

    it('should be able to show a book', async () => {
        const response = await request(app)
            .get(`/books/${id}`)
            .expect('Content-Type', /json/)
            .expect(200);
    })

    it('should be able to create a book', async () =>{
        const response = await request(app)
            .post(`/books/${user_id}`)
            .attach('image', filePath)
            .field({
                title: "Livro Teste update",
                synopsis: "Um livro criado em prol do test",
                author: "Félix Vicente",
                publisher: "FelpsDev",
                category: "test",
                pages: 150,
                user_id: user_id,
            })
            .expect('Content-Type', /json/)
            .expect(200);
    })

    it('should be able to update a book', async () =>{
        const response = await request(app)
            .put(`/books/${id}`)
            .attach('image', filePath)
            .field({
                title: "Livro Teste update",
                synopsis: "Um livro criado em prol do test",
                author: "Félix Vicente",
                publisher: "FelpsDev",
                category: "test",
                pages: 150,
                user_id: user_id,
            })
            .expect('Content-Type', /json/)
            .expect(200);
    })

    it('should be able to delete a book', async () => {
        const response = await request(app)
            .delete(`/books/${id}`)
            .expect(204);
    })
})