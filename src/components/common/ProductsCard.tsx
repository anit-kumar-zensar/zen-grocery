import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import CartIcon from "./CartIcon";
import { useDispatch } from "react-redux";
import { addToCart, getItemCount } from "../../redux/slices/productSlices";
import { Product } from "../../model/product";
import "./ProductsCard.css";

interface ProductCardProp {
  products: Product[];
  show: boolean;
  setShow: (arg: boolean) => void;
}

const ProductsCard = ({ products, setShow }: ProductCardProp) => {
  const dispatch = useDispatch();
  return (
    <Row xs={1} md={3} className="g-4">
      {products.map((product) => {
        const { id, name, price, category, imageUrl } = product;
        return (
          <Col key={id}>
            <Card className="card-shadow">
              <Card.Img variant="top" src={imageUrl} />
              <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Title>{category}</Card.Title>
                <Card.Text>$ {price}</Card.Text>
                <Button
                  onClick={() => {
                    dispatch(addToCart(product));
                    setShow(true);
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
