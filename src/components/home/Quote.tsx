import React from "react";
import { Col, Container, Row } from "react-bootstrap";
const Quote: React.FC = () => {

    return (
        <section className="quote-section">
            <Container>
                <Row className="align-items-center justify-content-center">
                    <Col md={8}>
                        <blockquote className="blockquote text-center">
                            <h2 className="mb-0">Empowering communities with real-time seismic data and safety resources.</h2>
                        </blockquote>
                    </Col>
                </Row>
            </Container>
      </section>
    );
}

export default Quote;