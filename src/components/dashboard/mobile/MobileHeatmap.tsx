import React from 'react';
import { useMap } from 'react-leaflet';
import leaflet from 'leaflet';
import 'leaflet.heat';

import { mockPopulationData } from '../mockData';

const MobileHeatmap: React.FC = () => {
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
            }
        }).addTo(map);

        return () => {
            map.removeLayer(heatLayer);
        };
    }, [map]);

    return null;
};

export default MobileHeatmap;