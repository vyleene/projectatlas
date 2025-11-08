import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Navigation: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrolled = window.scrollY > 10;
            setIsScrolled(scrolled);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <Navbar 
            expand="lg" 
            fixed="top" 
            className="shadow-sm"
            style={{
                backgroundColor: isScrolled ? 'rgba(33, 33, 33, 0.7)' : 'rgba(255, 255, 255, 0)',
                transition: 'background-color 0.3s ease-in-out',
                backdropFilter: 'blur(10px)'
            }}
        >
            <Container className="px-5">
                <Navbar.Brand as={Link} to="/" className="fw-bold">Project Atlas.</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarResponsive" />
                <Navbar.Collapse id="navbarResponsive">
                <Nav className="ms-auto me-4 my-3 my-lg-0">
                    <Nav.Link as={Link} to="/" className="me-lg-3">Home</Nav.Link>
                    <Nav.Link as={Link} to="/dashboard" className="me-lg-3">Dashboard</Nav.Link>
                </Nav>
                <div className="d-flex gap-2">
                    <Link to="/login" className="text-decoration-none">
                        <Button variant="outline-light" className="rounded-pill px-3 mb-2 mb-lg-0">
                            Login
                        </Button>
                    </Link>
                    <Link to="/register" className="text-decoration-none">
                        <Button variant="primary" className="rounded-pill px-3 mb-2 mb-lg-0">
                            Register
                        </Button>
                    </Link>
                </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navigation