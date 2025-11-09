import React, { useState, useEffect } from 'react';
import { Card, Form } from 'react-bootstrap';
import { MapContainer, TileLayer, useMap, Pane, Marker, Popup } from 'react-leaflet';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.heat';
import { seismicEvents, mockPopulationData, mockUserReports } from './mockData';

interface MapLayerState {
    populationDensity: boolean;
    hazardReports: boolean;
    seismicActivity: boolean;
}

const hazardIcon = new leaflet.DivIcon({
    html: `<div class="hazard-marker-icon"></div>`,
    className: '',
    iconSize: [12, 12],
    iconAnchor: [6, 6]
});

const priorityColorMap: { [key: string]: string } = {
    High: 'text-danger',
    Med: 'text-warning',
    Low: 'text-info'
};

const SeismicCirclesLayer: React.FC<{ mapLayers: MapLayerState }> = React.memo(({ mapLayers }) => {
    const map = useMap();

    React.useEffect(() => {
        const circles: leaflet.Layer[] = [];

        if (mapLayers.seismicActivity) {
            seismicEvents.forEach(event => {
                const circle = leaflet.circle(event.location as leaflet.LatLngTuple, {
                    color: 'red',
                    fillColor: '#f03',
                    fillOpacity: 0.5,
                    radius: event.magnitude * 10000,
                    pane: 'seismicCirclesPane'
                }).addTo(map);
                circles.push(circle);
            });
        }

        return () => {
            circles.forEach(circle => map.removeLayer(circle));
        };
    }, [map, mapLayers.seismicActivity]);

    return null;
});

const PopulationHeatmapLayer: React.FC<{ mapLayers: MapLayerState }> = React.memo(({ mapLayers }) => {
    const map = useMap();

    React.useEffect(() => {
        let heatLayer: any;

        if (mapLayers.populationDensity) {
            heatLayer = (leaflet as any).heatLayer(mockPopulationData, {
                radius: 25,
                blur: 15,
                maxZoom: 10,
                max: 1.0,
                pane: 'heatmapPane',
                gradient: { 
                    0.4: 'blue',
                    0.6: 'lime',
                    0.8: 'yellow',
                    1.0: 'red'
                }
            }).addTo(map);
        }

        return () => {
            if (heatLayer) {
                map.removeLayer(heatLayer);
            }
        };
    }, [map, mapLayers.populationDensity]);

    return null;
});

const HazardReportsLayer: React.FC<{ show: boolean; }> = ({ show }) => {
    const map = useMap();
    const [currentZoom, setCurrentZoom] = useState(map.getZoom());

    useEffect(() => {
        const handleZoom = () => {
            setCurrentZoom(map.getZoom());
        };

        map.on('zoomend', handleZoom);

        return () => {
            map.off('zoomend', handleZoom);
        };
    }, [map]);

    if (!show || currentZoom < 9) return null;

    return (
        <>
            {mockUserReports.map(report => (
                <Marker key={report.id} position={report.coords as leaflet.LatLngTuple} icon={hazardIcon}>
                    <Popup>
                        <strong className={priorityColorMap[report.priority] || 'text-secondary'}>Priority: {report.priority}</strong><br />
                        <strong>Message:</strong> {report.description}<br />
                        <strong>Location:</strong> {report.location}<br />
                        <strong>Time:</strong> {report.timestamp.toLocaleTimeString()}
                    </Popup>
                </Marker>
            ))}
        </>
    );
};

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
                        center={[12.8797, 121.7740]}
                        zoom={6}
                        style={{ height: '100%', width: '100%' }}
                    >
                        <Pane name="seismicCirclesPane" style={{ zIndex: 410 }} />
                        <Pane name="heatmapPane" style={{ zIndex: 420 }} />

                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; OpenStreetMap contributors'
                        />
                        <SeismicCirclesLayer mapLayers={mapLayers} />
                        <PopulationHeatmapLayer mapLayers={mapLayers} />
                        <HazardReportsLayer show={mapLayers.hazardReports} />
                    </MapContainer>
                </div>
                <div className="map-legend">
                    <h6 className="mb-2 fw-bold">Legend</h6>
                    <div className="legend-item">
                        <div className="legend-symbol epicenter-symbol"></div>
                        <span>Seismic Epicenter</span>
                    </div>
                    <div className="legend-item mt-2">
                        <div className="legend-gradient"></div>
                        <div className="d-flex justify-content-between w-100">
                            <small>Low</small>
                            <small>High</small>
                        </div>
                        <small className="text-muted w-100 text-center d-block mt-1">Population Density</small>
                    </div>
                </div>
                <div className="map-overlay-panel" style={{ top: '180px' }}>
                    <h6 className="mb-2 fw-bold">Map Layers</h6>
                    <Form>
                        <Form.Check 
                            type="switch"
                            id="seismic-activity-switch"
                            label="Seismic Activity"
                            checked={mapLayers.seismicActivity}
                            onChange={() => handleMapLayerChange('seismicActivity')}
                        />
                        <Form.Check 
                            type="switch"
                            id="population-density-switch"
                            label="Impacted Population Density"
                            checked={mapLayers.populationDensity}
                            onChange={() => handleMapLayerChange('populationDensity')}
                        />
                        <Form.Check 
                            type="switch"
                            id="hazard-reports-switch"
                            label="Hazard Reports"
                            checked={mapLayers.hazardReports}
                            onChange={() => handleMapLayerChange('hazardReports')}
                        />
                    </Form>
                </div>
            </Card.Body>
        </Card>
    );
});

export default MainMap;
