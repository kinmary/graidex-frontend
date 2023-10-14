import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { Container, Spinner } from "react-bootstrap";

const Loader = () => {
  return (
    <Container fluid>
    <Spinner animation="border" variant="primary" />
    </Container>
     
  );
};

export default Loader;
