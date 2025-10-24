import React from "react";
import Navigation from "../components/Navigation";
import ProductCard from "../components/ProductCard";
import { productosDestacados } from "../data/productos";

const Home = () => {
  return (
    <div>
      <Navigation />

      {/* Banner */}
      <section className="container my-4">
        <div className="row bg-light p-4 rounded align-items-center">
          <div className="col-md-6">
            <h1 className="mb-3">TecnoPeriféricos</h1>
            <p>Tienda Online de venta de perifericos</p>
            <a href="/productos" className="btn btn-outline-dark mt-2">
              <span className="me-2">&#128722;</span> Ver productos
            </a>
          </div>
          <div className="col-md-6">
            <img
              src="/assets/Nosotros2.webp"
              alt="Banner principal"
              className="img-fluid rounded"
              style={{ height: "200px", objectFit: "cover", width: "100%" }}
            />
          </div>
        </div>
      </section>

      {/* Productos destacados */}
      <section className="container mb-4">
        <h3 className="mb-3">Destacados</h3>
        <div className="row g-3">
          {productosDestacados.map((producto) => (
            <ProductCard key={producto.id} producto={producto} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
