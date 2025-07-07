const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

router.get('/', categoryController.getAllCategories);
router.post(
  '/',
  [
    body('name').notEmpty().withMessage('Category name is required'),
  ],
  categoryController.createCategory
);

module.exports = router;
