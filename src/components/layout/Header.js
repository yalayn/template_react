import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

function Header() {

  const { logout } = useAuth();
  const navigate   = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="header">
      <div><button onClick={handleLogout}>Salir</button> </div>
    </header>
  );

}

export default Header;