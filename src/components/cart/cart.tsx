import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import ToastNotification from "../toast";
import {
  addToCartAPI,
  removeFromCartAPI,
  fetchCart,
  getItemCount,
} from "../../redux/slices/cartSlice.ts";
import type { RootState } from "../../redux/store.ts";
import "./cart.css";

const Cart = () => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const { carts } = useSelector((s: RootState) => s.cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const totalAmount = carts?.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  return (
    <div className="cart-container">
      <ToastNotification show={show} setShow={setShow} />

      {carts?.length === 0 ? (
        <div className="empty-cart">
          <h2>Your cart is empty</h2>
        </div>
      ) : (
        <>
          {carts.map(({ productId, name, price, imageUrl, quantity }) => (
            <div className="cart-item" key={productId}>
              <img src={imageUrl} alt={name} className="cart-item-img" />

              <div className="cart-item-details">
                <h5 className="cart-item-title">{name}</h5>
                <div className="cart-item-price">$ {price.toFixed(2)}</div>
                <div className="cart-item-quantity">
                  <button
                    onClick={() => {
                      dispatch(removeFromCartAPI(productId));
                      setShow(true);
                      dispatch(getItemCount());
                    }}
                  >
                    -
                  </button>
                  <span>{quantity}</span>
                  <button
                    onClick={() => {
                      dispatch(addToCartAPI(productId));
                      setShow(true);
                      dispatch(getItemCount());
                    }}
                  >
                    +
                  </button>
                </div>
                <div className="cart-item-total">
                  Total: $ {(price * quantity).toFixed(2)}
                </div>
              </div>
            </div>
          ))}

          <div className="cart-summary">
            <h4>
              Subtotal ({carts.length} items): $ {totalAmount?.toFixed(2)}
            </h4>
            <button className="checkout-btn">Proceed to Checkout</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
