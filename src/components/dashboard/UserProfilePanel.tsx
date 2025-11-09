import React from 'react';
import { Card, Badge, Button, Stack } from 'react-bootstrap';
import { PersonCircle, BoxArrowRight, GearFill } from 'react-bootstrap-icons';
import { mockUser } from './mockData';

const UserProfilePanel: React.FC = () => {
    return (
        <Card className="mb-4" style={{ backgroundColor: '#212121', boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)' }}>
            <Card.Body className="p-3">
                <div className="d-flex align-items-center mb-3">
                    <PersonCircle size={40} className="me-3 text-secondary" />
                    <div>
                        <h6 className="mb-0 d-flex align-items-center">
                            {mockUser.name}
                            <Badge bg="success" pill className="ms-2" style={{ fontSize: '0.6em' }}>
                                {mockUser.status}
                            </Badge>
                        </h6>
                        <small className="text-muted">{mockUser.role}</small>
                    </div>
                </div>
                <Stack direction="horizontal" gap={2}>
                    <Button variant="primary" size="sm" className="w-100 d-flex align-items-center justify-content-center">
                        <BoxArrowRight className="me-2" /> Log Out
                    </Button>
                    <Button variant="primary" size="sm">
                        <GearFill />
                    </Button>
                </Stack>
            </Card.Body>
        </Card>
    );
};

export default UserProfilePanel;