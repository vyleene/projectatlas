import React from 'react';
import { MapContainer, TileLayer, useMap, Pane } from 'react-leaflet';
import leaflet from 'leaflet';
import 'leaflet.heat';

import { mockPopulationData, seismicEvents } from '../mockData';

const HeatmapLayer: React.FC = () => {
    const map = useMap();

    React.useEffect(() => {
        const heatLayer = (leaflet as any).heatLayer(mockPopulationData, {
            radius: 25,
            blur: 20,
            maxZoom: 12,
            max: 1.0,
            gradient: { 
                0.4: 'blue',
                0.6: 'lime',
                0.8: 'yellow',
                1.0: 'red'
            },
            pane: 'heatmapPane'
        }).addTo(map);

        return () => {
            map.removeLayer(heatLayer);
        };
    }, [map]);

    return null;
};

const SeismicCirclesLayer: React.FC = () => {
    const map = useMap();

    React.useEffect(() => {
        const circles: leaflet.Layer[] = [];

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

        return () => {
            circles.forEach(circle => map.removeLayer(circle));
        };
    }, [map]);

    return null;
};

const MobileHeatmap: React.FC = () => {
    return (
        <MapContainer
            center={[12.8797, 121.7740]}
            zoom={6}
            style={{ height: '100%', width: '100%' }}
            zoomControl={false}
        >
            <Pane name="seismicCirclesPane" style={{ zIndex: 410 }} />
            <Pane name="heatmapPane" style={{ zIndex: 420 }} />

            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; OpenStreetMap contributors'
            />
            <HeatmapLayer />
            <SeismicCirclesLayer />
        </MapContainer>
    );
};

export default MobileHeatmap;