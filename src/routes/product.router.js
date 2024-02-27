const { getAll, create, getOne, remove, update, setImages } = require('../controllers/product.controllers');
const express = require('express');
const { verifyJwt } = require('../utils/verifyJWT');

const routerProduct = express.Router();

routerProduct.route('/')
    .get(getAll)
    .post(verifyJwt, create);

routerProductImg.route('/:id/images')
    .post(setImages)

routerProduct.route('/:id')
    .get(getOne)
    .delete(verifyJwt, remove)
    .put(verifyJwt, update);

module.exports = routerProduct;