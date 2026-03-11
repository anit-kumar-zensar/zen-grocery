import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import CartIcon from "./CartIcon";
import { useDispatch } from "react-redux";
import { addToCartAPI, getItemCount } from "../../redux/slices/cartSlice";
import { Product } from "../../model/product";
import { useState } from "react";
import type { AppDispatch } from "../../redux/store";
import "./ProductsCard.css";

interface ProductCardProp {
  products: Product[];
  show: boolean;
  setShow: (arg: boolean) => void;
}

const ProductsCard = ({ products, setShow }: ProductCardProp) => {
  const [addedProducts, setAddedProducts] = useState<string[]>([]);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <Row xs={1} md={3} className="g-4">
      {products?.map((product) => {
        const { _id, name, price, category, imageUrl } = product;
        return (
          <Col key={_id}>
            <Card className="zengrocery-card">
              <div className="zengrocery-img-wrapper">
                <Card.Img
                  variant="top"
                  src={imageUrl}
                  className="zengrocery-img"
                />
              </div>

              <Card.Body className="zengrocery-body">
                <Card.Title className="zengrocery-title">{name}</Card.Title>

                <div className="zengrocery-category">
                  {category.charAt(0).toUpperCase() +
                    category.substring(1).toLowerCase()}
                </div>

                <div className="zengrocery-rating">
                  ★★★★☆ <span className="rating-count">(124)</span>
                </div>

                <div className="zengrocery-price">
                  <span className="currency">$</span>
                  <span className="main-price">{Math.floor(price)}</span>
                  <span className="cents">
                    .{(price % 1).toFixed(2).split(".")[1] || "00"}
                  </span>
                </div>

                <div className="zengrocery-stock">In Stock</div>

                <Button
                  className="zengrocery-btn"
                  onClick={() => {
                    dispatch(addToCartAPI(_id));
                    setShow(true);
                    dispatch(getItemCount());
                    setAddedProducts((prev) => [...prev, _id]);
                    setTimeout(() => {
                      setAddedProducts((prev) =>
                        prev.filter((id) => id !== _id),
                      );
                    }, 2000);
                  }}
                >
                  {addedProducts?.includes(_id)
                    ? "Added to Cart"
                    : "Add to Cart"}{" "}
                  <CartIcon />
                </Button>
              </Card.Body>
            </Card>
          </Col>
        );
      })}
    </Row>
  );
};

export default ProductsCard;
