import { useState, useEffect, useCallback, memo } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import leaflet from 'leaflet';

import LoadingSpinner from './LoadingSpinner';
import LocationInfo from './LocationInfo';

interface LocationSelectorProps {
    onLocationSelect: (lat: number, lng: number) => void;
}

interface PinnedLocation {
    lat: number;
    lng: number;
    name?: string;
}

const LocationSelector = memo(({ onLocationSelect }: LocationSelectorProps) => {
    const [marker, setMarker] = useState<[number, number] | null>(null);
    const [center, setCenter] = useState<[number, number]>([14.5995, 120.9842]);
    const [isLocating, setIsLocating] = useState(true);
    const [pinnedLocation, setPinnedLocation] = useState<PinnedLocation | null>(null);
    const [isLoadingLocationName, setIsLoadingLocationName] = useState(false);

    useEffect(() => {
        let isMounted = true;

        if ('geolocation' in navigator) {
            setIsLocating(true);
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    if (isMounted) {
                        setCenter([position.coords.latitude, position.coords.longitude]);
                        setIsLocating(false);
                    }
                },
                (error) => {
                    if (isMounted) {
                        console.error('Error getting location:', error);
                        setIsLocating(false);
                    }
                },
                {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 0
                }
            );
        }

        return () => {
            isMounted = false;
        };
    }, []);

    const handleLocationClick = useCallback(async (e: leaflet.LeafletMouseEvent) => {
        const { lat, lng } = e.latlng;
        
        setMarker([lat, lng]);
        setIsLoadingLocationName(true);
        
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 5000);
            
            const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
                { signal: controller.signal }
            );
            clearTimeout(timeoutId);
            
            const data = await response.json();
            const locationName = data.display_name.split(',').slice(0, 3).join(',');
            setPinnedLocation({ lat, lng, name: locationName });
        } catch (error) {
            const err = error as Error;
            if (err.name === 'AbortError') {
                console.log('Location name request timed out');
            } else {
                console.error('Error fetching location name:', err);
            }
            setPinnedLocation({ lat, lng });
        } finally {
            setIsLoadingLocationName(false);
        }
    }, []);

    const MapEvents = useCallback(() => {
        useMapEvents({
            click: handleLocationClick
        });
        return null;
    }, [handleLocationClick]);

    const RecenterMap = useCallback(() => {
        const map = useMap();
        
        useEffect(() => {
            if (!isLocating && center[0] !== 14.5995) {
                map.setView(center, 13, { animate: true });
            }
        }, [isLocating, center]);
        
        useEffect(() => {
            if (marker) {
                const keepMarkerInView = () => {
                    const markerLatLng = leaflet.latLng(marker[0], marker[1]);
                    
                    if (!map.getBounds().contains(markerLatLng)) {
                        map.setView(marker, map.getZoom(), { animate: true });
                    }
                };

                map.setView(marker, map.getZoom(), { animate: true });

                map.on('zoomend', keepMarkerInView);
                map.on('moveend', keepMarkerInView);

                return () => {
                    map.off('zoomend', keepMarkerInView);
                    map.off('moveend', keepMarkerInView);
                };
            }
        }, [marker]);
        
        return null;
    }, [isLocating, center, marker]);

    const handleConfirm = useCallback(() => {
        if (pinnedLocation) {
            onLocationSelect(pinnedLocation.lat, pinnedLocation.lng);
        }
    }, [pinnedLocation, onLocationSelect]);

    const handleCancel = useCallback(() => {
        setMarker(null);
        setPinnedLocation(null);
    }, []);

    return (
        <div className="position-relative">
            {(isLocating || isLoadingLocationName) && <LoadingSpinner />}
            <MapContainer center={center} zoom={13} className="mapContainer" preferCanvas={true}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' />
                <MapEvents />
                <RecenterMap />
                {marker && <Marker position={marker} />}
            </MapContainer>
            
            {pinnedLocation && (
                <LocationInfo location={pinnedLocation} onCancel={handleCancel} onConfirm={handleConfirm} />
            )}
        </div>
    );
});

export default LocationSelector;