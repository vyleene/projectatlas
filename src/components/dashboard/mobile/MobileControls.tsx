import React from 'react';
import { Tabs, Tab, Button } from 'react-bootstrap';
import { ShieldCheck, ExclamationTriangle, HeartbreakFill, Layers, FileText, People, Share } from 'react-bootstrap-icons';

const MobileControls: React.FC = () => {
    return (
        <div className="mobile-controls-pane">
            <Tabs defaultActiveKey="layers" id="mobile-controls-tabs" justify>
                <Tab eventKey="layers" title={<><Layers size={14} /><small>Map Layers</small></>}>
                    <div className="sos-button-container">
                        <div className="sos-satellite-item satellite-top">
                            <small>Hazard</small>
                            <Button variant="warning" className="sos-satellite-btn">
                                <ExclamationTriangle size={14} />
                            </Button>
                        </div>
                        <div className="sos-satellite-item satellite-left">
                            <Button variant="success" className="sos-satellite-btn">
                                <ShieldCheck size={14} />
                            </Button>
                            <small>Safe</small>
                        </div>

                        <Button variant="danger" className="sos-main-btn">
                            SOS
                        </Button>

                        <div className="sos-satellite-item satellite-right">
                            <Button variant="danger" className="sos-satellite-btn">
                                <HeartbreakFill size={14} />
                            </Button>
                            <small>Injured</small>
                        </div>
                    </div>
                </Tab>
                <Tab eventKey="reports" title={<><FileText size={14} /><small>Reports</small></>}>
                    <div className="p-3 text-center text-white-50">Reports content will go here.</div>
                </Tab>
                <Tab eventKey="contacts" title={<><People size={14} /><small>Contacts</small></>}>
                    <div className="p-3 text-center text-white-50">Contacts content will go here.</div>
                </Tab>
                <Tab eventKey="share" title={<><Share size={14} /><small>Share</small></>}>
                    <div className="p-3 text-center text-white-50">Share content will go here.</div>
                </Tab>
            </Tabs>
        </div>
    );
};

export default MobileControls;