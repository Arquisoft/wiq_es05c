import React ,{useContext} from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { AuthContext } from '../authcontext';
import { Dropdown, Nav } from 'react-bootstrap';

const Navbar = () => {
  //sacar el valor para ver si esta logeado o no 
  const { isLoggedIn, username } = useContext(AuthContext); // Obtiene username del contexto

  return(
  <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
    <div className="collapse navbar-collapse" id="my-navbarColor01">
      <Link to="/" className="navbar-brand">
        <img src="LogoSaberYganar.png" alt="Logo" />
      </Link>
    </div>

    <div className="collapse navbar-collapse" id="my-navbarColor02">
        <ul className="navbar-nav justify-content-end">
          {!isLoggedIn ? (
            <>
              <li className="nav-item">
                <Link to="/addUser" className="nav-link">
                  <i className="fas fa-sign-in-alt" style={{ fontSize: '16px' }}></i>
                  <span>Registrarse</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/login" className="nav-link">
                  <i className="fas fa-sign-in-alt" style={{ fontSize: '16px' }}></i>
                  <span>Iniciar sesión</span>
                </Link>
              </li>
            </>
          ) : (
            <>
            <Dropdown as={Nav.Item}>
              <Dropdown.Toggle as={Nav.Link}>
                <i className="fas fa-user"></i> (// Icono de usuario)
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item disabled>{username}</Dropdown.Item> (// Nombre de usuario como texto no editable)
                <Dropdown.Item href="/logout">Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <li className="nav-item">
              <Link to="/history" className="nav-link">
                <i className="fas fa-sign-in-alt" style={{ fontSize: '16px' }}></i>
                <span>Historial</span>
              </Link>
            </li>
          </>

            
          )}
        </ul>
      </div>
  </nav>
  );
          };

export default Navbar;