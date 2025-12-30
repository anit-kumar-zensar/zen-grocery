import { ToastContainer } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Toast from "react-bootstrap/Toast";

interface ToastNotificationProps {
  setShow: (arg: boolean) => void;
  show: boolean;
}

const ToastNotification = ({ setShow, show }: ToastNotificationProps) => {
  return (
    <div aria-live="polite" aria-atomic="true" className="position-relative">
      <ToastContainer className="p-3" position="top-end" style={{ zIndex: 1 }}>
        <Row>
          <Col xs={12}>
            <Toast
              onClose={() => setShow(false)}
              show={show}
              delay={1000}
              autohide
              bg={"Success".toLowerCase()}
            >
              <Toast.Header>
                <img
                  src="holder.js/20x20?text=%20"
                  className="rounded me-2"
                  alt=""
                />
                <strong className="me-auto">Product Added Successfully</strong>
              </Toast.Header>
              <Toast.Body>
                Woohoo, you're reading this text in a Toast!
              </Toast.Body>
            </Toast>
          </Col>
        </Row>
      </ToastContainer>
    </div>
  );
};

export default ToastNotification;
