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
  const [title, setTitle] = useState("");

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
      <ToastNotification show={show} setShow={setShow} title={title} />
      {carts?.length === 0 ? (
        <div className="empty-cart">
          <h2>No items in your cart!</h2>
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
                      setTitle("Item removed from cart");
                    }}
                  >
                    -
                  </button>
                  <span>{quantity}</span>
                  <button
                    onClick={() => {
                      dispatch(addToCartAPI(productId));
                      dispatch(getItemCount());
                      if (quantity >= 9) {
                        setTitle("Maximum quantity reached for this item");
                        setShow(true);
                      } else {
                        setTitle("Item added to cart");
                        setShow(true);
                      }
                    }}
                    disabled={quantity >= 10} // Assuming max quantity is 10
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
