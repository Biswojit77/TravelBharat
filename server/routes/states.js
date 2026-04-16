const router = require('express').Router();
let State = require('../models/State');

// Route to Add a New State
router.route('/add').post((req, res) => {
    const { name, capital, language, famousFor, description } = req.body;

    const newState = new State({
        name,
        capital,
        language,
        famousFor,
        description
    });

    newState.save()
        .then(() => res.json('State added successfully!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Route to Get All States
router.route('/').get((req, res) => {
    State.find()
        .then(states => res.json(states))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Route to Delete a State
router.route('/:id').delete((req, res) => {
    State.findByIdAndDelete(req.params.id)
        .then(() => res.json('State deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;	