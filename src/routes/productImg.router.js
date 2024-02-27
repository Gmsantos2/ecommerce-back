const { getAll, create, remove } = require('../controllers/productImg.controllers');
const express = require('express');
const { verifyJwt } = require('../utils/verifyJWT');
const upload = require('../utils/multer');

const routerProductImg = express.Router();

routerProductImg.route('/')
    .get(getAll)
    .post(upload.single('image'), create);

routerProductImg.route('/:id')
    .delete(verifyJwt, remove)

module.exports = routerProductImg;