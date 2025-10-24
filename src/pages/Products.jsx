import React from "react";
import Navigation from "../components/Navigation";
import ProductGrid from "../components/ProductGrid";

const Products = () => {
  return (
    <div>
      <Navigation />
      <div className="container mt-4">
        <h2 className="text-center mb-4">PRODUCTOS</h2>
        <ProductGrid />
      </div>
    </div>
  );
};

export default Products;
