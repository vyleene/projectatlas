import React, { useState } from 'react';
import { Badge, Button } from 'react-bootstrap';
import { PeopleFill } from 'react-bootstrap-icons';

import MobileAlertBar from '../components/dashboard/mobile/MobileAlertBar';
import MobileControls from '../components/dashboard/mobile/MobileControls';
import MobileHeatmap from '../components/dashboard/mobile/MobileHeatmap';

interface MobileDashboardProps {
    isResponderView: boolean;
}

const MobileDashboard: React.FC<MobileDashboardProps> = ({ isResponderView }) => {
    const [selectedReport, setSelectedReport] = useState<any>(null);
    const [isClosing, setIsClosing] = useState(false);

    const handleShowReportModal = (report: any) => {
        setIsClosing(false);
        setSelectedReport(report);
    };

    const handleCloseReportModal = () => {
        setIsClosing(true);
        setTimeout(() => {
            setSelectedReport(null);
        }, 400); // Match animation duration
    };

    return (
        <div className="mobile-dashboard-container">
            {/* The MobileHeatmap component now renders the entire map */}
            <MobileHeatmap />

            <div className="mobile-ui-overlay">
                <div className="mobile-ui-top">
                    <MobileAlertBar details="M6.4 Detected - Shaking near Manila - Updated 5 mins ago" />
                </div>

                {selectedReport && (
                    <div className={`report-detail-panel ${isClosing ? 'closing' : ''}`}>
                        <div className="report-detail-header">
                            <h6>Report Details</h6>
                            <Button variant="close" onClick={handleCloseReportModal} />
                        </div>
                        <div className="report-detail-body">
                            <div className="report-title-container">
                                <h4 className="report-main-title">{selectedReport.title}</h4>
                                <Badge pill bg="dark" className="people-affected-badge">
                                    <PeopleFill className="me-1" /> {selectedReport.peopleAffected}
                                </Badge>
                            </div>
                            <div className="report-stats-grid">
                                <div className="report-detail-item">
                                    <small>Category</small>
                                    <p>{selectedReport.category}</p>
                                </div>
                                <div className="report-detail-item">
                                    <small>Status</small>
                                    <p>{selectedReport.status}</p>
                                </div>
                                <div className="report-detail-item">
                                    <small>Priority</small>
                                    <p>{selectedReport.priority}</p>
                                </div>
                            </div>
                            <div className="report-detail-item">
                                <small>Description</small>
                                <p className="report-description-text">{selectedReport.description}</p>
                            </div>
                        </div>
                    </div>
                )}

                <div className="mobile-ui-bottom">
                    <MobileControls onReportClick={handleShowReportModal} isResponderView={isResponderView} />
                </div>
            </div>
        </div>
    );
};

export default MobileDashboard;