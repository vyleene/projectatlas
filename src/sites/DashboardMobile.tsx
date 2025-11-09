import React from 'react';
import MobileDashboard from './MobileDashboard';
import '../assets/styles/style.dashboard-mobile.css';

const DashboardMobile: React.FC = () => {
    return (
        <div className="mobile-simulation-container">
            <div className="mobile-device">
                <div className="mobile-device-notch">
                    <div className="mobile-device-camera"></div>
                </div>
                <div className="mobile-device-screen">
                    {/* The mobile-specific dashboard is rendered here */}
                    <MobileDashboard />
                </div>
            </div>
            <div className="simulation-note">
                This is a simulation of the mobile view. The dashboard layout has been adapted for a smaller screen.
            </div>
        </div>
    );
};

export default DashboardMobile;