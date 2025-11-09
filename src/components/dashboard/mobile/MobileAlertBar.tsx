import React from 'react';
import { Alert } from 'react-bootstrap';
import { ExclamationTriangleFill } from 'react-bootstrap-icons';

interface MobileAlertBarProps {
    details: string; // This prop is from MobileDashboard.tsx
}

const MobileAlertBar: React.FC<MobileAlertBarProps> = ({ details }) => {
    return (
        <Alert variant="danger" className="mobile-alert-bar">
            <div className="d-flex align-items-center justify-content-center">
                <ExclamationTriangleFill className="me-2 alert-icon" />
                URGENT EARTHQUAKE ALERT: {details}
            </div>
        </Alert>
    );
};

export default MobileAlertBar;