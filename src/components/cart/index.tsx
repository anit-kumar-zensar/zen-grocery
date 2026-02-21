import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  addToCart,
  getItemCount,
  removeCart,
} from "../../redux/slices/productSlices";
import ToastNotification from "../toast";
import type { RootState } from "../../redux/store.ts";

const Cart = () => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const { cart } = useSelector((s: RootState) => s);

  return (
    <>
      {cart?.length === 0 ? (
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
              {cart?.map(({ name, id, price, imageUrl, quantity }) => {
                return (
                  <tr key={id}>
                    <td>{id}</td>
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
                            const product = cart.find((item) => item.id === id);
                            dispatch(addToCart(product));
                            setShow(true);
                            dispatch(getItemCount());
                          }}
                        >
                          +
                        </button>{" "}
                        <button
                          onClick={() => {
                            dispatch(removeCart(id));
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
                  {cart.reduce(
                    (acc, item) => acc + item.quantity * item.price,
                    0,
                  )}
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
