import { memo } from 'react';

const LoadingSpinner = memo(() => (
    <div className="position-absolute top-50 start-50 translate-middle text-white" style={{ zIndex: 1000 }}>
        <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    </div>
));

export default LoadingSpinner;