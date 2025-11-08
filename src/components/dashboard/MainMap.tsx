import React from 'react';
import { Card, ListGroup, Form } from 'react-bootstrap';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.heat';
import { seismicEvents } from './mockData';
import DispatcherMarkers from './DispatcherMarkers';

interface MapLayerState {
    populationDensity: boolean;
    hazardReports: boolean;
    seismicActivity: boolean;
}

const HeatmapLayer: React.FC<{ mapLayers: MapLayerState }> = React.memo(({ mapLayers }) => {
    const map = useMap();

    React.useEffect(() => {
        let heatLayer: any;

        if (mapLayers.seismicActivity) {
            const points: [number, number, number][] = seismicEvents.map(event => {
                const timeAgo = (Date.now() - event.timestamp) / (60 * 1000); // minutes
                const recencyFactor = Math.max(0, 1 - timeAgo / 30); // Decay over 30 minutes
                const intensity = (event.magnitude / 7.0) * recencyFactor;
                return [event.location[0], event.location[1], intensity];
            });

            heatLayer = L.heatLayer(points, {
                radius: 50,
                blur: 30,
                maxZoom: 12,
                max: 1.0,
                minOpacity: 0.3,
                gradient: {
                    0.2: 'rgba(0, 0, 255, 0.7)',
                    0.4: 'rgba(0, 255, 255, 0.7)',
                    0.6: 'rgba(0, 255, 0, 0.7)',
                    0.8: 'rgba(255, 255, 0, 0.7)',
                    0.9: 'rgba(255, 128, 0, 0.7)',
                    1.0: 'rgba(255, 0, 0, 0.7)'
                }
            }).addTo(map);
        }

        return () => {
            if (heatLayer) {
                map.removeLayer(heatLayer);
            }
        };
    }, [map, mapLayers.seismicActivity]);

    return null;
});

interface MainMapProps {
    mapLayers: MapLayerState;
    handleMapLayerChange: (layer: keyof MapLayerState) => void;
}

const MainMap: React.FC<MainMapProps> = React.memo(({ mapLayers, handleMapLayerChange }) => {
    return (
        <Card className="text-white mb-4" style={{ backgroundColor: '#212121', boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)' }}>
            <Card.Body className="p-3" style={{ position: 'relative' }}>
                <div style={{ height: '515px' }}>
                    <MapContainer
                        center={[12.8797, 121.7740]} // Philippines center
                        zoom={6}
                        style={{ height: '100%', width: '100%' }}
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; OpenStreetMap contributors'
                        />
                        <HeatmapLayer mapLayers={mapLayers} />
                        <DispatcherMarkers />
                    </MapContainer>
                </div>
                <div style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 1000, backgroundColor: 'rgba(33,33,33,0.8)', color: 'white', padding: '10px', borderRadius: '5px' }}>
                    <h6 className="mb-2">Legend</h6>
                    <ListGroup variant="flush">
                        <ListGroup.Item className="bg-transparent text-white border-0 py-1 px-0">
                            🔴 Severe Impact Zone
                        </ListGroup.Item>
                        <ListGroup.Item className="bg-transparent text-white border-0 py-1 px-0">
                            🟡 Moderate Impact
                        </ListGroup.Item>
                        <ListGroup.Item className="bg-transparent text-white border-0 py-1 px-0">
                            🟢 Minor/No Impact
                        </ListGroup.Item>
                    </ListGroup>
                </div>
                <div style={{ position: 'absolute', top: '180px', right: '20px', zIndex: 1000, backgroundColor: 'rgba(33,33,33,0.8)', color: 'white', padding: '10px', borderRadius: '5px' }}>
                    <h6 className="mb-2">Map Layers</h6>
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
                </div>
            </Card.Body>
        </Card>
    );
});

export default MainMap;
