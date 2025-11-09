import Spline from "@splinetool/react-spline";
import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const PanelShowcase: React.FC = () => {
    return (
        <section className="panel-showcase-section">
            <Container>
                <Row>
                    <Col lg="9" className="mb-4 d-flex align-items-stretch">
                        <Spline scene="https://prod.spline.design/gWw78I00snGN5Rjw/scene.splinecode" />
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

export default PanelShowcase;