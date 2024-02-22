const request = require('supertest')
const app = require('../app')
const Category = require('../models/Category')
require('../models')


const URL_BASE = '/products'
const URL_BASE_USERS = '/users'
let productId
let product
let category

beforeAll(async () => {

    const user = {
        email: 'fernando@gmail',
        password: 'test'
    }
    const res = await request(app)
        .post(`${URL_BASE_USERS}/login`)
        .send(user)

    TOKEN = res.body.token

    category = await Category.create({
        name: 'bazarupd'
    })

    product = {
        title: 'vasos',
        description: 'lorem 200',
        price: '25.55',
        categoryId: category.id
    }
})

//POST
test('POST -> URL_BASE, should return res.status code 201, res.body to be defined and res.body.title === product.title', async () => {
    //const result = await Category.create({ name: 'bazarupd'})
    const res = await request(app)
        .post(URL_BASE)
        .send(product)
        .set('Authorization', `Bearer ${TOKEN}`)

    productId = res.body.id

    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.title).toBe(product.title)
})

//GETALL
test('GET -> URL_BASE, should return res.status code 200, res.body to be defined and res.body.length === 1', async () => {
    const res = await request(app)
        .get(URL_BASE)

  
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
    
    expect(res.body[0].category).toBeDefined()
    expect(res.body[0].category.id).toBe(category.id)
})

//GETONE

//PUT

//DELETE