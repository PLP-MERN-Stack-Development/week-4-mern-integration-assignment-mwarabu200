const Comment = require('../models/comment');

exports.getCommentsForPost = async (req, res, next) => {
  try {
    const comments = await Comment.find({ post: req.params.id }).sort({ createdAt: -1 });
    res.json(comments);
  } catch (err) {
    next(err);
  }
};

exports.createComment = async (req, res, next) => {
  try {
    const { user, text } = req.body;

    const comment = new Comment({
      post: req.params.id,
      user,
      text
    });

    const saved = await comment.save();
    res.status(201).json(saved);
  } catch (err) {
    next(err);
  }
};
