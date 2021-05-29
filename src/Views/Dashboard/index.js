import { useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import Navbar from "../../Components/Header";
import Timer from "../../Components/Timer";

const Dashboard = () => {
  useEffect(() => {

  }, []);
  return (
    <>
      <Navbar />
      <Container style={{
        height: 360
      }}>
        <Row>
          <Timer />
        </Row>
      </Container>
    </>
  );
}

export default Dashboard;
