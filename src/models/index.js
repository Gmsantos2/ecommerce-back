const Category = require('./Category')
const User = require('./User');
const Product = require('./Product')

Product.belongsTo(Category) // Product -> categoryId
Category.hasMany(Product)