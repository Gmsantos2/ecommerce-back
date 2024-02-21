const request = require('supertest');
const app = require('../app');

const URL_BASE = '/users';

const user = {
    firstName: 'Rene',
    lastName: 'Rivera',
    email: 'rene@gmail',
    password: 'hola123',
    phone: '1234567'
}
test('POST -> URL_BASE, should return status code 201 and res.body te be defined and res.bosy.firstName === user.firstName', async () =>{
    const res =  await request(app)
        .post(URL_BASE)
        .send(user)
expect(res.status).toBe(201);
expect(res.body).toBeDefined();
expect(res.body.firstName).toBe(user.firstName);
} )