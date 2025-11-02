import React from 'react'
import Header from './components/Header'
import Navigation from './components/Navigation'
import Quote from './components/Quote'
import About from './components/About'

const App: React.FC = () => {
  return (
    <>
      <Navigation/>
      <Header/>
      <Quote/>
      <About/>
    </>
  )
}

export default App
