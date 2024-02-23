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

    category = await Category.create({
        name: 'bazarupd'
    })

    product = {
        title: 'vasos',
        description: 'lorem 200',
        price: '25.55',
        categoryId: category.id
    }
    
    const user = {
        email: 'fernando@gmail',
        password: 'test'
    }
    const res = await request(app)
        .post(`${URL_BASE_USERS}/login`)
        .send(user)

    TOKEN = res.body.token

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

test('GET -> URL_BASE, should return res.status code 200, res.body to be defined, ande res.body.length === 1, res.body[0].categoryId === category.id, res.body[0].category.id === category.id', async () => {
    const res = await request(app)
        .get(`${URL_BASE}?category=${category.id}`)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)

    expect(res.body[0].categoryId).toBeDefined()
    expect(res.body[0].categoryId).toBe(category.id)

    expect(res.body[0].category).toBeDefined()
    expect(res.body[0].category.id).toBe(category.id)
})

//GETONE
test('GET -> URL_BASE/:id, should return res.status code 200, res.body to be defined and res.body.title === product.title, res.body.category.id to be defined, res.body.category.id === category.id', async () =>{
    const res = await request(app)
        .get(`${URL_BASE}/${productId}`)
    
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.title).toBe(product.title)

    expect(res.body.category.id).toBeDefined() 
    expect(res.body.category.id).toBe(category.id)
})
//PUT
test('PUT -> URL_BASE/:id, should return res.tatus code 200, res.bodyto be defined and res.body.title === "newtitle" ', async()=> {
    const res = await request(app)
            .put(`${URL_BASE}/${productId}`)
            .send({title: 'newtitle'})
            .set('Authorization', `Bearer ${TOKEN}` )

    expect(res.status).toBe(200)
})

//DELETE
test('DELETE -> URL_BASE/:id, should return res.status code 204', async () =>{
    const res = await request(app)
            .delete(`${URL_BASE}/${productId}`)
            .set('Authorization', `Bearer ${TOKEN}` )

    expect(res.status).toBe(204)
    await category.destroy()

})