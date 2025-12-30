import { useSelector } from "react-redux";
import Card from "../components/common/ProductsCard";
import { useState } from "react";
import ToastNotification from "../components/toast";
import Cart from "../components/cart";
import FilterIcon from "../components/common/FilterIcon";

const Home = () => {
  const [show, setShow] = useState(false);
  const [openFilterBar, setOpenFilterBar] = useState(false);
  const { products, isCartPageOpen } = useSelector((s) => s);

  const handleClose = () => setOpenFilterBar(false);
  const handleShow = () => setOpenFilterBar(true);

  return (
    <div className="container" style={{ marginTop: "20px" }}>
      <ToastNotification show={show} setShow={setShow} />
      <div className="filter-container">
        <FilterIcon
          show={openFilterBar}
          handleClose={handleClose}
          handleShow={handleShow}
        />
      </div>

      {isCartPageOpen ? (
        <Cart />
      ) : (
        <Card products={products} show={show} setShow={setShow} />
      )}
    </div>
  );
};

export default Home;
