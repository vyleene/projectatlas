import React, { JSX, useState, useMemo, useEffect } from 'react';
import { Card, ListGroup, Dropdown, Pagination, Form } from 'react-bootstrap';
import { ExclamationOctagonFill, ExclamationTriangleFill, InfoCircleFill } from 'react-bootstrap-icons';
import { mockUserReports } from './mockData';

const priorityIcons: { [key: string]: JSX.Element } = {
    High: <ExclamationOctagonFill className="text-danger me-2" />,
    Med: <ExclamationTriangleFill className="text-warning me-2" />,
    Low: <InfoCircleFill className="text-info me-2" />,
};

const UserReportsFeed: React.FC = React.memo(() => {
    const [activePage, setActivePage] = useState(1);
    const [filter, setFilter] = useState('All');
    const [pageInput, setPageInput] = useState(activePage.toString());
    const reportsPerPage = 5;

    const filteredReports = useMemo(() => {
        return mockUserReports.filter(report => filter === 'All' || report.priority === filter);
    }, [filter]);

    // When the filter changes, reset to page 1
    useEffect(() => {
        setActivePage(1);
    }, [filter]);
    
    // Pagination logic
    const indexOfLastReport = activePage * reportsPerPage;
    const indexOfFirstReport = indexOfLastReport - reportsPerPage;
    const currentReports = filteredReports.slice(indexOfFirstReport, indexOfLastReport);

    const totalPages = Math.ceil(filteredReports.length / reportsPerPage);

    const handlePageChange = (pageNumber: number) => {
        setActivePage(pageNumber);
    };

    useEffect(() => {
        setPageInput(activePage.toString());
    }, [activePage]);

    const handlePageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPageInput(e.target.value);
    };

    const handleGoToPage = () => {
        const pageNum = parseInt(pageInput, 10);
        if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= totalPages) {
            handlePageChange(pageNum);
        } else {
            // Reset input to current page if invalid
            setPageInput(activePage.toString());
        }
    };

    const handlePageInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleGoToPage();
        }
    };

    return (
        <Card className="text-white mb-4" style={{ backgroundColor: '#212121', boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)' }}>
            <Card.Header className="border-0 d-flex justify-content-between align-items-center">
                <span>USER REPORTS FEED</span>
                <Dropdown>
                    <Dropdown.Toggle variant="primary" size="sm">
                        Filter: {filter}
                    </Dropdown.Toggle>
                    <Dropdown.Menu variant="dark" style={{ backgroundColor: '#212121' }}>
                        <Dropdown.Item onClick={() => setFilter('All')}>All</Dropdown.Item>
                        <Dropdown.Item onClick={() => setFilter('High')}>High</Dropdown.Item>
                        <Dropdown.Item onClick={() => setFilter('Med')}>Med</Dropdown.Item>
                        <Dropdown.Item onClick={() => setFilter('Low')}>Low</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Card.Header>
            <ListGroup variant="flush">
                {currentReports.map(report => (
                    <ListGroup.Item key={report.id} className="text-white py-2" style={{ backgroundColor: '#212121' }}>
                        <div className="d-flex align-items-center mb-1">
                            {priorityIcons[report.priority]}
                            <small>{report.message}</small>
                        </div>
                        <div className="d-flex justify-content-between">
                            <small className="text-muted">{report.location}</small>
                            <small className="text-muted">{report.timestamp.toLocaleTimeString()}</small>
                        </div>
                    </ListGroup.Item>
                ))}
            </ListGroup>
            {filteredReports.length > 0 && (
                <Card.Footer className="border-0 d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                        <Pagination size="sm" className="mb-0 custom-pagination">
                            <Pagination.First onClick={() => handlePageChange(1)} disabled={activePage === 1} />
                            <Pagination.Prev onClick={() => handlePageChange(activePage - 1)} disabled={activePage === 1} />
                        </Pagination>
                        <span className="text-muted mx-2" style={{ fontSize: '0.8rem' }}>
                            Page
                        </span>
                        <Form.Control
                            type="text"
                            size="sm"
                            className="page-input"
                            value={pageInput}
                            onChange={handlePageInputChange}
                            onKeyDown={handlePageInputKeyDown}
                            onBlur={handleGoToPage}
                        />
                        <span className="text-muted mx-2" style={{ fontSize: '0.8rem' }}>of {totalPages}</span>
                        <Pagination size="sm" className="mb-0 custom-pagination">
                            <Pagination.Next onClick={() => handlePageChange(activePage + 1)} disabled={activePage === totalPages} />
                            <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={activePage === totalPages} />
                        </Pagination>
                    </div>
                </Card.Footer>
            )}
        </Card>
    );
});

export default UserReportsFeed;
