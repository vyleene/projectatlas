import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import { ClockHistory } from 'react-bootstrap-icons';

const mockEvents = [
    { id: 1, time: '14:38', description: 'User report of building collapse at [Location].' },
    { id: 2, time: '14:35', description: 'Rescue Team Alpha dispatched to Sector 4.' },
    { id: 3, time: '14:33', description: 'Multiple user reports of shaking in Manila City.' },
    { id: 4, time: '14:32', description: 'System Alert: M6.7 Earthquake Detected.' },
    { id: 5, time: '14:30', description: 'System initialized. Monitoring started.' },
];

const EventLogPanel: React.FC = () => {
    return (
        <Card className="bg-dark-tertiary border-secondary mt-4">
            <Card.Header className="border-secondary d-flex align-items-center">
                <ClockHistory className="me-2" />
                <Card.Title as="h6" className="mb-0">Event Log</Card.Title>
            </Card.Header>
            <Card.Body style={{ maxHeight: '250px', overflowY: 'auto' }} className="p-0">
                <ListGroup variant="flush">
                    {mockEvents.map(event => (
                        <ListGroup.Item 
                            key={event.id} 
                            className="bg-dark-tertiary text-white border-secondary"
                            style={{ fontSize: '0.85rem' }}
                        >
                            <strong>{event.time}</strong> - {event.description}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Card.Body>
        </Card>
    );
};

export default EventLogPanel;