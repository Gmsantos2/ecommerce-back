const Category = require('./Category')
const User = require('./User');
const Product = require('./Product')
const ProductImg = require('./ProductImg')
const Cart = require('./Cart');
const Purchase = require('./Purchase');

Product.belongsTo(Category) // Product -> categoryId
Category.hasMany(Product)

Cart.belongsTo(User) //Cart -> userId
User.hasMany(Cart)

Cart.belongsTo(Product) //Cart -> productId
Product.hasMany(Cart)

Purchase.belongsTo(User) //Purchase -> userId
User.hasMany(Purchase)

Purchase.belongsTo(Product) //Purchase -> productId
Product.hasMany(Purchase)

ProductImg.belongsTo(Product) //ProductImg -> productId
Product.hasMany(ProductImg)