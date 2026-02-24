import Offcanvas from "react-bootstrap/Offcanvas";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { getProducts } from "../../redux/slices/productSlices";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

interface FilterSideBarProp {
  handleShow: () => void;
  handleClose: () => void;
  show: boolean;
}
const categories = [
  "home-decoration",
  "groceries",
  "skincare",
  "fragrances",
  "laptops",
  "smartphones",
];

const FilterSideBar = ({ handleClose, show }: FilterSideBarProp) => {
  const dispatch = useDispatch();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Handle toggle switch
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
        let url = "http://localhost:4000/api/products"; // API Gateway
        if (selectedCategories.length === 1) {
          // Only send query if exactly one category selected
          url += `?category=${selectedCategories[0]}`;
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
    <Offcanvas show={show} onHide={handleClose}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Filter Groceries</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Form>
          {categories.map((item) => (
            <Form.Check
              key={item}
              type="switch"
              id={`switch-${item}`}
              label={item.toUpperCase()}
              checked={selectedCategories.includes(item)}
              onChange={() => handleToggle(item)}
            />
          ))}
        </Form>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default FilterSideBar;
