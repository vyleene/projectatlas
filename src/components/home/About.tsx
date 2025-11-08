import React, { useEffect, useRef, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import Globe, { GlobeMethods } from 'react-globe.gl';
import { SphereGeometry, MeshPhongMaterial, Mesh, TextureLoader } from 'three';
import earthMap from '../../assets/images/globe/earth.jpg';
import earthBump from '../../assets/images/globe/topology.png';
import earthClouds from '../../assets/images/globe/clouds.png';

const About: React.FC = () => {
    const globeEl = useRef<GlobeMethods>(undefined);
    const [arcsData, setArcsData] = useState<any[]>([]);
    const [clouds, setClouds] = useState<any>([]);

    useEffect(() => {
        if (globeEl.current) {
            globeEl.current.controls().enabled = true;
            globeEl.current.controls().enableZoom = false;
            globeEl.current.controls().enablePan = false;
            globeEl.current.controls().enableRotate = false;
            globeEl.current.controls().autoRotate = true;
            globeEl.current.controls().autoRotateSpeed = 0.9;
            globeEl.current.pointOfView({ altitude: 2.5 });
        }

        
        if (globeEl.current) {
            const globe = globeEl.current;
            new TextureLoader().load(earthClouds, texture => {
                if (globe) {
                    const clouds = new Mesh(
                        new SphereGeometry(globe.getGlobeRadius() * (1 + 0.004), 75, 75),
                        new MeshPhongMaterial({ map: texture, transparent: true })
                    );
                    globe.scene().add(clouds);
                    setClouds(clouds);
                }
            });
        }
        
        const rotateClouds = () => {
            clouds.rotation.y += -0.006 * Math.PI / 180;
            requestAnimationFrame(rotateClouds);
        }

        const N = 20;
        const arcsData = [...Array(N).keys()].map(() => ({
            startLat: (Math.random() - 0.5) * 180,
            startLng: (Math.random() - 0.5) * 360,
            endLat: (Math.random() - 0.5) * 180,
            endLng: (Math.random() - 0.5) * 360,
            color: [['white', 'white', 'white', 'white'][Math.round(Math.random() * 3)], ['white', 'white', 'white', 'white'][Math.round(Math.random() * 3)]]
        }));
        setArcsData(arcsData);
    }, []);

    return (
        <section className="about-section">
            <Container>
                <Row className="align-items-center justify-content-center text-center text-white mb-5">
                    <Col>
                        <p className="lead text-white fw-bold">
                        Empowering communities with real-time seismic data and safety resources.
                        </p>
                    </Col>
                </Row>
                <Row>
                    <Col lg="8" md="12" className="mb-4 d-flex align-items-stretch">
                        <Card text="white" className="w-100">
                            <Card.Body className="d-flex flex-column">
                                <Card.Title as="h3">About Project Atlas</Card.Title>
                                <Card.Text>
                                    Project Atlas, developed by Team Kuantica, is an earthquake-monitoring application designed to improve earthquake response and awareness using an interactive heatmap. It aims to empower citizens and local government officials by providing real-time earthquake information and safety resources. The target audience includes every citizen and government first-responder at the barangay and city levels.
                                </Card.Text>
                                <Card.Text>
                                    Our goal is to improve earthquake response and situational awareness through crowdsourced shaking reports and dynamic heatmap visualizations.
                                </Card.Text>
                                <Button variant="primary" className="mt-auto align-self-start">Explore the Heatmap</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col lg="4" md="12" className="mb-4 d-flex justify-content-center align-items-stretch">
                        <div className="globe-wrapper">
                            <Globe
                                ref={globeEl}
                                globeImageUrl={earthMap}
                                bumpImageUrl={earthBump}
                                backgroundColor="rgba(0,0,0,0)"
                                arcsData={arcsData}
                                arcColor={'color'}
                                arcDashLength={() => Math.random()}
                                arcDashGap={() => Math.random()}
                                arcDashAnimateTime={() => Math.random() * 4000 + 500}
                                width={400}
                                height={400}
                            />
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default About