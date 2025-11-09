import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import MobileContent from '../components/dashboard/mobile/MobileContent';
import '../assets/styles/style.dashboard-mobile.css';

const DashboardMobile: React.FC = () => {
    const [isResponderView, setIsResponderView] = useState(true);

    return (
        <div className="mobile-simulation-container">
            <div className="mobile-device-wrapper">
                <div className="mobile-device">
                    <div className="mobile-device-notch">
                        <div className="mobile-device-camera"></div>
                    </div>
                    <div className="mobile-device-screen"> 
                        <MobileContent isResponderView={isResponderView} />
                    </div>
                </div>
            </div>
            <div className="view-toggle-switch">
                <Form.Check 
                    type="switch"
                    id="view-mode-switch"
                    label={isResponderView ? 'Responder View' : 'Citizen View'}
                    checked={isResponderView}
                    onChange={() => setIsResponderView(!isResponderView)}
                />
            </div>
        </div>
    );
};

export default DashboardMobile;