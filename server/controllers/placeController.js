const Place = require('../models/Place');

// Add a new place
exports.addPlace = async (req, res) => {
  try {
    const {
      name,
      stateId,
      category,
      description,
      bestTimeToVisit,
      entryFee,
      location,
      image
    } = req.body;

    const newPlace = new Place({
      name,
      stateId,
      category,
      description,
      bestTimeToVisit,
      entryFee,
      location,
      image
    });

    const savedPlace = await newPlace.save();

    res.status(201).json({
      message: 'Place added successfully',
      place: savedPlace
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error adding place',
      error: error.message
    });
  }
};

// Get all places
exports.getAllPlaces = async (req, res) => {
  try {
    const places = await Place.find().populate('stateId', 'name capital');

    res.status(200).json(places);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching places',
      error: error.message
    });
  }
};

// Get places by state
exports.getPlacesByState = async (req, res) => {
  try {
    const places = await Place.find({ stateId: req.params.stateId });

    res.status(200).json(places);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching places by state',
      error: error.message
    });
  }
};

// Get single place by id
exports.getPlaceById = async (req, res) => {
  try {
    const place = await Place.findById(req.params.id).populate('stateId', 'name capital');

    if (!place) {
      return res.status(404).json({ message: 'Place not found' });
    }

    res.status(200).json(place);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching place',
      error: error.message
    });
  }
};

// Delete place
exports.deletePlace = async (req, res) => {
  try {
    const deletedPlace = await Place.findByIdAndDelete(req.params.id);

    if (!deletedPlace) {
      return res.status(404).json({ message: 'Place not found' });
    }

    res.status(200).json({ message: 'Place deleted successfully' });
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting place',
      error: error.message
    });
  }
};