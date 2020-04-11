const request = require('supertest')
const app = require('../../src/app');
const connection = require('../../src/database/index');
const User = require('../../src/models/User');

describe('TOKEN', () => {
    describe("POST /token", () => {
        beforeEach(async () => {
            await User.destroy({ where: {} })
            const user = await User.create({
                name: "Félix Vicente",
                email: "felixvicent@gmail.com",
                password: "123456",
                tellphone: "083987081294",
                city: "Areial",
                uf: "PB",
                image: 'testFile.jpg',
                bp: 0
            });
            id = user.id;
        });

        afterAll(() => connection.close());

        describe("status", () => {
            it('return authenticated user token', async () => {
                const response = await request(app)
                    .post('/token')
                    .send({
                        email: "felixvicent@gmail.com",
                        password: "123456",
                    })
                    .expect(200);

                expect(response.body).toHaveProperty("token");
            });
        });

        describe("status 401", () => {
            it("throws error when password is incorrect", async () => {
                await request(app)
                    .post('/token')
                    .send({
                        email: "felixvicent@gmail.com",
                        password: "WRONG_PASSWORD",
                    })
                    .expect(401);
            });
            it("throws error when email not exists", async () => {
                await request(app)
                    .post('/token')
                    .send({
                        email: "someemail@gmail.com",
                        password: "123456",
                    })
                    .expect(401);
            });
            it("throws error when password and email are blank", async () => {
                await request(app)
                    .post('/token')
                    .expect(401);
            });
        })
    })
});