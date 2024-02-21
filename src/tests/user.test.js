const request = require('supertest');
const app = require('../app');

const URL_BASE = '/users';
let TOKEN

const user = {
    firstName: 'Rene',
    lastName: 'Rivera',
    email: 'rene@gmail',
    password: 'hola123',
    phone: '1234567'
}

beforeAll(async () => {
    const user = {
        email: 'fernando@gmail',
        password: 'test'
    }
    const res = await request(app)
        .post(`${URL_BASE}/login`)
        .send(user)

    TOKEN = res.body.token
})

test ('GET -> URL_BASE, should return status code 200, res.body to be defined and res.body.length ===1', async () =>{
   const res = await request(app)
        .get(URL_BASE)
        .set('Authorization', `Bearer ${TOKEN}`)


expect(res.status).toBe(200);
expect(res.body).toBeDefined();
expect(res.body).toHaveLength(1);
})

test('POST -> URL_BASE, should return status code 201 and res.body te be defined and res.bosy.firstName === user.firstName', async () =>{
    const res =  await request(app)
        .post(URL_BASE)
        .send(user)
expect(res.status).toBe(201);
expect(res.body).toBeDefined();
expect(res.body.firstName).toBe(user.firstName);
} )
