import React from 'react';
import { Link } from 'react-router-dom';
import '../../assets/styles/Sidebar.css'; // Crear un archivo CSS para los estilos del sidebar

function Sidebar() {
  return (
    <aside className="sidebar">
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
