import Offcanvas from "react-bootstrap/Offcanvas";
import Form from "react-bootstrap/Form";

interface FilterSideBarProp {
  handleShow: () => void;
  handleClose: () => void;
  show: boolean;
}

const FilterSideBar = ({ handleClose, show }: FilterSideBarProp) => {
  return (
    <Offcanvas show={show} onHide={handleClose}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Filter Groceries</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Form>
          {[
            "home-decoration",
            "groceries",
            "skincare",
            "fragrances",
            "laptops",
            "smartphones",
          ].map((item) => {
            return (
              <Form.Check
                key={item}
                type="switch"
                id="custom-switch"
                label={item.toUpperCase()}
              />
            );
          })}
        </Form>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default FilterSideBar;
