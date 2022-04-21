const router = require('express').Router();
const { Category, Product, ProductTag } = require('../../models');
const { json } = require('express/lib/response');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  Category.findAll({
    include: {
      model: Product,
      attribute: ['id', 'product_name', 'price', 'stock', 'category_id'],
    }
  })
  .then((dbCategoryData) => res.json(dbCategoryData))
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/:id', (req, res) => {
  Category.findOne ({
    where: {
      id: req.params.id
    },
    include: {
      model: Product,
      attribute: ['id','product_name','price','stock','category_id'],
    }
  })
  .then((dbCategoryData) => {
    if (!dbCategoryData) {
      res.status(404).json({ message: 'No category found with that id.' });
      return;
    }
    res.json(dbCategoryData);
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/', (req, res) => {
  // create a new category
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
