import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { getProducts } from "../../redux/slices/productSlices";
import { BASE_URL } from "../../constants/api";
import axios from "axios";
import "./FilterSelection.css";

const categories = [
  "home-decoration",
  "groceries",
  "skincare",
  "fragrances",
  "laptops",
  "smartphones",
  "Fruits",
  "Vegetables",
  "Dairy",
  "Snacks",
];

const FilterSideBar = () => {
  const dispatch = useDispatch();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  };

  const handleSelectAll = () => {
    if (selectedCategories.length === categories.length) {
      setSelectedCategories([]);
    } else {
      setSelectedCategories(categories);
    }
  };

  const handleClear = () => {
    setSelectedCategories([]);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="custom-multiselect" ref={dropdownRef}>
      <div
        className="select-header"
        tabIndex={0}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            setIsOpen(!isOpen);
          }
          if (e.key === "Escape") setIsOpen(false);
        }}
      >
        <div className="selected-tags">
          {selectedCategories.length === 0 && (
            <span className="placeholder" style={{ backgroundColor: "#fff" }}>
              Select Categories
            </span>
          )}

          {selectedCategories.map((cat) => (
            <span key={cat} className="tag">
              {cat}
              <span
                className="remove-tag"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleCategory(cat);
                }}
              >
                ×
              </span>
            </span>
          ))}
        </div>

        <span className={`arrow ${isOpen ? "open" : ""}`}>▾</span>
      </div>

      <div className={`select-dropdown ${isOpen ? "open" : ""}`}>
        <div className="dropdown-controls">
          <button onClick={handleSelectAll}>
            {selectedCategories.length === categories.length
              ? "Unselect All"
              : "Select All"}
          </button>
          <button onClick={handleClear}>Clear</button>
        </div>

        {categories.map((cat) => (
          <div
            key={cat}
            className="dropdown-option"
            tabIndex={0}
            onClick={() => toggleCategory(cat)}
            onKeyDown={(e) => {
              if (e.key === "Enter") toggleCategory(cat);
            }}
          >
            <span
              className={`checkbox ${
                selectedCategories.includes(cat) ? "checked" : ""
              }`}
            >
              ✓
            </span>
            {cat}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterSideBar;
