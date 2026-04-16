import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddState from './AddState';

// --- SUB-COMPONENT FOR THE INDIVIDUAL CARD ---
const StateCard = ({ state, onDelete, userRole }) => {
  const [isCardHovered, setIsCardHovered] = useState(false);
  const isAdmin = userRole === 'admin';

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
          borderLeft: `6px solid ${isAdmin ? '#0d6efd' : '#ff9933'}` 
        }}
      >
        <div className="card-body p-4 d-flex flex-column">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="fw-bold text-primary mb-0">{state.name}</h4>
            {isAdmin && (
              <button 
                className="btn btn-sm btn-outline-danger border-0 rounded-circle"
                onClick={() => onDelete(state._id)}
                style={{ width: '32px', height: '32px' }}
              >
                ×
              </button>
            )}
          </div>
          <div className="mb-3">
            <span className="badge bg-info text-dark me-2">📍 {state.capital}</span>
            <span className="badge bg-secondary">🗣️ {state.language}</span>
          </div>
          <p className="text-muted flex-grow-1" style={{ fontSize: '0.95rem' }}>{state.description}</p>
          <div className="mt-3 pt-3 border-top">
            <small className="text-primary fw-bold d-block mb-1">Tourist Places:</small>
            <p className="small mb-0 text-dark italic">{state.famousFor}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

function App() {
  const [states, setStates] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentUser, setCurrentUser] = useState(null); // Stores {username, role}
  const [loginInput, setLoginInput] = useState({ username: '', password: '' });

  const fetchStates = () => {
    axios.get('http://localhost:5000/states')
      .then(res => setStates(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => { if (currentUser) fetchStates(); }, [currentUser]);

  const handleLogin = (e) => {
    e.preventDefault();
    // LOGIC: If username is 'admin', set role to admin. Otherwise, user.
    if (loginInput.username.toLowerCase() === 'admin' && loginInput.password === '123') {
      setCurrentUser({ name: 'Admin', role: 'admin' });
    } else {
      setCurrentUser({ name: loginInput.username, role: 'user' });
    }
  };

  const filteredStates = states.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.famousFor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // --- VIEW 1: LOGIN SCREEN ---
  if (!currentUser) {
    return (
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="card p-5 shadow-lg border-0 rounded-4 text-center" style={{ maxWidth: '400px', width: '100%' }}>
          <h2 className="fw-bold mb-4">Travel<span className="text-warning">Bharat</span></h2>
          <form onSubmit={handleLogin}>
            <input type="text" className="form-control mb-3 rounded-pill p-3" placeholder="Username" 
              required onChange={(e) => setLoginInput({...loginInput, username: e.target.value})} />
            <input type="password" className="form-control mb-4 rounded-pill p-3" placeholder="Password" 
              required onChange={(e) => setLoginInput({...loginInput, password: e.target.value})} />
            <button className="btn btn-primary w-100 rounded-pill p-3 fw-bold">Login</button>
          </form>
          <p className="small text-muted mt-3">Try 'admin' with pass '123' for Admin mode</p>
        </div>
      </div>
    );
  }

  // --- VIEW 2: DASHBOARD (ADMIN OR USER) ---
  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-5">
        <h1 className="fw-bold m-0">Travel<span className="text-warning">Bharat</span></h1>
        <div className="text-end">
          <span className="badge bg-light text-dark border p-2 me-2">Welcome, {currentUser.name} ({currentUser.role})</span>
          <button className="btn btn-sm btn-danger rounded-pill" onClick={() => setCurrentUser(null)}>Logout</button>
        </div>
      </div>

      <div className="row justify-content-center mb-5">
        <div className="col-md-7">
          <div className="input-group shadow-sm rounded-pill overflow-hidden border">
            <span className="input-group-text bg-white border-0 ps-4">🔍</span>
            <input type="text" className="form-control border-0 py-3 shadow-none" placeholder="Search state or tourist places..." 
              value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
        </div>
      </div>

      {currentUser.role === 'admin' && (
        <div className="row justify-content-center mb-5">
          <div className="col-md-8">
            <div className="card p-4 border-0 shadow-sm rounded-4 bg-light">
              <h5 className="fw-bold mb-3">⚙️ Admin Control: Add New Entry</h5>
              <AddState onStateAdded={fetchStates} />
            </div>
          </div>
        </div>
      )}

      <div className="row">
        {filteredStates.map(state => (
          <StateCard key={state._id} state={state} userRole={currentUser.role} onDelete={(id) => {
            axios.delete(`http://localhost:5000/states/${id}`).then(fetchStates);
          }} />
        ))}
      </div>
    </div>
  );
}

export default App;