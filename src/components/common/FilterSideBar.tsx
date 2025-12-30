import Offcanvas from "react-bootstrap/Offcanvas";

interface FilterSideBarProp {
  handleShow: () => void;
  handleClose: () => void;
  show: boolean;
}

const FilterSideBar = ({ handleClose, show }: FilterSideBarProp) => {
  return (
    <Offcanvas show={show} onHide={handleClose}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Responsive offcanvas</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <p className="mb-0">
          This is content within an <code>.offcanvas-lg</code>.
        </p>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default FilterSideBar;
