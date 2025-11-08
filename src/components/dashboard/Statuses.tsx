import React, { JSX } from 'react';
import { Col, Card, Row } from 'react-bootstrap';
import { ShieldShaded, HeartbreakFill, ExclamationTriangleFill, LifePreserver, ArrowUp, ArrowDown } from 'react-bootstrap-icons';
import { mockSituationStatus } from './mockData';

interface StatusItem {
    icon: JSX.Element;
    label: string;
    value: number;
    trend: 'up' | 'down';
    trendIsGood: boolean;
}

const statusItems: StatusItem[] = [
    {
        icon: <ShieldShaded size={24} className="text-success" />,
        label: 'Safe',
        value: mockSituationStatus.safe,
        trend: mockSituationStatus.safeTrend as 'up' | 'down',
        trendIsGood: true, // An increase in safe people is good
    },
    {
        icon: <HeartbreakFill size={24} className="text-danger" />,
        label: 'Injured',
        value: mockSituationStatus.injured,
        trend: mockSituationStatus.injuredTrend as 'up' | 'down',
        trendIsGood: false, // An increase in injured people is bad
    },
    {
        icon: <ExclamationTriangleFill size={24} className="text-warning" />,
        label: 'Hazard',
        value: mockSituationStatus.hazard,
        trend: mockSituationStatus.hazardTrend as 'up' | 'down',
        trendIsGood: false, // An increase in hazards is bad
    },
    {
        icon: <LifePreserver size={24} className="text-info" />,
        label: 'Rescue Needed',
        value: mockSituationStatus.rescueNeeded,
        trend: mockSituationStatus.rescueNeededTrend as 'up' | 'down',
        trendIsGood: false, // An increase in people needing rescue is bad
    },
];

const Status: React.FC = () => {
    const getTrendIcon = (trend: 'up' | 'down', trendIsGood: boolean) => {
        const isUp = trend === 'up';
        const color = (isUp && trendIsGood) || (!isUp && !trendIsGood) ? 'text-success' : 'text-danger';
        
        return isUp ? <ArrowUp className={color} /> : <ArrowDown className={color} />;
    };

    return (
        <Col md={12}>
            <Card className="h-100 mb-4 border-0" style={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
                <Card.Body className="p-0">
                    <Row className="g-4">
                        {statusItems.map((item) => (
                            <Col key={item.label}>
                                <div className="stat-card p-3 rounded d-flex align-items-center">
                                    <div className="me-3 flex-shrink-0">{item.icon}</div>
                                    <div>
                                        <div className="d-flex align-items-center">
                                            <h5 className="mb-0 fw-bold me-2">{item.value.toLocaleString()}</h5>
                                            {getTrendIcon(item.trend, item.trendIsGood)}
                                        </div>
                                        <small className="text-muted">{item.label}</small>
                                    </div>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </Card.Body>
            </Card>
        </Col>
    );
}

export default Status;