import React from 'react';
import { Alert, Badge } from 'react-bootstrap';
import { ExclamationTriangleFill } from 'react-bootstrap-icons';

interface DashboardAlertBarProps {
    systemStatus: {
        liveFeed: boolean;
        systemSynced: boolean;
        satelliteConnected: boolean;
    };
}

const DashboardAlertBar: React.FC<DashboardAlertBarProps> = React.memo(({ systemStatus }) => {
    return (
        <Alert variant="danger" className="d-flex justify-content-between align-items-center dashboard-alert-bar">
            <div className="d-flex align-items-center">
                <ExclamationTriangleFill className="me-3" size={24} />
                <div>
                    <strong>URGENT EARTHQUAKE ALERT - M6.7 Detected Near Manila City</strong>
                    <span className="text-muted ms-2">(Shaking Detected 3.0 min ago)</span>
                </div>
            </div>
            <div className="d-flex gap-3">
                <Badge bg={systemStatus.liveFeed ? "success" : "danger"}>
                    LIVE FEED
                </Badge>
                <Badge bg={systemStatus.systemSynced ? "success" : "danger"}>
                    SYSTEM SYNC
                </Badge>
                <Badge bg={systemStatus.satelliteConnected ? "success" : "danger"}>
                    SATELLITE CONNECTED
                </Badge>
            </div>
        </Alert>
    );
});

export default DashboardAlertBar;
