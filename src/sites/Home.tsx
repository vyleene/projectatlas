import React from 'react'
import Header from '../components/home/Header'
import Quote from '../components/home/Quote'
import About from '../components/home/About'
import Features from '../components/home/Features'
import Footer from '../components/home/Footer'
import PanelShowcase from '../components/home/PanelShowcase'
import Navigation from '../components/home/Navigation'

const Home: React.FC = () => {
  return (
    <>
        <Navigation />
        <Header/>
        <Quote/>
        <About/>
        <Features/>
        <PanelShowcase/>
        <Footer/>
    </>
  )
}

export default Home
