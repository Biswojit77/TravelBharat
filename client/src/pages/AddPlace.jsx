import React, { useState } from 'react';
import axios from 'axios';

const AddPlace = ({ states, onPlaceAdded }) => {
  const [place, setPlace] = useState({
    name: '',
    stateId: '',
    category: 'Heritage',
    description: '',
    bestTimeToVisit: '',
    entryFee: '',
    location: '',
    image: ''
  });

  const handleChange = (e) => {
    setPlace({ ...place, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:5000/places', place);
      alert('Destination added successfully!');

      setPlace({
        name: '',
        stateId: '',
        category: 'Heritage',
        description: '',
        bestTimeToVisit: '',
        entryFee: '',
        location: '',
        image: ''
      });

      if (onPlaceAdded) {
        onPlaceAdded();
      }
    } catch (error) {
      console.error('Error adding place:', error);
      alert('Failed to add destination');
    }
  };

  return (
    <div className="card p-4 shadow-sm">
      <h3 className="mb-3">Add a New Tourist Place 🏝️</h3>

      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6">
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Place Name"
            value={place.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <select
            name="stateId"
            className="form-select"
            value={place.stateId}
            onChange={handleChange}
            required
          >
            <option value="">Select State</option>
            {states.map((state) => (
              <option key={state._id} value={state._id}>
                {state.name}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-6">
          <select
            name="category"
            className="form-select"
            value={place.category}
            onChange={handleChange}
            required
          >
            <option value="Heritage">Heritage</option>
            <option value="Nature">Nature</option>
            <option value="Religious">Religious</option>
            <option value="Adventure">Adventure</option>
          </select>
        </div>

        <div className="col-md-6">
          <input
            type="text"
            name="bestTimeToVisit"
            className="form-control"
            placeholder="Best Time to Visit"
            value={place.bestTimeToVisit}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <input
            type="text"
            name="entryFee"
            className="form-control"
            placeholder="Entry Fee"
            value={place.entryFee}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <input
            type="text"
            name="location"
            className="form-control"
            placeholder="Location / Map Link"
            value={place.location}
            onChange={handleChange}
          />
        </div>

        <div className="col-12">
          <input
            type="text"
            name="image"
            className="form-control"
            placeholder="Image URL"
            value={place.image}
            onChange={handleChange}
          />
        </div>

        <div className="col-12">
          <textarea
            name="description"
            className="form-control"
            rows="4"
            placeholder="Description"
            value={place.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-12">
          <button type="submit" className="btn btn-success w-100 fw-bold">
            Add Tourist Spot
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPlace;