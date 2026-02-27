import { useSelector, useDispatch } from "react-redux";
import Card from "../components/common/ProductsCard";
import { useState, useEffect } from "react";
import ToastNotification from "../components/toast";
import Cart from "../components/cart";
import FilterSelection from "../components/common/FilterSelection";
import { fetchProducts } from "../redux/slices/productSlices";
import type { RootState, AppDispatch } from "../redux/store";
import "./Home.css";

const Home = () => {
  const [show, setShow] = useState(false);
  const { products, loading, error } = useSelector(
    (s: RootState) => s.products,
  );
  const { isCartPageOpen } = useSelector((s: RootState) => s.cart);

  const dispatch = useDispatch<AppDispatch>();

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
                <FilterSelection />
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
