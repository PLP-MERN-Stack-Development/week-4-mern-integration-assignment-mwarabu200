const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const postController = require('../controllers/postController');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload =multer({ storage: storage});

router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostById);
router.post(
  '/',
  upload.single('image'),
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('content').notEmpty().withMessage('Content is required'),
    body('category').notEmpty().withMessage('Category ID is required'),
  ],
  postController.createPost
);


router.put('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);

module.exports = router;
