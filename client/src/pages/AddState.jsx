import React, { useState } from 'react';
import axios from 'axios';

function AddState({ onStateAdded }) {
  const [formData, setFormData] = useState({
    name: '',
    capital: '',
    language: '',
    famousFor: '',
    description: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:5000/states', formData);
      alert('State added successfully!');

      setFormData({
        name: '',
        capital: '',
        language: '',
        famousFor: '',
        description: ''
      });

      if (onStateAdded) {
        onStateAdded();
      }
    } catch (error) {
      console.error('Error adding state:', error);
      alert('Failed to add state');
    }
  };

  return (
    <div className="card p-4 mb-5 shadow-sm">
      <h3>Add a New State 🇮🇳</h3>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            name="name"
            placeholder="State Name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="text"
            name="capital"
            placeholder="Capital"
            className="form-control"
            value={formData.capital}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="text"
            name="language"
            placeholder="Language"
            className="form-control"
            value={formData.language}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="text"
            name="famousFor"
            placeholder="Famous For"
            className="form-control"
            value={formData.famousFor}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <textarea
            name="description"
            placeholder="Description"
            className="form-control"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Add to Encyclopedia
        </button>
      </form>
    </div>
  );
}

export default AddState;