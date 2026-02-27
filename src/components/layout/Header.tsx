import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import CartIcon from "../common/CartIcon";
import { Badge } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { isCartPageOpen } from "../../redux/slices/cartSlice";
import type { RootState, AppDispatch } from "../../redux/store";

const Header = () => {
  const { itemCounts } = useSelector((s: RootState) => s.cart);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <Navbar
      expand="lg"
      bg="primary"
      data-bs-theme="dark"
      style={{
        position: "sticky",
        top: 0,
        right: 0,
        zIndex: 99,
        boxShadow: "rgba(0, 0, 0, 0.1) 0px 10px 50px",
      }}
    >
      <Container>
        <Navbar.Brand href="#home">Zen Grocery </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={() => dispatch(isCartPageOpen())}>Home</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text onClick={() => dispatch(isCartPageOpen())}>
            <CartIcon />
            <Badge bg="secondary">{itemCounts}</Badge>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
