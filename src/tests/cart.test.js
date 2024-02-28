require('../models')
const request = require("supertest")
const app = require("../app")
const Product = require("../models/Product")
const URL_USER = '/users/login'
const URL_BASE = '/cart'
let TOKEN
let bodyCart
let bodyProduct
let product
let userId
beforeAll(async () => {
  const user = {
    email: 'fernando@gmail',
    password: 'test'
  }
  const res = await request(app)
    .post(URL_USER)
    .send(user)
  TOKEN = res.body.token
  userId = res.body.user.id
  bodyProduct = {
    title: 'franela',
    description: 'lorem21',
    price: 45.45,
  }
  product = await Product.create(bodyProduct)
  bodyCart = {
    quantity: 1,
    productId: product.id
  }
})
test("POST -> 'URL_BASE', should return status code 201, res.body to be de defined and res.body.quantity === bodyCart.quantity", async () => {
  const res = await request(app)
    .post(URL_BASE)
    .send(bodyCart)
    .set('Authorization', `Bearer ${TOKEN}`)
  expect(res.status).toBe(201)
  expect(res.body).toBeDefined()
  expect(res.body.quantity).toBe(bodyCart.quantity)
  expect(res.body.userId).toBe(userId)
  await product.destroy()
})