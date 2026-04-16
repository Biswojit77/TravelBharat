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

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/states/add', formData)
      .then(() => {
        alert('State added successfully!');
        setFormData({ name: '', capital: '', language: '', famousFor: '', description: '' });
        onStateAdded(); // This refreshes the list in the main App
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="card p-4 mb-5 shadow-sm">
      <h3>Add a New State 🇮🇳</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input type="text" placeholder="State Name" className="form-control" 
            value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
        </div>
        <div className="mb-3">
          <input type="text" placeholder="Capital" className="form-control" 
            value={formData.capital} onChange={(e) => setFormData({...formData, capital: e.target.value})} required />
        </div>
        <div className="mb-3">
          <input type="text" placeholder="Language" className="form-control" 
            value={formData.language} onChange={(e) => setFormData({...formData, language: e.target.value})} required />
        </div>
        <div className="mb-3">
          <input type="text" placeholder="Famous For" className="form-control" 
            value={formData.famousFor} onChange={(e) => setFormData({...formData, famousFor: e.target.value})} required />
        </div>
        <div className="mb-3">
          <textarea placeholder="Description" className="form-control" 
            value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} required />
        </div>
        <button type="submit" className="btn btn-primary w-100">Add to Encyclopedia</button>
      </form>
    </div>
  );
}

export default AddState;