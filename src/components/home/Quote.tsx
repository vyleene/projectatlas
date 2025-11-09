import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const Quote: React.FC = () => {
    return (
        <section className="quote-section">
            <Container>
                <Row className="justify-content-center">
                    <Col md={10} lg={8}>
                        <blockquote className="blockquote text-center">
                            <p className="fs-4 fw-light mb-0">
                                "Project Atlas transforms every phone into a seismic sensor and every citizen into a vital part of the emergency response network."
                            </p>
                        </blockquote>
                    </Col>
                </Row>
            </Container>
      </section>
    )
}

export default Quote;