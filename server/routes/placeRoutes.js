const router = require('express').Router();
const placeController = require('../controllers/placeController');

// Add a new place
router.post('/', placeController.addPlace);

// Get all places
router.get('/', placeController.getAllPlaces);

// Get places by state
router.get('/state/:stateId', placeController.getPlacesByState);

// Get single place by ID
router.get('/:id', placeController.getPlaceById);

// Delete a place
router.delete('/:id', placeController.deletePlace);

module.exports = router;