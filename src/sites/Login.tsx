import React from 'react';
import { Container, Row, Col, Form, Button, Card, InputGroup } from 'react-bootstrap';
import { PersonFill, LockFill } from 'react-bootstrap-icons';
import '../assets/styles/style.register.css';

const Login: React.FC = () => {
    return (
        <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh', backgroundColor: '#212121 !important' }}>
            <Container>
                <Row className="justify-content-center">
                    <Col md={8} lg={6} xl={5}>
                        <Card className="shadow border-0 bg-dark text-white">
                            <Card.Body className="p-5">
                                <div className="text-center mb-5">
                                    <h2 className="fw-bold mb-2">Sign In</h2>
                                    <p className="text-white-50">Welcome back to Atlas</p>
                                </div>
                                
                                <Form>
                                    <Form.Group className="mb-4" controlId="formUsername">
                                        <Form.Label>Username or Email</Form.Label>
                                        <InputGroup>
                                            <InputGroup.Text className="bg-dark border-secondary">
                                                <PersonFill className="text-white-50" />
                                            </InputGroup.Text>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter your username or email"
                                                className="py-2 bg-dark text-white border-secondary"
                                            />
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Group className="mb-4" controlId="formPassword">
                                        <div className="d-flex justify-content-between">
                                            <Form.Label>Password</Form.Label>
                                            <a href="#!" className="text-decoration-none text-primary small">Forgot password?</a>
                                        </div>
                                        <InputGroup>
                                            <InputGroup.Text className="bg-dark border-secondary">
                                                <LockFill className="text-white-50" />
                                            </InputGroup.Text>
                                            <Form.Control
                                                type="password"
                                                placeholder="Enter your password"
                                                className="py-2 bg-dark text-white border-secondary"
                                            />
                                        </InputGroup>
                                    </Form.Group>
                                    <Button variant="primary" type="submit" className="w-100 py-2 mt-4 mb-3 fw-bold" size="lg">
                                        Sign In
                                    </Button>
                                    
                                    <p className="text-center text-white-50 mb-0">
                                        Don't have an account? <a href="/register" className="text-decoration-none text-primary">Sign up</a>
                                    </p>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Login;