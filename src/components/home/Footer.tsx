import React from "react";
import { Col, Container } from "react-bootstrap";


const Footer: React.FC = () => {
    return (
        <section id="footer">
            <Container>
                <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-2">
                    <Col md="4" className="d-flex align-items-center">
                        <span className="mb-3 mb-md-0 text-body-secondary">
                            &copy; 2025 Kuantica.
                        </span>
                    </Col>
                </footer>
            </Container>
        </section>
    );
}

export default Footer;