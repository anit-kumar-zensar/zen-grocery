import Table from "react-bootstrap/Table";
import { useSelector } from "react-redux";

const Cart = () => {
  const { cart } = useSelector((s) => s);
  console.log("cart", cart);
  return (
    <div className="container" style={{ marginTop: "20px" }}>
      <Table striped="columns">
        <thead>
          <tr>
            <th>#</th>
            <th>Product Name</th>
            <th>Price Per Unit</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <td>3</td>
            <td colSpan={2}>Larry the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default Cart;
