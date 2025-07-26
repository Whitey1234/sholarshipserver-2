import React from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';
import { Link } from 'react-router';

const Footer = () => {
  return (
    <footer className="bg-blue-700 text-gray-300 py-10 mt-16">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        
        {/* Brand Info */}
        <div>
          <h2 className="text-xl font-bold text-white mb-3">ScholarSphere</h2>
          <p className="text-sm">
            Empowering students worldwide to find the right scholarships and reach their academic goals.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Quick Links</h3>
          <ul className="space-y-1 text-sm">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><Link to="/all-scholarship" className="hover:text-white">All Scholarships</Link></li>
            <li><Link to="/user-dashboard" className="hover:text-white">Dashboard</Link></li>
            {/* <li><Link to="/contact" className="hover:text-white">Contact</Link></li> */}
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Categories</h3>
          <ul className="space-y-1 text-sm">
            <li><Link to="/category/undergraduate" className="hover:text-white">Undergraduate</Link></li>
            <li><Link to="/category/masters" className="hover:text-white">Masters</Link></li>
            <li><Link to="/category/phd" className="hover:text-white">PhD</Link></li>
            <li><Link to="/category/international" className="hover:text-white">International</Link></li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Follow Us</h3>
          <div className="flex space-x-4 text-xl">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-white"><FaFacebook /></a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-white"><FaTwitter /></a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-white"><FaLinkedin /></a>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-white"><FaGithub /></a>
          </div>
        </div>

      </div>

      {/* Copyright */}
      <div className="mt-10 border-t border-gray-700 pt-4 text-center text-sm">
        &copy; {new Date().getFullYear()} EduscholarshipHub. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
