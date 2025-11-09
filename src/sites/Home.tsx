import React from 'react'
import Header from '../components/home/Header'
import Quote from '../components/home/Quote'
import About from '../components/home/About'
import Footer from '../components/home/Footer'
import Navigation from '../components/home/Navigation'

const Home: React.FC = () => {
  return (
    <>
        <Navigation />
        <Header/>
        <Quote/>
        <About/>
        <Footer/>
    </>
  )
}

export default Home
