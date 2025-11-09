import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './sites/Home'
import Login from './sites/Login'
import Register from './sites/Register'
import Dashboard from './sites/Dashboard'
import DashboardMobile from './sites/DashboardMobile'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/mobile" element={<DashboardMobile/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
