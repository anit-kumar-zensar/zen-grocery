import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import CartIcon from "../common/CartIcon";
import { Badge } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useState } from "react";
import Cart from "../cart";

const Header = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { itemCounts } = useSelector((s) => s);

  return (
    <div>
      <Navbar expand="lg" bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Zen Grocery </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text onClick={() => setIsCartOpen(!isCartOpen)}>
              <CartIcon />
              <Badge bg="secondary">{itemCounts}</Badge>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {isCartOpen && <Cart />}
    </div>
  );
};

export default Header;
