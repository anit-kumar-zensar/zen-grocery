import { useSelector, useDispatch } from "react-redux";
import Card from "../components/common/ProductsCard";
import { useState, useEffect } from "react";
import ToastNotification from "../components/toast";
import Cart from "../components/cart/cart";
import FilterIcon from "../components/common/FilterIcon";
import { fetchProducts } from "../redux/slices/productSlices";
import { fetchCart } from "../redux/slices/cartSlice";

const Home = () => {
  const [show, setShow] = useState(false);
  const [openFilterBar, setOpenFilterBar] = useState(false);
  const { products, loading, error } = useSelector((s) => s.products);
  const { isCartPageOpen } = useSelector((s) => s.cart);

  const dispatch = useDispatch();

  const handleClose = () => setOpenFilterBar(false);
  const handleShow = () => setOpenFilterBar(true);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCart());
  }, [dispatch]);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container" style={{ marginTop: "20px" }}>
      <ToastNotification
        show={show}
        setShow={setShow}
        title="Product Added Successfully"
        msg=" Woohoo, you're reading this text in a Toast!"
      />
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
