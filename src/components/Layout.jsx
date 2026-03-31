import React from 'react';
import { NavLink } from 'react-router-dom';

const Layout = ({ children }) => (
  <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
    <header className="sticky top-0 bg-white shadow-sm z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-6">
        <NavLink to="/" className="font-black text-xl uppercase text-blue-700">EduGrowth</NavLink>
        <nav className="flex items-center gap-3 text-sm font-semibold text-gray-600">
          <NavLink to="/" className={({ isActive }) => isActive ? 'text-blue-600' : ''}>Home</NavLink>
          <NavLink to="/partners" className={({ isActive }) => isActive ? 'text-blue-600' : ''}>Partners</NavLink>
          <NavLink to="/services" className={({ isActive }) => isActive ? 'text-blue-600' : ''}>Services</NavLink>
          <NavLink to="/contact" className={({ isActive }) => isActive ? 'text-blue-600' : ''}>Contact</NavLink>
          <NavLink to="/fr" className={({ isActive }) => isActive ? 'text-blue-600' : ''}>FR</NavLink>
        </nav>
      </div>
    </header>
    {children}
    <footer className="bg-white border-t border-gray-100 py-10 text-center text-gray-700">
      <p className="font-semibold">© 2026 EduGrowth • Tunisia • Dubai • UK • UAE</p>
    </footer>
  </div>
);

export default Layout;
