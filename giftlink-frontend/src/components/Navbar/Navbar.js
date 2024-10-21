import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">GiftApp</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/app">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/app/gifts">Gifts</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/app/search">Search</Link> {/* Add SearchPage link */}
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/app/login">Login</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
