import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Toggles2, CpuFill, Tools } from "react-bootstrap-icons";

const Features: React.FC = () => {
    return (
        <section className="feature-section">
            <Container className="px-3 py-2">
                <Row className="g-4 py-5">
                    <Col lg="4">
                        <div className="d-flex align-items-start">
                            <div className="icon-square text-body-emphasis bg-body-secondary d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
                                <Toggles2 height="1em" width="1em"></Toggles2>
                            </div>
                            <div>
                                <h3 className="fs-2 text-body-emphasis">Lorem Ipsum</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                            </div>
                        </div>
                    </Col>
                    <Col lg="4">
                        <div className="d-flex align-items-start">
                            <div className="icon-square text-body-emphasis bg-body-secondary d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
                                <CpuFill height="1em" width="1em"></CpuFill>
                            </div>
                            <div>
                                <h3 className="fs-2 text-body-emphasis">Lorem Ipsum</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                            </div>
                        </div>
                    </Col>
                    <Col lg="4">
                        <div className="d-flex align-items-start">
                            <div className="icon-square text-body-emphasis bg-body-secondary d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
                                <Tools height="1em" width="1em"></Tools>
                            </div>
                            <div>
                                <h3 className="fs-2 text-body-emphasis">Lorem Ipsum</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                            </div>
                        </div>
                    </Col> 
                </Row>
            </Container>
        </section>
    );
}

export default Features;