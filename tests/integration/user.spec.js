const request = require('supertest')
const app = require('../../src/app');
const connection = require('../../src/database/index');
const User = require('../../src/models/User');

describe('USER', () => {
    beforeEach(async () => {
        await User.create({
            name: "Félix Vicente",
            email: "felixvicent@gmail.com",
            tellphone: "083987081294",
            city: "Areial",
            uf: "PB",
        });
    });

    afterAll( async () => {
        await User.truncate();
        await connection.close();
    });

    it('should be able to list all users', async () => {
        const response = await request(app)
            .get('/users')
            .expect(200);
    })

    it('should be able to create a new user', async () => {
        const response = await request(app)
            .post('/users')
            .send({
                name: "Félix Vicente",
                email: "felixvicent@gmail.com",
                tellphone: "083987081294",
                city: "Areial",
                uf: "PB",
            })
            .expect('Content-Type', /json/ )
            .expect(200);

    });

    it('should bee able to show a user', async () => {
        const response = await request(app)
            .get('/users/1')
            .expect('Content-Type', /json/)
            .expect(200);
    })

    it('should be able to update a user', async () => {
        const response = await request(app)
            .put('/users/1')
            .send({
                name: "Félix Vicente",
                email: "felixvicent@gmail.com",
                tellphone: "083987081294",
                city: "Areial",
                uf: "PB",
            })
            .expect('Content-Type', /json/)
            .expect(200);
    });

    it('should be able to delete a user', async () => {
        const response = await request(app)
            .delete('/users/1')
            .expect(204);
    });
});