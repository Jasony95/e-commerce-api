const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// GET all categories
router.get('/', async (req, res) => {
  try {
    const categoriesData = await Category.findAll({ include: [{ model: Product }] });
    res.status(200).json(categoriesData);
  } catch(err) {
    res.status(500).json(err);
  }

});

// Get one category by id
router.get('/:id', async (req, res) => {
  try {
    const categoriesData = await Category.findByPk(req.params.id, {include: [{model: Product}]});
  if (!categoriesData) {
    res.status(404).json({ message: 'No category with this id.' });
    return;
  }

  res.status(200).json(categoriesData);
} catch (err) {
  res.status(500).json(err);
  }
}
);

// Create a new category
router.post('/', async (req, res) => {
  try {
    const categoriesData = await Category.create(req.body);
    res.status(200).json(categoriesData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update a category
router.put('/:id', async (req, res) => {
  try {
    const categoriesData = await Category.update(
      req.body,
      {
        where: {
          id: req.params.id
        }
      }
    );
    if (!categoriesData) {
      res.status(404).json({ message: 'No category with this id.' });
      return;
    }
    res.status(200).json({status: "success", categoriesData});
  } catch (err) {
    res.status(500).json({status: "error", categoriesData: err.message});
  }
});

// Delete a category
router.delete('/:id', async (req, res) => {
  try {
    const categoriesData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!categoriesData) {
      res.status(404).json({ message: 'No category with this id.' });
      return;
    }

    res.status(200).json(categoriesData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;