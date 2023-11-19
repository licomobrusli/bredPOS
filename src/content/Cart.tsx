
import React, { useState } from 'react';

const Cart = () => {
  const [itemCount, setItemCount] = useState(0);

  const handleAddToCart = () => {
    setItemCount(itemCount + 1);
  };

  return (
    <div>
      <img src="cart.png" alt="Shopping Cart" onClick={handleAddToCart} />
      <span>{itemCount}</span>
    </div>
  );
};

export default Cart;
