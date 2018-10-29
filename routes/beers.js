var express = require('express');
var router = express.Router();
var beers = require('../controllers/beersController')

// GET all 
router.get('/', beers.index);
// Add form
router.get('/new', beers.new);
// GET one
router.get('/:id', beers.show);
// POST new beer
router.post('/', beers.create);
// POST new Bar to a beer
router.post('/:id/bars', beers.addBar);

router.post('/:id/comments', beers.createComment);

router.post('/:id/bars', beers.removeBar);
// DELETE Bar
router.delete('/:id', beers.destroy);

module.exports = router;