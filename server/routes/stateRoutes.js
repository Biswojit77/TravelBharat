const router = require('express').Router();
const stateController = require('../controllers/stateController');

// Add a new state
router.post('/', stateController.addState);

// Get all states
router.get('/', stateController.getAllStates);

// Get single state by ID
router.get('/:id', stateController.getStateById);

// Delete a state
router.delete('/:id', stateController.deleteState);

module.exports = router;