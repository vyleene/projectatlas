import React, { useState } from 'react';
import { Tabs, Tab, Button, ListGroup, Badge } from 'react-bootstrap';
import { ShieldCheck, ExclamationTriangle, HeartbreakFill, GeoAlt, FileText, People, Share, TelephoneFill, ChatTextFill } from 'react-bootstrap-icons';
import { mockUserReports } from '../mockData';

interface MobileControlsProps {
    onReportClick: (report: any) => void;
    isResponderView: boolean;
}

const MobileControls: React.FC<MobileControlsProps> = ({ onReportClick, isResponderView }) => {
    const mockContacts = [
        { id: 1, name: 'National Emergency Hotline', type: 'Emergency' },
        { id: 2, name: 'Local Police Department', type: 'Emergency' },
        { id: 3, name: 'City Fire Department', type: 'Emergency' },
        { id: 4, name: 'Jane Doe', type: 'Personal' },
        { id: 5, name: 'John Smith', type: 'Personal' },
        { id: 6, name: 'Maria Dela Cruz', type: 'Personal' },
        { id: 7, name: 'Local Hospital', type: 'Emergency' },
    ];
    const [showActions, setShowActions] = useState(false);

    const handleSosClick = () => {
        setShowActions(!showActions);
    };

    return (
        <div className="mobile-controls-pane">
            <Tabs defaultActiveKey="layers" id="mobile-controls-tabs" justify>
                <Tab eventKey="layers" title={<><GeoAlt size={14} /><small>Marker</small></>}>
                    <div className={`sos-button-container ${showActions ? 'actions-visible' : ''}`}>
                        <div className="sos-action-item action-top">
                            <small>Hazard</small>
                            <Button variant="warning" className="sos-action-btn">
                                <ExclamationTriangle size={14} />
                            </Button>
                        </div>
                        <div className="sos-action-item action-left">
                            <Button variant="success" className="sos-action-btn">
                                <ShieldCheck size={14} />
                            </Button>
                            <small>Safe</small>
                        </div>

                        <Button variant="danger" className="sos-main-btn" onClick={handleSosClick}>
                            SOS
                        </Button>

                        <div className="sos-action-item action-right">
                            <Button variant="danger" className="sos-action-btn">
                                <HeartbreakFill size={14} />
                            </Button>
                            <small>Injured</small>
                        </div>
                    </div>
                </Tab>
                {isResponderView && (
                    <Tab eventKey="reports" title={<><FileText size={14} /><small>Reports</small></>}>
                        <ListGroup variant="flush" className="reports-list">
                            {mockUserReports.map(report => (
                                <ListGroup.Item key={report.id} action onClick={() => onReportClick(report)}>
                                    <div className="d-flex w-100 justify-content-between">
                                        <h6 className="mb-1 report-title">{report.title}</h6>
                                        <small>{report.distance}</small>
                                    </div>
                                    <p className="mb-1 report-location">{report.location}</p>
                                    <div className="d-flex align-items-center">
                                        <Badge pill bg={
                                            report.priority === 'High' ? 'danger' :
                                            report.priority === 'Med' ? 'warning' : 'info'
                                        } className="me-2">{report.priority}</Badge>
                                        <Badge pill bg={report.category === 'Injury' ? 'danger' : 'secondary'} className="me-2">
                                            {report.category}
                                        </Badge>
                                    </div>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Tab>
                )}
                <Tab eventKey="contacts" title={<><People size={14} /><small>Contacts</small></>}>
                    <ListGroup variant="flush" className="contacts-list">
                        {mockContacts.map(contact => (
                            <ListGroup.Item key={contact.id}>
                                <span>{contact.name}</span>
                                <div className="contact-actions">
                                    <Button variant="success" size="sm" className="contact-btn">
                                        <TelephoneFill />
                                    </Button>
                                    <Button variant="primary" size="sm" className="contact-btn">
                                        <ChatTextFill />
                                    </Button>
                                </div>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Tab>
                <Tab eventKey="share" title={<><Share size={14} /><small>Share</small></>}></Tab>
            </Tabs>
        </div>
    );
};

export default MobileControls;