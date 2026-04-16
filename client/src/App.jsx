import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [states, setStates] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from our Node.js server
  useEffect(() => {
    axios.get('http://localhost:5000/states')
      .then(response => {
        setStates(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("There was an error fetching the states!", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="text-center text-primary mb-4">TravelBharat 🇮🇳</h1>
      
      {loading ? (
        <div className="text-center">Loading your journey...</div>
      ) : (
        <div className="row">
          {states.map(state => (
            <div className="col-md-4 mb-4" key={state._id}>
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <h5 className="card-title text-success">{state.name}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">Capital: {state.capital}</h6>
                  <p className="card-text">{state.description}</p>
                  <p><strong>Famous for:</strong> {state.famousFor}</p>
                  <span className="badge bg-info text-dark">{state.language}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {states.length === 0 && !loading && (
        <div className="alert alert-warning text-center">
          No states found. Make sure your backend is running and you added data!
        </div>
      )}
    </div>
  );
}

export default App;