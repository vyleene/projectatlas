import React from 'react'
import Header from './components/Header'
import Navigation from './components/Navigation'
import Quote from './components/Quote'
import About from './components/About'
import Features from './components/Features'
import Footer from './components/Footer'
import PanelShowcase from './components/PanelShowcase'

const App: React.FC = () => {
  return (
    <>
      <Navigation/>
      <Header/>
      <Quote/>
      <About/>
      <Features/>
      <PanelShowcase/>
      <Footer/>
    </>
  )
}

export default App
