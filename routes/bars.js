var express = require('express');
var router = express.Router();
var bars = require('../controllers/barsController')

// GET all 
router.get('/', bars.index);
// Add form
router.get('/new', bars.new);
// GET one
router.get('/:id', bars.show);
// POST new bar
router.post('/', bars.create);
// POST new course to a bar
router.post('/:id/beers', bars.addBeer);
// Remove Beer from bar (and vice versa)
router.get('/:id/beers/:bid/remove', bars.removeBeer);
// DELETE bar
router.delete('/:id', bars.destroy);

module.exports = router;
