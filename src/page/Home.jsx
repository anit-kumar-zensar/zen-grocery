import { useSelector, useDispatch } from "react-redux";
import Card from "../components/common/ProductsCard";
import { useState, useEffect } from "react";
import ToastNotification from "../components/toast";
import Cart from "../components/cart/";
import FilterIcon from "../components/common/FilterSideBar";
import { fetchProducts } from "../redux/slices/productSlices";
import "./Home.css";

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
  }, [dispatch]);

  return (
    <>
      <div className={loading || error ? "products-status" : ""}>
        {loading && (
          <div className="status-box loading">
            <div className="spinner"></div>
            <span>Loading products...</span>
          </div>
        )}
        {error && (
          <div className="status-box error">
            <span>Error: {error}</span>
          </div>
        )}
      </div>
      <div className="container" style={{ marginTop: "20px" }}>
        <ToastNotification
          show={show}
          setShow={setShow}
          title="Product Added Successfully"
        />

        {isCartPageOpen ? (
          <Cart />
        ) : (
          <>
            {(!loading || !error) && (
              <div className="products-page">
                <FilterIcon
                  show={openFilterBar}
                  handleClose={handleClose}
                  handleShow={handleShow}
                />
              </div>
            )}

            <div className="products-grid">
              <Card products={products} show={show} setShow={setShow} />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Home;
