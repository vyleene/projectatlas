import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import { Badge } from 'react-bootstrap';
import L from 'leaflet';
import { mockDispatchers } from './mockData';

const createPulsingIcon = (color: string) => {
    return L.divIcon({
        className: 'custom-div-icon',
        html: `
      <div style="
        position: relative;
        width: 15px;
        height: 15px;
      ">
        <div style="
          position: absolute;
          width: 15px;
          height: 15px;
          background-color: ${color};
          border-radius: 50%;
          animation: pulse 1.5s infinite;
        "></div>
      </div>
    `,
        iconSize: [15, 15],
        iconAnchor: [7.5, 7.5]
    });
};

const DispatcherMarkers: React.FC = React.memo(() => {
    return (
        <>
            {mockDispatchers.map(dispatcher => {
                const markerColor = dispatcher.status === 'active' ? '#00ff00' :
                    dispatcher.status === 'en_route' ? '#ffaa00' : '#0088ff';
                return (
                    <Marker
                        key={dispatcher.id}
                        position={[dispatcher.location[0], dispatcher.location[1]]}
                        icon={createPulsingIcon(markerColor)}
                    >
                        <Popup className="custom-popup">
                            <div className="dispatcher-popup">
                                <h6 className="mb-2">{dispatcher.name}</h6>
                                <Badge bg={
                                    dispatcher.status === 'active' ? 'success' :
                                        dispatcher.status === 'en_route' ? 'warning' : 'info'
                                }>
                                    {dispatcher.status.replace('_', ' ')}
                                </Badge>
                                <hr className="my-2" />
                                <small className="text-muted">
                                    Lat: {dispatcher.location[0].toFixed(4)}<br />
                                    Lng: {dispatcher.location[1].toFixed(4)}
                                </small>
                            </div>
                        </Popup>
                    </Marker>
                );
            })}
        </>
    );
});

export default DispatcherMarkers;
