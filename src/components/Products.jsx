import React, {useContext } from 'react';
import Product from "./Product";
import AppContext from '../context/AppContext';
import "../styles/components/Products.css";

const Products = () => {
  const { state, addToCard } = useContext(AppContext);
  const { products } = state;

  const handleAddToCart = (product) => (
    function add() {
      addToCard(product)
    }
  )

  return (
    <div className="Products">
      <div className="Products-items">
        {products.map((product) => (
          <Product
            key={product.id}
            product={product}
            handleAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default Products;