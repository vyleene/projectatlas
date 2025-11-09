import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, InputGroup, Modal, Toast } from 'react-bootstrap';
import { EnvelopeFill, PhoneFill, PersonFill, LockFill, GeoAltFill, CameraFill, GeoFill } from 'react-bootstrap-icons';
import leaflet from 'leaflet';

import '../../assets/styles/style.register.css';
import LocationSelector from './LocationSelector';

// Configure Leaflet's default icon paths
delete (leaflet.Icon.Default.prototype as any)._getIconUrl;
leaflet.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const Register: React.FC = () => {
    const [validated, setValidated] = useState(false);
    const [showMap, setShowMap] = useState(false);
    const [showPermissionToast, setShowPermissionToast] = useState(false);

    const [formData, setFormData] = useState({
        email: '',
        phone: '',
        username: '',
        password: '',
        photo: null as File | null,
        hometown: ''
    });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            console.log('Form data:', formData);
        }

        setValidated(true);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, files } = event.target;
        
        if (name === 'photo' && files) {
            setFormData(prev => ({
                ...prev,
                [name]: files[0]
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const checkLocationPermission = () => {
        if (!('geolocation' in navigator)) {
            setShowPermissionToast(true);
            return false;
        }

        return new Promise<boolean>((resolve) => {
            navigator.permissions.query({ name: 'geolocation' }).then((result) => {
                if (result.state === 'granted') {
                    resolve(true);
                } else if (result.state === 'prompt') {
                    navigator.geolocation.getCurrentPosition(
                        () => resolve(true),
                        () => {
                            setShowPermissionToast(true);
                            resolve(false);
                        }
                    );
                } else {
                    setShowPermissionToast(true);
                    resolve(false);
                }
            });
        });
    };

    const handleMapOpen = async () => {
        const hasPermission = await checkLocationPermission();
        if (hasPermission) {
            setShowMap(true);
        }
    };

    return (
        <Container className="py-4">
            <Row className="justify-content-center">
                <Col md={8} lg={6}>
                    <Card className="shadow border-0 bg-dark text-white">
                        <Card.Body className="p-5">
                            <div className="text-center mb-5">
                                <h2 className="fw-bold mb-2">Create an Account</h2>
                            </div>
                            
                            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                <Form.Group className="mb-4" controlId="formEmail">
                                    <Form.Label>Email Address <span className="text-danger">*</span></Form.Label>
                                    <InputGroup hasValidation>
                                        <InputGroup.Text className="bg-dark border-secondary">
                                            <EnvelopeFill className="text-white-50" />
                                        </InputGroup.Text>
                                        <Form.Control
                                            required
                                            type="email"
                                            name="email"
                                            placeholder="name@example.com"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="py-2 bg-dark text-white border-secondary"
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a valid email address.
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>

                                <Form.Group className="mb-4" controlId="formPhone">
                                    <Form.Label>Phone Number <span className="text-danger">*</span></Form.Label>
                                    <InputGroup hasValidation>
                                        <InputGroup.Text className="bg-dark border-secondary">
                                            <PhoneFill className="text-white-50" />
                                        </InputGroup.Text>
                                        <InputGroup.Text className="bg-dark border-secondary">+63</InputGroup.Text>
                                        <Form.Control
                                            required
                                            type="tel"
                                            name="phone"
                                            placeholder="9XX XXX XXXX"
                                            pattern="[0-9]{10}"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="py-2 bg-dark text-white border-secondary"
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a valid 10-digit phone number.
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>

                                <Row className="mb-4">
                                    <Col md={6}>
                                        <Form.Group controlId="formUsername">
                                            <Form.Label>Username <span className="text-danger">*</span></Form.Label>
                                            <InputGroup hasValidation>
                                                <InputGroup.Text className="bg-dark border-secondary">
                                                    <PersonFill className="text-white-50" />
                                                </InputGroup.Text>
                                                <Form.Control
                                                    required
                                                    type="text"
                                                    name="username"
                                                    placeholder="Choose a username"
                                                    value={formData.username}
                                                    onChange={handleChange}
                                                    pattern=".{3,}"
                                                    className="py-2 bg-dark text-white border-secondary"
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    Username must be at least 3 characters long.
                                                </Form.Control.Feedback>
                                            </InputGroup>
                                            <Form.Text className="text-muted">
                                                Used for signing in
                                            </Form.Text>
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group controlId="formPassword">
                                            <Form.Label>Password <span className="text-danger">*</span></Form.Label>
                                            <InputGroup hasValidation>
                                                <InputGroup.Text className="bg-dark border-secondary">
                                                    <LockFill className="text-white-50" />
                                                </InputGroup.Text>
                                                <Form.Control
                                                    required
                                                    type="password"
                                                    name="password"
                                                    placeholder="Create a password"
                                                    value={formData.password}
                                                    onChange={handleChange}
                                                    pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
                                                    className="py-2 bg-dark text-white border-secondary"
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    Password must be at least 8 characters with letters and numbers.
                                                </Form.Control.Feedback>
                                            </InputGroup>
                                            <Form.Text className="text-muted">
                                                Min. 8 characters with letters & numbers
                                            </Form.Text>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Form.Group className="mb-4" controlId="formPhoto">
                                    <Form.Label className="d-block">Profile Photo</Form.Label>
                                    <Card className="bg-dark border-secondary">
                                        <Card.Body className="p-3">
                                            <div className="d-flex align-items-center">
                                                <CameraFill className="text-white-50 me-3" size={24} />
                                                <div className="flex-grow-1">
                                                    <Form.Control
                                                        type="file"
                                                        name="photo"
                                                        accept="image/*"
                                                        onChange={handleChange}
                                                        className="form-control-sm bg-dark text-white border-secondary"
                                                    />
                                                    <Form.Text className="text-muted d-block">
                                                        Optional: Upload a profile photo (max 5MB)
                                                    </Form.Text>
                                                </div>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Form.Group>

                                <Form.Group className="mb-4" controlId="formHometown">
                                    <Form.Label>Hometown Location</Form.Label>
                                    <InputGroup>
                                        <InputGroup.Text className="bg-dark border-secondary">
                                            <GeoAltFill className="text-white-50" />
                                        </InputGroup.Text>
                                        <Form.Control
                                            type="text"
                                            name="hometown"
                                            placeholder="Select location on map"
                                            value={formData.hometown}
                                            onChange={handleChange}
                                            onClick={handleMapOpen}
                                            className="py-2 bg-dark text-white border-secondary"
                                            readOnly
                                        />
                                        <Button 
                                            variant="outline-secondary"
                                            onClick={handleMapOpen}
                                            className="bg-dark border-secondary text-white"
                                        >
                                            Select on Map
                                        </Button>
                                    </InputGroup>
                                </Form.Group>

                                <Toast 
                                    show={showPermissionToast} 
                                    onClose={() => setShowPermissionToast(false)}
                                    className="position-fixed top-0 end-0 m-3"
                                    style={{ zIndex: 1100 }}
                                >
                                    <Toast.Header className="bg-dark text-white border-secondary">
                                        <GeoFill className="me-2" />
                                        <strong className="me-auto">Location Permission Required</strong>
                                    </Toast.Header>
                                    <Toast.Body className="bg-dark text-white border-secondary">
                                        Please enable location services in your browser to use the map feature.
                                    </Toast.Body>
                                </Toast>

                                <Modal 
                                    show={showMap} 
                                    onHide={() => setShowMap(false)}
                                    size="lg"
                                    centered
                                >
                                    <Modal.Header closeButton className="bg-dark text-white border-secondary">
                                        <Modal.Title>Select Your Hometown Location</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body className="bg-dark p-0">
                                        <LocationSelector
                                            onLocationSelect={(lat, lng) => {
                                                fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`)
                                                    .then(res => res.json())
                                                    .then(data => {
                                                        const locationName = data.display_name.split(',').slice(0, 3).join(',');
                                                        setFormData(prev => ({
                                                            ...prev,
                                                            hometown: locationName
                                                        }));
                                                        setShowMap(false);
                                                    })
                                                    .catch(error => {
                                                        console.error('Error fetching location name:', error);
                                                        setShowMap(false);
                                                    });
                                            }}
                                        />
                                    </Modal.Body>
                                </Modal>

                                <Button 
                                    variant="primary" 
                                    type="submit" 
                                    className="w-100 py-2 mt-4 mb-3 fw-bold"
                                    size="lg"
                                >
                                    Create Account
                                </Button>
                                
                                <p className="text-center text-white-50 mb-0">
                                    Already have an account? <a href="/login" className="text-decoration-none text-primary">Sign in</a>
                                </p>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Register;