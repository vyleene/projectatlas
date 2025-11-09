import React, { Suspense, lazy } from 'react';

import '../assets/styles/style.home.css'

import Navigation from '../components/home/Navigation';
import Header from '../components/home/Header';

const Quote = lazy(() => import('../components/home/Quote'));
const About = lazy(() => import('../components/home/About'));
const Features = lazy(() => import('../components/home/Features'));
const PanelShowcase = lazy(() => import('../components/home/PanelShowcase'));
const Footer = lazy(() => import('../components/home/Footer'));

const LoadingFallback = () => <div style={{ height: '100vh' }} />;

const Home: React.FC = () => {
  return (
    <>
      <Navigation />
      <Header />
      <Suspense fallback={<LoadingFallback />}>
        <Quote />
        <About />
        <Features />
        <PanelShowcase />
        <Footer />
      </Suspense>
    </>
  );
};

export default Home;
