import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { getProducts } from "../../redux/slices/productSlices";
import Offcanvas from "react-bootstrap/Offcanvas";
import Button from "react-bootstrap/Button";
import "./FilterSidebar.css";
import { BASE_URL } from "../../constants/api";

const categories = [
  "grains",
  "groceries",
  "beverages",
  "essentials",
  "fruits",
  "vegetables",
  "dairy",
  "snacks",
];

const FilterSideBar = () => {
  const dispatch = useDispatch();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const handleToggle = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url = `${BASE_URL}/products`;

        if (selectedCategories.length > 0) {
          const query = selectedCategories.join(",");
          url += `?category=${encodeURIComponent(query)}`;
        }

        const response = await axios.get(url);
        dispatch(getProducts(response.data.products));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [dispatch, selectedCategories]);

  return (
    <>
      {/* Mobile toggle button */}
      <div className="filter-mobile-btn">
        <Button onClick={() => setShowOffcanvas(true)}>Filter</Button>
      </div>

      {/* Desktop Sidebar */}
      <div className="filter-sidebar desktop-sidebar">
        <h5 className="filter-title">Filter By Category</h5>
        <div className="filter-options">
          {categories.map((cat) => (
            <label key={cat} className="filter-label">
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat)}
                onChange={() => handleToggle(cat)}
              />
              <span className="filter-text">{cat.toUpperCase()}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Mobile Offcanvas */}
      <Offcanvas
        show={showOffcanvas}
        onHide={() => setShowOffcanvas(false)}
        placement="start"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Filter By Category</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="filter-options">
            {categories.map((cat) => (
              <label key={cat} className="filter-label">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat)}
                  onChange={() => handleToggle(cat)}
                />
                <span className="filter-text">{cat.toUpperCase()}</span>
              </label>
            ))}
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default FilterSideBar;
