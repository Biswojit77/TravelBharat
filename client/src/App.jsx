import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddState from './AddState';

// --- SUB-COMPONENT FOR THE INDIVIDUAL CARD ---
const StateCard = ({ state, onDelete }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isCardHovered, setIsCardHovered] = useState(false);

  return (
    <div className="col-md-4 mb-4">
      <div 
        className="card shadow-sm h-100 border-0 rounded-4" 
        onMouseEnter={() => setIsCardHovered(true)}
        onMouseLeave={() => setIsCardHovered(false)}
        style={{ 
          transition: 'all 0.3s ease',
          transform: isCardHovered ? 'translateY(-8px)' : 'translateY(0)',
          boxShadow: isCardHovered ? '0 12px 24px rgba(0,0,0,0.15)' : '0 4px 6px rgba(0,0,0,0.05)',
          borderLeft: '6px solid #0d6efd' 
        }}
      >
        <div className="card-body p-4 d-flex flex-column">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="fw-bold text-primary mb-0">{state.name}</h4>
            
            <button 
              onClick={() => onDelete(state._id)}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              style={{ 
                transition: '0.3s', 
                backgroundColor: isHovered ? '#dc3545' : '#f8f9fa', 
                color: isHovered ? 'white' : '#dc3545',
                width: '35px',
                height: '35px',
                borderRadius: '50%', // Rounder look
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: 'none',
                fontSize: '1.4rem',
                cursor: 'pointer',
                paddingBottom: '5px' // Fine-tune centering of the ×
              }}
            >
              ×
            </button>
          </div>
          
          <div className="mb-3">
            <span className="badge bg-info text-dark me-2">📍 {state.capital}</span>
            <span className="badge bg-secondary">🗣️ {state.language}</span>
          </div>
          
          <p className="text-muted flex-grow-1" style={{ fontSize: '0.95rem' }}>
            {state.description}
          </p>
          
          <div className="mt-3 pt-3 border-top">
            <small className="text-primary fw-bold d-block mb-1">Famous For:</small>
            <p className="small mb-0 text-dark italic">{state.famousFor}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- MAIN APP COMPONENT ---
function App() {
  const [states, setStates] = useState([]);

  const fetchStates = () => {
    axios.get('http://localhost:5000/states')
      .then(res => setStates(res.data))
      .catch(err => console.error("Fetch Error:", err));
  };

  useEffect(() => {
    fetchStates();
  }, []);

  const deleteState = (id) => {
    axios.delete(`http://localhost:5000/states/${id}`)
      .then(() => {
        setStates(states.filter(el => el._id !== id));
      })
      .catch(err => console.error("Delete Error:", err));
  };

  return (
    <div className="container py-5">
      <header className="text-center mb-5">
        <h1 className="display-4 fw-bold text-primary">TravelBharat 🇮🇳</h1>
        <p className="text-muted">Explore the beauty of Indian States</p>
      </header>
      
      <div className="row justify-content-center mb-5">
        <div className="col-md-7">
          <AddState onStateAdded={fetchStates} />
        </div>
      </div>

      <div className="row">
        {states.length > 0 ? (
          states.map(state => (
            <StateCard 
              key={state._id} 
              state={state} 
              onDelete={deleteState} 
            />
          ))
        ) : (
          <div className="text-center text-muted mt-5">
            <p>No states found. Add your first state above!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;