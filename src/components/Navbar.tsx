import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar-title">Test technique</div>
      <button className="admin-button" onClick={() => navigate('/admin')}>
        Administrateur
      </button>
    </nav>
  );
};

export default Navbar;
