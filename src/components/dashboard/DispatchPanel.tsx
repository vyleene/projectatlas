import React, { useState, useMemo, useEffect } from 'react';
import { Card, Badge, ListGroup, Button, Modal, Form, InputGroup, Pagination } from 'react-bootstrap';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { mockDispatchers } from './mockData'; 
import leaflet from 'leaflet';
import { BroadcastPin, CheckCircleFill, SendFill, PauseCircleFill, ListUl, Search, PeopleFill, XCircle } from 'react-bootstrap-icons';

const statusMap: { [key: string]: { variant: string; label: string } } = {
    active: { variant: 'success', label: 'Active' },
    en_route: { variant: 'warning', label: 'En Route' },
    standby: { variant: 'info', label: 'Standby' },
};

const getStatusInfo = (status: string) => {
    return statusMap[status] || { variant: 'secondary', label: 'Unknown' };
};

const createPulsingIcon = (color: string) => {
    return leaflet.divIcon({
        className: 'custom-div-icon',
        html: `
      <div style="
        position: relative;
        width: 15px;
        height: 15px;
      ">
        <div style="
          position: absolute;
          width: 15px;
          height: 15px;
          background-color: ${color};
          border-radius: 50%;
          animation: pulse 1.5s infinite;
        "></div>
      </div>
    `,
        iconSize: [15, 15],
        iconAnchor: [7.5, 7.5]
    });
};

const DispatcherMarkers: React.FC = React.memo(() => {
    return (
        <>
            {mockDispatchers.map(dispatcher => {
                const markerColor = dispatcher.status === 'active' ? '#00ff00' :
                    dispatcher.status === 'en_route' ? '#ffaa00' : '#0088ff';
                return (
                    <Marker
                        key={dispatcher.id}
                        position={[dispatcher.location[0], dispatcher.location[1]]}
                        icon={createPulsingIcon(markerColor)}
                    >
                        <Popup className="custom-popup">{/* Note: .custom-popup styling is in a global css file */}</Popup>
                    </Marker>
                );
            })}
        </>
    );
});

const DispatchPanel: React.FC = React.memo(() => {
    const [showUnitStatusModal, setShowUnitStatusModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [modalActivePage, setModalActivePage] = useState(1);

    const handleCloseUnitStatusModal = () => setShowUnitStatusModal(false);
    const handleShowUnitStatusModal = () => setShowUnitStatusModal(true);

    const activeTeams = React.useMemo(() => mockDispatchers.filter(d => d.status === 'active').length, []);
    const enRouteTeams = React.useMemo(() => mockDispatchers.filter(d => d.status === 'en_route').length, []);
    const standbyTeams = React.useMemo(() => mockDispatchers.filter(d => d.status === 'standby').length, []);

    const filteredDispatchers = useMemo(() => 
        mockDispatchers.filter(dispatcher =>
            dispatcher.name.toLowerCase().includes(searchTerm.toLowerCase())
        ), [searchTerm]);

    useEffect(() => {
        setModalActivePage(1);
    }, [searchTerm]);

    const dispatchersPerPage = 5;
    const totalModalPages = Math.ceil(filteredDispatchers.length / dispatchersPerPage);
    const indexOfLastDispatcher = modalActivePage * dispatchersPerPage;
    const indexOfFirstDispatcher = indexOfLastDispatcher - dispatchersPerPage;
    const currentDispatchers = filteredDispatchers.slice(indexOfFirstDispatcher, indexOfLastDispatcher);


    return (
        <Card className="text-white mb-4" style={{ backgroundColor: '#212121', boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)' }}>
            <Card.Header className="border-0 d-flex justify-content-between align-items-center fw-bold">
                <span className="d-flex align-items-center"><BroadcastPin className="me-2" /> DISPATCH PANEL</span>
                <Badge bg="secondary" style={{ fontSize: '0.7em' }}>ACTIVE</Badge>
            </Card.Header>
            <Card.Body className="p-0">
                <div style={{ height: '150px', margin: '0.5rem' }}>
                    <MapContainer
                        center={[12.8797, 121.7740]}
                        zoom={5}
                        style={{ height: '100%', width: '100%' }}
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; OpenStreetMap contributors'
                        />
                        <DispatcherMarkers />
                    </MapContainer>
                </div>

                <ListGroup variant="flush">
                    <ListGroup.Item className="text-white" style={{ backgroundColor: '#212121' }}>
                        <small className="text-muted d-block mb-2">TEAM STATUS</small>
                        <div className="d-flex justify-content-between mb-1">
                            <span className="d-flex align-items-center"><CheckCircleFill className="text-success me-2" /> Active Teams</span>
                            <Badge bg="success" pill>
                                {activeTeams}
                            </Badge>
                        </div>
                        <div className="d-flex justify-content-between mb-1">
                            <span className="d-flex align-items-center"><SendFill className="text-warning me-2" /> En Route</span>
                            <Badge bg="warning" pill>
                                {enRouteTeams}
                            </Badge>
                        </div>
                        <div className="d-flex justify-content-between">
                            <span className="d-flex align-items-center"><PauseCircleFill className="text-info me-2" /> Standby</span>
                            <Badge bg="info" pill>
                                {standbyTeams}
                            </Badge>
                        </div>
                    </ListGroup.Item>
                </ListGroup>
                <Card.Footer className="border-0 p-2">
                    <Button variant="primary" size="sm" className="w-100 d-flex align-items-center justify-content-center" onClick={handleShowUnitStatusModal}>
                        <ListUl className="me-2" /> View All Unit Statuses
                    </Button>
                </Card.Footer>
            </Card.Body>

            <Modal show={showUnitStatusModal} onHide={handleCloseUnitStatusModal} centered>
                <Modal.Header closeButton closeVariant="white" className="border-0 text-white" style={{ backgroundColor: '#212121' }} >
                    <Modal.Title as="h6" className="flex-grow-1">All Unit Statuses</Modal.Title>
                    <InputGroup size="sm" style={{ width: '180px' }}>
                        <InputGroup.Text className="page-input border-end-0"><Search /></InputGroup.Text>
                        <Form.Control
                            placeholder="Search units..."
                            className="page-input border-start-0"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </InputGroup>
                </Modal.Header>
                <Modal.Body className="text-white p-0" style={{ backgroundColor: '#212121' }}>
                    <ListGroup variant="flush">
                        {currentDispatchers.map(dispatcher => (
                            <ListGroup.Item key={dispatcher.id} className="d-flex justify-content-between align-items-center text-white" style={{ backgroundColor: 'transparent' }}> 
                                <div>
                                    <span className="fw-bold">{dispatcher.name}</span>
                                    <br />
                                    <small className="text-muted">{dispatcher.sector || 'N/A'}</small>
                                </div>
                                <div className="d-flex align-items-center">
                                    <small className="text-muted me-3 d-flex align-items-center"><PeopleFill className="me-1" /> {dispatcher.personnel}</small>
                                    <Badge bg={getStatusInfo(dispatcher.status).variant} pill style={{ width: '70px' }}>
                                        {getStatusInfo(dispatcher.status).label}
                                    </Badge>
                                </div>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Modal.Body>
                <Modal.Footer className="border-0 d-flex justify-content-between align-items-center" style={{ backgroundColor: '#212121' }}>
                    <Button variant="primary" size="sm" onClick={handleCloseUnitStatusModal} className="d-flex align-items-center">
                        <XCircle className="me-2" /> Close
                    </Button>
                    {totalModalPages > 1 && (
                        <Pagination size="sm" className="mb-0 custom-pagination">
                            <Pagination.Prev onClick={() => setModalActivePage(modalActivePage - 1)} disabled={modalActivePage === 1} />
                            <Pagination.Item active>{modalActivePage}</Pagination.Item>
                            <Pagination.Next onClick={() => setModalActivePage(modalActivePage + 1)} disabled={modalActivePage === totalModalPages} />
                        </Pagination>
                    )}
                    <small className="text-muted" style={{ minWidth: '80px', textAlign: 'right' }}>
                        Page {modalActivePage} of {totalModalPages}
                    </small>
                </Modal.Footer>
            </Modal>
        </Card>
    );
});

export default DispatchPanel;
