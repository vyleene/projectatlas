import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

const Header: React.FC = () => {

    return (
        <section className='hero-section'>
            <div className='hero-background'></div>
            <div className='hero-overlay'></div>
            <Container className="hero-content">
                <Row className="gx-5 align-items-center">
                    <Col lg={6}>
                        <div className="mb-5 mb-lg-0 text-center text-lg-start">
                        <h1 className="display-1 lh-1 mb-3"><b>AlabID. <br />I love ID. <br /> We love it.</b></h1>
                        <Button variant="primary" size="lg" className="rounded-pill">
                            <span className="d-flex align-items-center">
                            <i className="bi-sliders me-2"></i>
                            <span className="small">Features</span>
                            </span>
                        </Button>
                        </div>
                    </Col>
                    <Col lg={6}>
                    </Col>
                </Row>
            </Container>
        </section>
  );
}

export default Header