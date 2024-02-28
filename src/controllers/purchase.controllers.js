const catchError = require('../utils/catchError');
const Purchase = require('../models/Purchase');
const Cart = require('../models/Cart');
const Category = require('../models/Category');
const ProductImg = require('../models/ProductImg');
const Product = require('../models/Product');

const getAll = catchError(async (req, res) => {
    const userId = req.user.id
    const results = await Purchase.findAll(
        {
            where: { userId },
            include: [{
                model: Product,
                attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
                include: [
                    {
                    model: Category,
                    attributes: ['name']
                },
                {
                    model: ProductImg
                }]
            }]
        }
    );
    return res.json(results);
});

const create = catchError(async (req, res) => {
    const userId = req.user.id
    const cart = await Cart.findAll({
        where: { userId },
        raw: true,
        attributes: ['quantity', 'userId', 'productId']
    })
    if (!cart) return res.sendStatus(404);

    const result = await Purchase.bulkCreate(cart)
    if (!result) return res.sendStatus(404);
    await Cart.destroy({ where: { userId } })

    return res.status(201).json(result);
});


module.exports = {
    getAll,
    create
}