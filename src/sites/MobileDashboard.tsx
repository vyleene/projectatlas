import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';

import MobileAlertBar from '../components/dashboard/mobile/MobileAlertBar';
import MobileControls from '../components/dashboard/mobile/MobileControls';
import MobileHeatmap from '../components/dashboard/mobile/MobileHeatmap';

const MobileDashboard: React.FC = () => {
    return (
        <div className="mobile-dashboard-container">
            <MapContainer
                center={[12.8797, 121.7740]}
                zoom={6}
                style={{ height: '100%', width: '100%' }}
                zoomControl={false} // Disable default zoom control for a cleaner look
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; OpenStreetMap contributors'
                />
                <MobileHeatmap />
            </MapContainer>

            <div className="mobile-ui-overlay">
                <div className="mobile-ui-top">
                    <MobileAlertBar details="M6.4 Detected - Shaking near Manila - Updated 5 mins ago" />
                </div>

                <div className="mobile-ui-bottom">
                    <MobileControls />
                </div>
            </div>
        </div>
    );
};

export default MobileDashboard;