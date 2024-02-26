const catchError = require('../utils/catchError');
const Purchase = require('../models/Purchase');
const Cart = require('../models/Cart');

const getAll = catchError(async(req, res) => {
    const results = await Purchase.findAll();
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const userId = req.user.id
    const cart = await Cart.findAll({
        where: { userId },
        raw: true
})
    return res.status(201).json(cart);
});


module.exports = {
    getAll,
    create
}