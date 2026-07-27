import { Routes, Route, Link } from 'react-router-dom';

function Home() {
  return (
    <div className="container py-5">
      <h1 className="display-4 mb-3">OctoFit Tracker</h1>
      <p className="lead">A modern multi-tier fitness and team tracking app.</p>
      <div className="d-flex gap-3">
        <Link className="btn btn-primary" to="/activities">Activities</Link>
        <Link className="btn btn-outline-secondary" to="/teams">Teams</Link>
      </div>
    </div>
  );
}

function Activities() {
  return <div className="container py-5"><h2>Activities</h2><p>Track workouts and progress.</p></div>;
}

function Teams() {
  return <div className="container py-5"><h2>Teams</h2><p>Create and manage teams.</p></div>;
}

export default function App() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">OctoFit</Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/teams" element={<Teams />} />
      </Routes>
    </div>
  );
}
