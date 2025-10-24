import React from "react";

const ProductCard = ({ producto }) => {
  return (
    <div className="col-md-4 col-lg-3">
      <div className="card h-100">
        <img
          src={producto.imagen}
          className="card-img-top"
          alt={producto.nombre}
          style={{ height: "200px", objectFit: "cover" }}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{producto.nombre}</h5>
          <p className="card-text flex-grow-1">{producto.descripcion}</p>
          <div className="mt-auto">
            <p className="card-text fw-bold">${producto.precio}</p>
            <button className="btn btn-primary w-100">
              Agregar al carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
