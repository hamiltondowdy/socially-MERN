import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';
import "./style.css";

const Header = () => {

  const logout = event => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <header className="bg-secondary mb-4 py-2 flex-row align-center">
      <div className="container flex-row justify-space-between-lg justify-center align-center">
        <div className='container flex-column justify-content-center align-center' id='navvy'>
        <Link to="/">
          <h1>Socially</h1>
        </Link>
        </div>
        
        <div className='container flex-column justify-content-center align-center' id='navvy'>
        <nav className="text-center">
  {Auth.loggedIn() ? (
    <>
      <Link to="/profile">Profile</Link>
      <a href="/" onClick={logout}>
        Logout
      </a>
    </>
  ) : (
    <>
      <Link to="/login">Login</Link>
      <Link to="/signup">Signup</Link>
    </>
  )}
</nav>
</div>
   </div>
    </header>
  );
};

export default Header;
