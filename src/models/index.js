const Category = require('./Category')
const User = require('./User');
const Product = require('./Product')
const ProductImg = require('./ProductImg')

Product.belongsTo(Category) // Product -> categoryId
Category.hasMany(Product)

ProductImg.belongsTo(Product) //ProductImg -> productId
Product.hasMany(ProductImg)