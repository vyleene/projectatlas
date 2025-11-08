import React from 'react';
import { Image } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { HouseDoorFill, Globe, GearFill, BoxArrowRight } from 'react-bootstrap-icons';
import Alabid from '../../assets/images/alabid.png';
import '../../assets/styles/style.sidebar.css';

const Sidebar: React.FC = () => {
    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <Globe className="me-2" size={30} />
                <span>Atlas</span>
            </div>

            <ul className="sidebar-menu">
                <li className="sidebar-menu-item">
                    <NavLink to="/dashboard" className="sidebar-menu-link">
                        <HouseDoorFill className="bi" />
                        <span>Dashboard</span>
                    </NavLink>
                </li>
                <li className="sidebar-menu-item">
                    <NavLink to="/dashboard/heatmap" className="sidebar-menu-link">
                        <Globe className="bi" />
                        <span>Heatmap</span>
                    </NavLink>
                </li>
            </ul>

            <div className="sidebar-footer">
                <a href="#" className="sidebar-menu-link">
                    <GearFill className="bi" />
                    <span>Settings</span>
                </a>
                <a href="#" className="sidebar-menu-link">
                    <BoxArrowRight className="bi" />
                    <span>Sign out</span>
                </a>
                <a href="#" className="sidebar-menu-link mt-auto">
                    <Image src={Alabid} alt="User" width="30" height="30" className="rounded-circle" />
                </a>
            </div>
        </div>
    );
};

export default Sidebar;