import React, { useEffect, useRef, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Globe, { GlobeMethods } from 'react-globe.gl';

import { Link } from 'react-router-dom';

import { SphereGeometry, MeshPhongMaterial, Mesh, TextureLoader, Clock } from 'three';

import earthMap from '../../assets/images/globe/earth.jpg';
import earthBump from '../../assets/images/globe/topology.png';
import earthClouds from '../../assets/images/globe/clouds.png';

const Header: React.FC = () => {
    const globeEl = useRef<GlobeMethods | undefined>(undefined);
    const [arcsData, setArcsData] = useState<any[]>([]);
    const [clouds, setClouds] = useState<Mesh | null>(null);

    useEffect(() => {
        if (globeEl.current) {
            const controls = globeEl.current.controls();
            controls.enableZoom = false;
            controls.enablePan = false;
            controls.enableRotate = true;
            controls.autoRotate = true;
            controls.autoRotateSpeed = 0.9;
            globeEl.current.pointOfView({ altitude: 2.8 });
        }

        const globe = globeEl.current;
        if (globe) {
            new TextureLoader().load(earthClouds, texture => {
                const cloudSphere = new Mesh(
                    // --- CHANGE 2: Increased altitude from 1.004 to 1.01 to stop Z-fighting ---
                    new SphereGeometry(globe.getGlobeRadius() * 1.01, 75, 75),
                    // --- CHANGE 3: Softer material with more transparency ---
                    new MeshPhongMaterial({
                        map: texture,
                        transparent: true,
                        opacity: 0.4,
                        depthWrite: false // Helps with transparency rendering issues
                    })
                );
                globe.scene().add(cloudSphere);
                setClouds(cloudSphere);
            });
        }
        
        const N = 20;
        const newArcsData = [...Array(N).keys()].map(() => ({
            startLat: (Math.random() - 0.5) * 180,
            startLng: (Math.random() - 0.5) * 360,
            endLat: (Math.random() - 0.5) * 180,
            endLng: (Math.random() - 0.5) * 360,
            color: 'rgba(255, 255, 255, 0.5)'
        }));
        setArcsData(newArcsData);
    }, []);

    useEffect(() => {
        if (!clouds) return;
        
        let animationFrameId: number;
        // --- CHANGE 4: Time-based animation for perfect smoothness ---
        const clock = new Clock();
        const rotateClouds = () => {
            if (clouds) {
                // Rotate based on elapsed time, not frame rate
                clouds.rotation.y += clock.getDelta() * 0.015;
            }
            animationFrameId = requestAnimationFrame(rotateClouds);
        };
        rotateClouds();
        
        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, [clouds]);

    return (
        <section className='hero-section'>
            <div className="hero-globe-background">
                <Globe
                    ref={globeEl}
                    globeImageUrl={earthMap}
                    bumpImageUrl={earthBump}
                    backgroundColor="rgba(0,0,0,0)"
                    arcsData={arcsData}
                    arcColor={'color'}
                    arcDashLength={0.7}
                    arcDashGap={0.2}
                    arcDashAnimateTime={3000}
                />
            </div>
            
            <div className='hero-overlay'></div>

            <Container className="hero-content">
                <Row className="gx-5 align-items-center justify-content-center">
                    <Col lg={10} className="text-center">
                        <h1 className="display-1 lh-1 mb-3"><b>When the earth trembles, <br/> Atlas endures.</b></h1>
                        <Link to="/dashboard">
                            <Button variant="primary" size="lg" className="rounded-pill mt-4 px-4 py-2">
                                <span className="d-flex align-items-center justify-content-center">
                                    <i className="bi-sliders me-2"></i>
                                    <span className="small">See Atlas in Action</span>
                                </span>
                            </Button>
                        </Link>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

export default Header;