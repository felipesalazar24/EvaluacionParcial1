import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { updateCartCount } from "../utils/cartUtils";

const Navigation = () => {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    setCartCount(updateCartCount());
  }, []);

  return (
    <div className="d-flex justify-content-between align-items-center bg-light p-2">
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <Link className="nav-link" to="/">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" to="/productos">
            Productos
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/nosotros">
            Nosotros
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/blog">
            Blog
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/contacto">
            Contacto
          </Link>
        </li>
      </ul>
      <div className="d-flex gap-2">
        <Link to="/register" className="btn btn-primary">
          Register
        </Link>
        <Link to="/login" className="btn btn-primary">
          Login
        </Link>
        <Link to="/carrito" className="btn btn-dark">
          <span className="me-1">&#128722;</span> Ver Carrito (
          <span>{cartCount}</span>)
        </Link>
        <Link to="/admin" className="btn btn-warning d-none">
          Administrar
        </Link>
        <button className="btn btn-outline-danger d-none">Cerrar sesión</button>
      </div>
    </div>
  );
};

export default Navigation;
