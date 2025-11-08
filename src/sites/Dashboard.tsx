import React, { useState, useCallback, Suspense } from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import 'leaflet/dist/leaflet.css';
import '../assets/styles/style.dashboard.css';

import UserReportsFeed from '../components/dashboard/UserReportsFeed';
import DispatchPanel from '../components/dashboard/DispatchPanel';
import DashboardAlertBar from '../components/dashboard/DashboardAlertBar';
import Status from '../components/dashboard/Statuses';
import UserProfilePanel from '../components/dashboard/UserProfilePanel';
const DashboardOverview = React.lazy(() => import('../components/dashboard/DashboardOverview'));
const MainMap = React.lazy(() => import('../components/dashboard/MainMap'));

interface MapLayerState {
    populationDensity: boolean;
    hazardReports: boolean;
    seismicActivity: boolean;
}

const Dashboard: React.FC = () => {
    const [mapLayers, setMapLayers] = useState<MapLayerState>({
        populationDensity: false,
        hazardReports: true,
        seismicActivity: true
    });

    const handleMapLayerChange = useCallback((layer: keyof MapLayerState) => {
        setMapLayers(prev => ({ ...prev, [layer]: !prev[layer] }));
    }, []);

    return (
        <div>
            <Container fluid className="p-4" style={{ backgroundColor: '#202020', minHeight: '100vh', color: 'white' }}>
                <DashboardAlertBar systemStatus={{ liveFeed: true, systemSynced: true, satelliteConnected: true }} />
                <Row>
                    <Col md={2}>
                        <UserProfilePanel />
                        <DispatchPanel />
                        <UserReportsFeed />
                        
                    </Col>
                    <Suspense fallback={<div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}><Spinner animation="border" /></div>}>
                        <Col md={10}>
                            <Row>
                                <Col md={12}>
                                    <MainMap mapLayers={mapLayers} handleMapLayerChange={handleMapLayerChange} />
                                </Col>
                                <Col md={12}>
                                    <Status/>
                                </Col>
                                <Col md={12}>
                                    <DashboardOverview />
                                </Col>
                            </Row>
                        </Col>
                    </Suspense>
                    
                </Row>
            </Container>
            
        </div>
    );
};

export default Dashboard;
