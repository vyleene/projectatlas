import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import logo from "../../assets/images/alabid.png";

const Quote: React.FC = () => {
    return (
        <section className="quote-section">
            <Container>
                <Row className="align-items-center">
                    <Col md={4} className="text-center">
                        <img src={logo} height={200}></img>
                    </Col>
                    <Col md={8}>
                        <blockquote className="blockquote text-center">
                            <h3 className="mb-0">"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."</h3>
                        </blockquote>
                    </Col>
                </Row>
            </Container>
      </section>
    )
}

export default Quote