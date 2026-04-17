const State = require('../models/State');

// Add a new state
exports.addState = async (req, res) => {
  try {
    const { name, capital, language, famousFor, description } = req.body;

    const existingState = await State.findOne({ name });

    if (existingState) {
      return res.status(400).json({ message: 'State already exists' });
    }

    const newState = new State({
      name,
      capital,
      language,
      famousFor,
      description
    });

    const savedState = await newState.save();

    res.status(201).json({
      message: 'State added successfully',
      state: savedState
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error adding state',
      error: error.message
    });
  }
};

// Get all states
exports.getAllStates = async (req, res) => {
  try {
    const states = await State.find().sort({ name: 1 });

    res.status(200).json(states);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching states',
      error: error.message
    });
  }
};

// Get single state by id
exports.getStateById = async (req, res) => {
  try {
    const state = await State.findById(req.params.id);

    if (!state) {
      return res.status(404).json({ message: 'State not found' });
    }

    res.status(200).json(state);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching state',
      error: error.message
    });
  }
};

// Delete state
exports.deleteState = async (req, res) => {
  try {
    const deletedState = await State.findByIdAndDelete(req.params.id);

    if (!deletedState) {
      return res.status(404).json({ message: 'State not found' });
    }

    res.status(200).json({ message: 'State deleted successfully' });
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting state',
      error: error.message
    });
  }
};