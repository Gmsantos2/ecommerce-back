const Category = require('./Category')
const User = require('./User');
const Product = require('./Product')
const ProductImg = require('./ProductImg')
const Cart = require('./Cart')

Product.belongsTo(Category) // Product -> categoryId
Category.hasMany(Product)

Cart.belongsTo(User) //Cart -> userId
User.hasMany(Cart)

Cart.belongsTo(Product) //Cart -> productId
Product.hasMany(Cart)

ProductImg.belongsTo(Product) //ProductImg -> productId
Product.hasMany(ProductImg)