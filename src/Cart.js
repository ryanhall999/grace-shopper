import React, { useState, useEffect } from "react";
import axios from "axios";
import PromoDisplay from "./PromoDisplay.js";

const Cart = ({
  promo,
  multiplier,
  promoDescription,
  setPromo,
  allPromos,
  subtotal,
  lineItems,
  cart,
  createOrder,
  removeFromCart,
  setIsSubmitted,
  products
}) => {
  let cartId = cart.id;
  let promoId;

  const onChange = ev => {
    let uppercaseInput = ev.target.value.toUpperCase();
    setPromo(uppercaseInput);
  };

  const onPromoSubmit = ev => {
    ev.preventDefault();
    setIsSubmitted(true);
    const filtered = allPromos.filter(each => each.code === promo)[0];
    if (filtered) {
      promoId = filtered.id;
      axios.post("/api/sendPromo", { cartId, promoId });
    }
  };

  return (
    <div>
      <h2>Cart - {cart.id && cart.id.slice(0, 4)}</h2>
      <button
        type="button"
        className="btn btn-dark"
        disabled={!lineItems.find(lineItem => lineItem.orderId === cart.id)}
        onClick={createOrder}
      >
        Create Order
      </button>
      <ul>
        {lineItems
          .filter(lineItem => lineItem.orderId === cart.id)
          .map(lineItem => {
            const product = products.find(
              product => product.id === lineItem.productId
            );
            return (
              <li key={lineItem.id}>
                {product && product.name} <br />
                <span className="quantity">Quantity: {lineItem.quantity}</span>
                <button onClick={() => removeFromCart(lineItem.id)}>
                  Remove From Cart
                </button>
                item subtotal: $
                {Number(lineItem.quantity * product.price).toFixed(2)}
              </li>
            );
          })}
      </ul>
      <p>cart subtotal: ${subtotal}</p>
      <form onSubmit={onPromoSubmit}>
        <input placeholder="promo code" value={promo} onChange={onChange} />
        <button>submit promo code</button>
        <PromoDisplay
          promoDescription={promoDescription}
          multiplier={multiplier}
        />
      </form>
    </div>
  );
};

export default Cart;
