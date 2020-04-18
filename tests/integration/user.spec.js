const request = require('supertest')
const jwt = require('jwt-simple');

const app = require('../../src/app');
const config = require('../../src/config/auth');
const connection = require('../../src/database/index');
const User = require('../../src/models/User');

const filePath = `${__dirname}/testFiles/testFile.jpg`;

let token;

describe('USER', () => {
    beforeEach(async () => {
        await User.destroy({ where: {} });
        const user = await User.create({
            name: "Félix Vicente",
            email: "felixvicent@gmail.com",
            password: "123456",
            tellphone: "083987081294",
            city: "Areial",
            uf: "PB",
            bp: 0,
            image: 'testFile.jpg'
        });

        token = jwt.encode({ id: user.id }, config.jwtSecret);
    });

    afterAll( async () => {
        await connection.close();
    });

    describe('GET /users', () => {
        describe('status 200', () => {
            it('return an authenticated user', async () => {
                const response = await request(app)
                    .get('/users')
                    .set('Authorization', `JWT ${token}`)
                    .expect(200);
                expect(response.body.name).toBe("Félix Vicente")
            })
        })
    })

    describe('POST /users', () => {
        describe("status 200", () => {
            it('should be able to create a new user', async () => {
                const response = await request(app)
                    .post('/users')
                    .attach('image', filePath)
                    .field({
                        name: "Félix Vicente",
                        email: "felixvicent@gmail.com",
                        password: "123456",
                        tellphone: "083987081294",
                        city: "Areial",
                        uf: "PB",
                        bp: 0,
                    })
                    .expect(200);
                expect(response.body.name).toBe("Félix Vicente");
            });
        })
    })

    describe("PUT /users", () => {
        describe("status 200", () => {
            it('should be able to update a user data', async () => {
                const response = await request(app)
                    .put('/users')
                    .set('Authorization', `JWT ${token}`)
                    .send({
                        name: "Félix Vicente",
                        email: "felixvicent@gmail.com",
                        password: '12356',
                        tellphone: "083987081294",
                        city: "Areial",
                        uf: "PB",
                    })
                    .expect(200);
            });
            it('should be able to update a user image', async () => {
                const response = await request(app)
                    .put('/users')
                    .set('Authorization', `JWT ${token}`)
                    .attach('image', filePath)
                    .expect(200);
            });
            it('should be able to update a user data and image', async () => {
                const response = await request(app)
                    .put('/users')
                    .set('Authorization', `JWT ${token}`)
                    .attach('image', filePath)
                    .field({
                        name: "Félix Vicente",
                        email: "felixvicent@gmail.com",
                        password: '12356',
                        tellphone: "083987081294",
                        city: "Areial",
                        uf: "PB",
                    })
                    .expect(200);
            });
        })
    })

    describe('DELETE /user', () => {
        describe("status 200", () => {
            it('should be able to delete a user', async () => {
                const response = await request(app)
                    .delete('/users')
                    .set('Authorization', `JWT ${token}`)
                    .expect(204)
            });        
        })
    })
    
});