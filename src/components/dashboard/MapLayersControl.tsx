import React from 'react';
import { Card, Badge, Form } from 'react-bootstrap';

interface MapLayersControlProps {
    mapLayers: {
        populationDensity: boolean;
        hazardReports: boolean;
        seismicActivity: boolean;
    };
    handleMapLayerChange: (layer: 'populationDensity' | 'hazardReports' | 'seismicActivity') => void;
}

const MapLayersControl: React.FC<MapLayersControlProps> = React.memo(({ mapLayers, handleMapLayerChange }) => {
    return (
        <Card className="bg-dark text-white border-secondary mb-4">
            <Card.Header className="border-secondary d-flex justify-content-between align-items-center">
                <span>MAP LAYERS</span>
                <Badge bg="secondary" style={{ fontSize: '0.7em' }}>3</Badge>
            </Card.Header>
            <Card.Body className="p-2">
                <Form>
                    <Form.Check
                        type="switch"
                        id="population-density"
                        label="Population Density"
                        checked={mapLayers.populationDensity}
                        onChange={() => handleMapLayerChange('populationDensity')}
                    />
                    <Form.Check
                        type="switch"
                        id="hazard-reports"
                        label="Hazard Reports"
                        checked={mapLayers.hazardReports}
                        onChange={() => handleMapLayerChange('hazardReports')}
                    />
                    <Form.Check
                        type="switch"
                        id="seismic-activity"
                        label="Seismic Activity"
                        checked={mapLayers.seismicActivity}
                        onChange={() => handleMapLayerChange('seismicActivity')}
                    />
                </Form>
            </Card.Body>
        </Card>
    );
});

export default MapLayersControl;
