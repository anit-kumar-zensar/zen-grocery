import Table from "react-bootstrap/Table";
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

// interface CartProps {
//   _id?: string;
//   name: string;
//   price: number;
//   imageUrl: string;
//   quantity: number;
//   totalPrice: number;
//   productId: string;
// }
// interface CartItem {
//   cartItem: CartProps[];
// }
const Cart = () => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const { carts } = useSelector((s: RootState) => s.cart);

  console.log("Cart items from props:", carts);
  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  return (
    <>
      {carts?.length === 0 ? (
        <div className="container" style={{ marginTop: "20px" }}>
          <h2>Your cart is empty</h2>
        </div>
      ) : (
        <div className="container" style={{ marginTop: "20px" }}>
          <ToastNotification show={show} setShow={setShow} />
          <Table striped="columns">
            <thead>
              <tr>
                <th>Product Code </th>
                <th>Product Name</th>
                <th>Price Per Unit</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {carts?.map(({ name, price, imageUrl, quantity, productId }) => {
                return (
                  <tr key={productId}>
                    <td>{productId}</td>
                    <td>
                      <img
                        src={imageUrl}
                        alt={name}
                        width="100"
                        height="auto"
                      />{" "}
                      {name}
                    </td>
                    <td>{price}</td>
                    <td>
                      {quantity}{" "}
                      <span>
                        <button
                          onClick={() => {
                            dispatch(addToCartAPI(productId));
                            setShow(true);
                            dispatch(getItemCount());
                          }}
                        >
                          +
                        </button>{" "}
                        <button
                          onClick={() => {
                            dispatch(removeFromCartAPI(productId));
                            setShow(true);
                            dispatch(getItemCount());
                          }}
                        >
                          -
                        </button>
                      </span>
                    </td>
                    <td>{quantity * price}</td>
                  </tr>
                );
              })}
              <tr>
                <th
                  colSpan={5}
                  style={{ textAlign: "right", marginRight: "20px" }}
                >
                  Total Amount to pay:{" "}
                  {carts?.reduce((acc, item) => acc + item?.totalPrice, 0)}
                </th>
              </tr>
            </tbody>
          </Table>
        </div>
      )}
    </>
  );
};

export default Cart;
