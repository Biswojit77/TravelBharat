import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddState from './AddState';

function App() {
  const [states, setStates] = useState([]);

  const fetchStates = () => {
    axios.get('http://localhost:5000/states')
      .then(res => setStates(res.data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchStates();
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="text-center text-primary mb-5">TravelBharat 🇮🇳</h1>
      
      <div className="row justify-content-center">
        <div className="col-md-6">
          <AddState onStateAdded={fetchStates} />
        </div>
      </div>

      <hr />

      <div className="row mt-4">
        {states.map(state => (
          <div className="col-md-4 mb-4" key={state._id}>
            <div className="card shadow-sm h-100 border-primary">
              <div className="card-body">
                <h5 className="card-title text-success">{state.name}</h5>
                <p><strong>Capital:</strong> {state.capital}</p>
                <p className="small">{state.description}</p>
                <span className="badge bg-primary">{state.language}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;