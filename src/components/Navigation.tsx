import React from "react";
import { Navbar, Nav, Container, Button } from 'react-bootstrap';

const Navigation: React.FC = () => {
    return (
        <Navbar expand="lg" fixed="top" className="shadow-sm">
            <Container className="px-5">
                <Navbar.Brand href="#page-top" className="fw-bold">Project Atlas.</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarResponsive" />
                <Navbar.Collapse id="navbarResponsive">
                <Nav className="ms-auto me-4 my-3 my-lg-0">
                    <Nav.Link href="#features" className="me-lg-3">Features</Nav.Link>
                    <Nav.Link href="#designs" className="me-lg-3">Designs</Nav.Link>
                </Nav>
                <Button variant="primary" className="rounded-pill px-3 mb-2 mb-lg-0">
                    <span className="d-flex align-items-center">
                    <i className="bi-chat-text-fill me-2"></i>
                    <span className="small">Send Feedback</span>
                    </span>
                </Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navigation