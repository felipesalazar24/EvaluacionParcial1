import React from "react";
import { productos } from "../data/productos";
import { Link } from "react-router-dom";

const ProductGrid = () => {
  return (
    <div className="row g-3">
      {productos.map((producto) => (
        <div key={producto.id} className="col-6 col-md-3">
          <div className="card h-100 text-center bg-light">
            <Link to={`/producto/${producto.id}`}>
              <div className="card-img-area">
                <img
                  src={`/assets/${producto.imagen.split("/").pop()}`}
                  alt={producto.nombre}
                  style={{ height: "200px", objectFit: "cover", width: "100%" }}
                />
              </div>
            </Link>
            <div className="card-body">
              <Link
                to={`/producto/${producto.id}`}
                className="h6 text-primary text-decoration-none"
              >
                {producto.nombre}
              </Link>
              <p className="fw-bold mb-1">
                ${producto.precio.toLocaleString()}
              </p>
              <Link
                to={`/producto/${producto.id}`}
                className="btn btn-outline-dark btn-sm"
              >
                Ver
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
