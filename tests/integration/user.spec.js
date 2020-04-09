const request = require('supertest')
const app = require('../../src/app');
const connection = require('../../src/database/index');
const User = require('../../src/models/User');

var id = 0;

describe('USER', () => {
    beforeEach(async () => {
        const user = await User.create({
            name: "Félix Vicente",
            email: "felixvicent@gmail.com",
            tellphone: "083987081294",
            city: "Areial",
            uf: "PB",
        });
        id = user.id;
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

    it('should be able to show a user', async () => {
        const response = await request(app)
            .get(`/users/${id}`)
            .expect('Content-Type', /json/)
            .expect(200);
    })

    it('should be able to update a user', async () => {
        const response = await request(app)
            .put(`/users/${id}`)
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
            .delete(`/users/${id}`)
            .expect(204);
    });
});