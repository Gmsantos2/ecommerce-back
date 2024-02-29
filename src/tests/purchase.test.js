require('../models');
const request = require("supertest")
const app = require("../app");
const Product = require('../models/Product');

const URL_BASE = '/purchase'
const URL_BASE_USER = '/users/login'
let TOKEN
let userId
let product
let productBody
let bodyCart

beforeAll(async () => {
    //login
    const user = {
        email: 'fernando@gmail',
        password: 'test'
    }
    const res = await request(app)
        .post(URL_BASE_USER)
        .send(user)
    
    TOKEN = res.body.token
    userId = res.body.user.id

    //product
    const productBody = {
        title: 'vasos',
        description: 'lorem 200',
        price: 25.55
    }

    product = await Product.create(productBody)

    //cart
    bodyCart = {
        productId: product.id,
        quantity: 2
    }

    await request(app)
        .post('/cart')
        .set('Authorization', `Bearer ${TOKEN}`)
        .send(bodyCart)
})

test('POST -> URL_BASE, should return status code 201, res.body to be defined and res.body.quantity === bodyCart.quantity', async () => {
    const res = await request(app)
        .post(URL_BASE)
        .set('Authorization', `Bearer ${TOKEN}`)
    
    expect(res.status).toBe(201)
    expect(res.body[0]).toBeDefined()
    expect(res.body[0].quantity).toBe(bodyCart.quantity)
    

})

test('GET -> URL_BASE, should return status code 200, res.body to be defined and res.body.length === 1', async () => {
    const res = await request(app)
        .get(URL_BASE)
        .set('Authorization', `Bearer ${TOKEN}`)
    
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)

    expect(res.body[0].productId).toBeDefined()
    expect(res.body[0].productId).toBe(product.id)

    expect(res.body[0].userId).toBeDefined()
    expect(res.body[0].userId).toBe(userId)

    await product.destroy()
})