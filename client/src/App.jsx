import React, { useState, useEffect } from "react";
import API from "./services/api";
import "bootstrap/dist/css/bootstrap.min.css";
import AddState from "./pages/AddState";
import AddPlace from "./pages/AddPlace";

const StateCard = ({ state, onDelete, userRole, onView }) => {
  const [isCardHovered, setIsCardHovered] = useState(false);
  const isAdmin = userRole === "admin";

  return (
    <div className="col-md-4 mb-4">
      <div
        className="card shadow-sm h-100 border-0 rounded-4"
        onMouseEnter={() => setIsCardHovered(true)}
        onMouseLeave={() => setIsCardHovered(false)}
        style={{
          transition: "all 0.3s ease",
          transform: isCardHovered ? "translateY(-8px)" : "translateY(0)",
          boxShadow: isCardHovered
            ? "0 12px 24px rgba(0,0,0,0.15)"
            : "0 4px 6px rgba(0,0,0,0.05)",
          borderLeft: `6px solid ${isAdmin ? "#0d6efd" : "#ff9933"}`,
        }}
      >
        <div className="card-body p-4 d-flex flex-column">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="fw-bold text-primary mb-0">{state.name}</h4>

            {isAdmin && (
              <button
                className="btn btn-sm btn-outline-danger border-0 rounded-circle"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(state._id);
                }}
                style={{ width: "32px", height: "32px" }}
              >
                ×
              </button>
            )}
          </div>

          <div className="mb-3">
            <span className="badge bg-info text-dark me-2">
              📍 {state.capital}
            </span>
            <span className="badge bg-secondary">🗣️ {state.language}</span>
          </div>

          <p className="text-muted flex-grow-1" style={{ fontSize: "0.95rem" }}>
            {state.description?.length > 100
              ? `${state.description.substring(0, 100)}...`
              : state.description}
          </p>

          <button
            className="btn btn-primary w-100 rounded-pill mt-3 fw-bold"
            onClick={onView}
          >
            Explore State
          </button>
        </div>
      </div>
    </div>
  );
};

const StateDetailView = ({ state, onBack }) => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    if (!state) return;

    const fetchPlaces = async () => {
      try {
        const res = await API.get(`/places/state/${state._id}`);
        setPlaces(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPlaces();
  }, [state]);

  if (!state) return null;

  const famousPlaces = state?.famousFor ? state.famousFor.split(",") : [];

  return (
    <div className="container py-2">
      <button
        className="btn btn-outline-primary mb-4 rounded-pill"
        onClick={onBack}
      >
        ← Back to Discovery
      </button>

      <div className="row">
        <div className="col-md-8">
          <h1 className="display-3 fw-bold text-primary mb-3">{state.name}</h1>

          <div className="d-flex gap-3 mb-4 flex-wrap">
            <span className="badge bg-info text-dark p-2 px-3 rounded-pill">
              📍 Capital: {state.capital}
            </span>
            <span className="badge bg-secondary p-2 px-3 rounded-pill">
              🗣️ Language: {state.language}
            </span>
          </div>

          <hr />

          <h3 className="fw-bold mt-4">Overview</h3>
          <p className="lead text-muted" style={{ lineHeight: "1.8" }}>
            {state.description}
          </p>
        </div>

        <div className="col-md-4">
          <div
            className="card border-0 shadow-lg rounded-4 p-4 sticky-top"
            style={{ top: "20px" }}
          >
            <h4 className="fw-bold mb-4 text-warning">
              Tourist Attractions 🏛️
            </h4>
            <h4 className="fw-bold mt-4">Explore Places 📍</h4>

            {places.length > 0 ? (
              places.map((place) => (
                <div key={place._id} className="card p-3 mb-3 shadow-sm">
                  <h5 className="fw-bold">{place.name}</h5>

                  <p className="text-muted">
                    {place.description?.length > 100
                      ? place.description.substring(0, 100) + "..."
                      : place.description}
                  </p>

                  <div className="d-flex gap-2 flex-wrap">
                    <span className="badge bg-primary">{place.category}</span>

                    {place.bestTimeToVisit && (
                      <span className="badge bg-success">
                        {place.bestTimeToVisit}
                      </span>
                    )}
                  </div>

                  {place.location && (
                    <a
                      href={place.location}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-sm btn-outline-primary mt-2"
                    >
                      📍 View on Map
                    </a>
                  )}
                </div>
              ))
            ) : (
              <p className="text-muted">No places added yet.</p>
            )}

            <ul className="list-group list-group-flush">
              {famousPlaces.length > 0 ? (
                famousPlaces.map((place, index) => (
                  <li
                    key={index}
                    className="list-group-item border-0 ps-0 text-dark"
                  >
                    ✅ {place.trim()}
                  </li>
                ))
              ) : (
                <li className="list-group-item border-0 ps-0 text-muted">
                  No attractions available
                </li>
              )}
            </ul>

            <button className="btn btn-success w-100 mt-4 rounded-pill fw-bold">
              Plan a Visit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

function App() {
  const [states, setStates] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [loginInput, setLoginInput] = useState({ username: "", password: "" });
  const [selectedState, setSelectedState] = useState(null);

  const fetchStates = async () => {
    try {
      const res = await API.get("/states");
      setStates(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error(error);
      setStates([]);
    }
  };

  useEffect(() => {
    if (!currentUser) return;

    const loadData = async () => {
      await fetchStates();
    };

    loadData();
  }, [currentUser]);

  const handleLogin = (e) => {
    e.preventDefault();

    if (
      loginInput.username.toLowerCase() === "admin" &&
      loginInput.password === "123"
    ) {
      setCurrentUser({ name: "Admin", role: "admin" });
    } else {
      setCurrentUser({ name: loginInput.username, role: "user" });
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setSelectedState(null);
    setSearchTerm("");
    setLoginInput({ username: "", password: "" });
  };

  const deleteState = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this state?",
    );

    if (!confirmed) return;

    try {
      await API.delete(`/states/${id}`);
      fetchStates();
    } catch (error) {
      console.error("Error deleting state:", error);
      alert("Failed to delete state");
    }
  };

  const filteredStates = Array.isArray(states)
    ? states.filter((state) => {
        const search = searchTerm.toLowerCase();

        return (
          state.name?.toLowerCase().includes(search) ||
          state.famousFor?.toLowerCase().includes(search)
        );
      })
    : [];

  if (!currentUser) {
    return (
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div
          className="card p-5 shadow-lg border-0 rounded-4 text-center"
          style={{ maxWidth: "400px", width: "100%" }}
        >
          <h2 className="fw-bold mb-4">
            Travel<span className="text-warning">Bharat</span>
          </h2>

          <form onSubmit={handleLogin}>
            <input
              type="text"
              className="form-control mb-3 rounded-pill p-3"
              placeholder="Username"
              required
              value={loginInput.username}
              onChange={(e) =>
                setLoginInput({ ...loginInput, username: e.target.value })
              }
            />

            <input
              type="password"
              className="form-control mb-4 rounded-pill p-3"
              placeholder="Password"
              required
              value={loginInput.password}
              onChange={(e) =>
                setLoginInput({ ...loginInput, password: e.target.value })
              }
            />

            <button
              type="submit"
              className="btn btn-primary w-100 rounded-pill p-3 fw-bold shadow"
            >
              Login
            </button>
          </form>

          <p className="small text-muted mt-3">
            Try admin / 123 for Admin Panel
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-5">
        <h1
          className="fw-bold m-0"
          style={{ cursor: "pointer" }}
          onClick={() => setSelectedState(null)}
        >
          Travel<span className="text-warning">Bharat</span>
        </h1>

        <div className="text-end">
          <span className="badge bg-light text-dark border p-2 me-2">
            👤 {currentUser.name} ({currentUser.role})
          </span>

          <button
            className="btn btn-sm btn-danger rounded-pill px-3"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>

      {selectedState ? (
        <StateDetailView
          state={selectedState}
          onBack={() => setSelectedState(null)}
        />
      ) : (
        <>
          <div className="row justify-content-center mb-5">
            <div className="col-md-7">
              <div className="input-group shadow-sm rounded-pill overflow-hidden border">
                <span className="input-group-text bg-white border-0 ps-4">
                  🔍
                </span>
                <input
                  type="text"
                  className="form-control border-0 py-3 shadow-none"
                  placeholder="Where do you want to go? (e.g. Odisha, Temple...)"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>

          {currentUser.role === "admin" && (
            <div className="row justify-content-center mb-5">
              <div className="col-md-8">
                <div className="card p-4 border-0 shadow-sm rounded-4 bg-light mb-4">
                  <h5 className="fw-bold mb-3">
                    ⚙️ Admin Control: Manage States
                  </h5>
                  <AddState onStateAdded={fetchStates} />
                </div>

                <div className="card p-4 border-0 shadow-sm rounded-4 bg-light">
                  <h5 className="fw-bold mb-3">
                    📍 Admin Control: Manage Places
                  </h5>
                  <AddPlace states={states} onPlaceAdded={() => {}} />
                </div>
              </div>
            </div>
          )}

          <div className="row px-md-3">
            {filteredStates.length > 0 ? (
              filteredStates.map((state) => (
                <StateCard
                  key={state._id}
                  state={state}
                  userRole={currentUser.role}
                  onDelete={deleteState}
                  onView={() => setSelectedState(state)}
                />
              ))
            ) : (
              <div className="text-center text-muted mt-5">
                <p className="fs-5">No states found matching your search. 🇮🇳</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
