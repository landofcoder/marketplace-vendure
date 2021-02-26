import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
const BreadcrumbOne = ({ children, backgroundImage, pageTitle, className }) => {
  return (
    <div>
      <Container fluid className="m-0 p-0" style={{overflowX: 'hidden'}}>
        <Row>
          <Col>
            <Image src={process.env.PUBLIC_URL + backgroundImage} fluid />
          </Col>
        </Row>
      </Container>
      <div style={{
        backgroundColor: "#6dcdef",
        paddingBottom: "10px"
      }}>
        <Container>
          <Row className="text-center">
            <Col>
              <h1 className="breadcrumb__title m-0 p-0 text-white">{pageTitle}</h1>
              {children}
            </Col>
          </Row>
      </Container>
      </div>
    </div>
  );
};

export default BreadcrumbOne;
