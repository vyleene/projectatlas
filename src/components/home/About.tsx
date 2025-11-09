import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Toggles2, CpuFill, Tools } from "react-bootstrap-icons";

const About: React.FC = () => {
    return (
        <section className="about-section">
            <Container className="px-4 py-5">

                <Row className="justify-content-center text-center">
                    <Col lg="10" className="mb-5">
                        <h2 className="display-4 fw-bold text-white">About Project Atlas</h2>
                        <p className="lead text-white-75 mx-auto" style={{ maxWidth: '800px' }}> 
                            Project Atlas, developed by Team Kuantica, is an earthquake-monitoring application designed to improve earthquake response and awareness. By leveraging crowdsourced shaking reports and dynamic heatmap visualizations, we aim to empower citizens and government first-responders with real-time situational awareness.
                        </p>
                    </Col>
                </Row>

                <Row className="g-5 py-5">
                    <Col lg="4">
                        <div className="text-center text-white">
                            <Toggles2 className="text-white mb-3" size={60} />
                            <h3 className="fw-bold mb-3 fs-4">Real-Time Citizen Sensing</h3>
                            <p className="text-white-50"> 
                                Our app transforms the population into a sensor network, using crowdsourced reports and GPS data for a high-fidelity view of an earthquake's impact.
                            </p>
                        </div>
                    </Col>
                    <Col lg="4">
                        <div className="text-center text-white">
                            <CpuFill className="text-white mb-3" size={60} />
                            <h3 className="fw-bold mb-3 fs-4">Live Human Impact Map</h3>
                            <p className="text-white-50"> 
                                Our dynamic heatmap visualizes real-time reports, allowing first responders to see where the human impact is greatest for a faster, more precise response.
                            </p>
                        </div>
                    </Col>
                    <Col lg="4">
                        <div className="text-center text-white">
                            <Tools className="text-white mb-3" size={60} />
                            <h3 className="fw-bold mb-3 fs-4">Unified Command & Response</h3>
                            <p className="text-white-50"> 
                                By integrating data into a single platform, we ensure all agencies and NGOs have access to the same information for effective, real-time collaboration.
                            </p>
                        </div>
                    </Col> 
                </Row>
            </Container>
        </section>
    );
}

export default About;