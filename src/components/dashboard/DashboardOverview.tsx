import React, { useState, useMemo } from 'react';
import { Row, Col, Badge, ListGroup, Form, Card, Tab, Nav, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';
import DataTable, { createTheme } from 'react-data-table-component';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip as ChartTooltip,
    Legend,
    ChartOptions
} from 'chart.js';
import { extendedSeismicEvents } from './mockData';
import { GraphUp, ExclamationTriangleFill, BarChartLineFill, ClockHistory } from 'react-bootstrap-icons';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    ChartTooltip,
    Legend
);

createTheme('customDark', {
    background: {
        default: '#212121',
    },
    text: {
        primary: '#FFFFFF',
        secondary: '#adb5bd',
    },
    context: {
        background: '#cb4b16',
        text: '#FFFFFF',
    },
    divider: {
        default: '#444',
    },
    striped: {
        default: '#2c2c2c',
        text: '#FFFFFF',
    },
    highlightOnHover: {
        default: '#2a2a2a',
        text: '#FFFFFF',
    },
});

const SeismicChart: React.FC = React.memo(() => {
    const [selectedEvent, setSelectedEvent] = useState(extendedSeismicEvents[0].city);

    const chartOptions: ChartOptions<'line'> = useMemo(() => ({
        responsive: true,
        maintainAspectRatio: false,
        animations: {
            tension: {
                duration: 1000,
                easing: 'easeInOutQuad',
            }
        },
        interaction: {
            intersect: false,
            mode: 'index'
        },
        scales: {
            x: {
                type: 'linear',
                title: {
                    display: true,
                    text: 'Minutes Ago',
                    color: '#999'
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)'
                },
                ticks: {
                    color: '#999'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Magnitude',
                    color: '#999'
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)'
                },
                ticks: {
                    color: '#999'
                }
            }
        },
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                mode: 'index',
                intersect: false,
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                titleColor: '#fff',
                bodyColor: '#fff',
            }
        }
    }), []);

    const selectedEventData = extendedSeismicEvents.find(event => event.city === selectedEvent);

    const chartData = useMemo(() => ({
        datasets: selectedEventData ? [{
            label: selectedEventData.city,
            data: selectedEventData.readings.map(r => ({
                x: r.time,
                y: r.value
            })),
            borderColor: '#007bff',
            backgroundColor: 'rgba(0, 123, 255, 0.2)',
            fill: true,
            tension: 0.4
        }] : []
    }), [selectedEventData]);

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="mb-0 text-white"><GraphUp className="me-2" />SEISMIC INTENSITY</h6>
                <Form.Select size="sm" value={selectedEvent} onChange={e => setSelectedEvent(e.target.value)} className="bg-dark text-white border-0" style={{ width: '150px' }}>
                    {extendedSeismicEvents.map(event => (
                        <option key={event.city} value={event.city}>{event.city}</option>
                    ))}
                </Form.Select>
            </div>
            <div style={{ height: '250px' }}>
                <Line options={chartOptions} data={chartData} />
            </div>
        </div>
    );
});

const eventColumns = [
    {
        name: 'Location',
        selector: (row: any) => row.city,
        sortable: true,
    },
    {
        name: 'Magnitude',
        selector: (row: any) => row.magnitude,
        sortable: true,
        cell: (row: any) => <Badge bg={row.magnitude > 6 ? 'danger' : row.magnitude > 5 ? 'warning' : 'info'}>{row.magnitude.toFixed(1)}</Badge>,
        center: true,
    },
    {
        name: 'Casualties',
        selector: (row: any) => row.casualties,
        sortable: true,
        center: true,
    },
    {
        name: 'Status',
        selector: (row: any) => row.status,
        sortable: true,
        cell: (row: any) => <Badge bg={row.status === 'rescue_ongoing' ? 'danger' : row.status === 'rescue_needed' ? 'warning' : 'success'}>{row.status.replace(/_/g, ' ')}</Badge>,
        center: true,
    },
    {
        name: 'Timestamp',
        selector: (row: any) => row.timestamp,
        sortable: true,
        cell: (row: any) => new Date(row.timestamp).toLocaleTimeString(),
        right: true,
    },
];

const sortedEvents = extendedSeismicEvents.sort((a, b) => b.timestamp - a.timestamp);

const DashboardOverview: React.FC = React.memo(() => {
    return (
        <Card className="text-white mb-4" style={{ backgroundColor: '#212121', boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)' }}>
            <Tab.Container id="overview-tabs" defaultActiveKey="analysis">
                <Card.Header className="border-0 d-flex justify-content-between align-items-center">
                    <Nav variant="pills" className="overview-icon-tabs">
                        <Nav.Item>
                            <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip-analysis">Live Analysis</Tooltip>}>
                                <Nav.Link eventKey="analysis"><GraphUp size={18} /></Nav.Link>
                            </OverlayTrigger>
                        </Nav.Item>
                        <Nav.Item>
                            <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip-history">Event History</Tooltip>}>
                                <Nav.Link eventKey="history"><ClockHistory size={18} /></Nav.Link>
                            </OverlayTrigger>
                        </Nav.Item>
                    </Nav>
                    <Badge bg="primary">REAL-TIME</Badge>
                </Card.Header>
                <Card.Body>
                    <Tab.Content>
                        <Tab.Pane eventKey="analysis">
                            <Row className="g-4">
                                {/* Seismic Activity Section */}
                                <Col md={8} className="d-flex"> 
                                    <Card className="h-100 w-100" style={{ backgroundColor: '#212121' }}>
                                        <Card.Body>
                                            <SeismicChart />
                                        </Card.Body>
                                    </Card>
                                </Col>

                                {/* Top 5 Most Active Regions */}
                                <Col md={4} className="d-flex">
                                    <Card className="h-100 w-100" style={{ backgroundColor: '#212121' }}>
                                        <Card.Body>
                                            <h6 className="mb-3 text-white"><BarChartLineFill className="me-2" />TOP 5 ACTIVE REGIONS</h6>
                                            <ListGroup variant="flush">
                                                {extendedSeismicEvents.sort((a, b) => b.magnitude - a.magnitude).slice(0, 5).map(event => (
                                                    <ListGroup.Item key={event.city} className="bg-transparent text-white d-flex justify-content-between align-items-center px-0">
                                                        <span>{event.city}</span>
                                                        <Badge bg={event.magnitude > 6 ? 'danger' : event.magnitude > 5 ? 'warning' : 'info'}>
                                                            {event.magnitude.toFixed(1)}
                                                        </Badge>
                                                    </ListGroup.Item>
                                                ))}
                                            </ListGroup>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </Tab.Pane>
                        <Tab.Pane eventKey="history">
                            <Row className="g-4">
                                <Col md={12} className="d-flex"> 
                                     <Card className="h-100 w-100" style={{ backgroundColor: '#212121' }}>
                                        <Card.Body>
                                            <h6 className="mb-3 text-white"><ExclamationTriangleFill className="me-2" />RECENT SIGNIFICANT EVENTS</h6>
                                            <DataTable
                                                columns={eventColumns}
                                                data={sortedEvents}
                                                theme="customDark"
                                                striped
                                                highlightOnHover
                                                pointerOnHover
                                                persistTableHead
                                            />
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </Tab.Pane>
                    </Tab.Content>
                </Card.Body>
            </Tab.Container>
        </Card>
    );
});

export default DashboardOverview;
