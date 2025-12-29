import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import CartIcon from "./CartIcon";
import { useDispatch } from "react-redux";
import Image from "react-bootstrap/Image";
import { addToCart, getItemCount } from "../../redux/slices/productSlices";

const ProductsCard = ({ products }) => {
  const dispatch = useDispatch();

  return (
    <Row xs={1} md={3} className="g-4">
      {products.map((product) => {
        const { id, title, price, category, thumbnail, description } = product;
        return (
          <Col key={id}>
            <Card>
              <Card.Img variant="top" src="holder.js/171x180" />
              <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>{description}</Card.Text>
                <Button
                  onClick={() => {
                    dispatch(addToCart(product));
                    dispatch(getItemCount());
                  }}
                >
                  Add <CartIcon />
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
