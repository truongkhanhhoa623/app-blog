const express = require('express');
const postsController = require('../app/controllers/PostsController');
const router = express.Router()


// router.get('/:id/edit', postsController.edit)
// router.put('/:id', postsController.update)
// router.delete('/:id', postsController.delete)
router.get('/:slug', postsController.show)


module.exports = router 