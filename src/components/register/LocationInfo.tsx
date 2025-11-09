import { memo } from 'react';
import { Button } from 'react-bootstrap';
import { GeoAltFill } from 'react-bootstrap-icons';

interface PinnedLocation {
    lat: number;
    lng: number;
    name?: string;
}

interface LocationInfoProps {
    location: PinnedLocation;
    onCancel: () => void;
    onConfirm: () => void;
}

const LocationInfo = memo(({ location, onCancel, onConfirm }: LocationInfoProps) => (
    <div className="position-absolute bottom-0 start-0 end-0 p-3 bg-dark border-top border-secondary" style={{ zIndex: 1000 }}>
        <div className="d-flex align-items-center justify-content-between">
            <div className="text-white">
                <div className="d-flex align-items-center mb-2">
                    <GeoAltFill className="me-2" />
                    <strong>Selected Location:</strong>
                </div>
                <p className="mb-0 text-white-50">
                    {location.name || 'Loading location name...'}
                </p>
            </div>
            <div className="d-flex gap-2">
                <Button variant="outline-secondary" size="sm" onClick={onCancel}>
                    Cancel
                </Button>
                <Button variant="primary" size="sm" onClick={onConfirm}>
                    Confirm Location
                </Button>
            </div>
        </div>
    </div>
));

export default LocationInfo;