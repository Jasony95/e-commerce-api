// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: 'category_id',
  targetKey: 'id',
  onDelete: 'CASCADE',
  allowNull: false
}
);

// Categories have many Products
Category.hasMany(Product, {
  foreignKey: 'category_id',
  targetKey: 'id',
  onDelete: 'CASCADE',
  allowNull: false
})

// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  through: {
    model: ProductTag,
    unique: false
  },

  as: 'Product_tag'
})

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  through: {
    model: ProductTag,
    unique: false
  },

  as: 'Tag_product'
})

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
