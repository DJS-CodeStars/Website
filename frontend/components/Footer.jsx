import React from 'react';
import { FaLinkedin, FaInstagram, FaTwitter } from 'react-icons/fa';
import { HiOutlineMail, HiOutlinePhone } from 'react-icons/hi';

export function Footer() {
  return (
    <div className="text-white bg-black py-8 w-screen">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        
        {/* Logo and Name */}
        <div className="flex flex-col items-center md:items-start mb-4 md:mb-0">
          <h1 className="text-2xl font-bold">DJS CodeStars</h1>
          <p className="text-sm text-gray-400">Empowering the Future of Coding</p>
        </div>

        {/* Social Links */}
        <div className="flex space-x-6 mb-4 md:mb-0">
          <a href="https://www.linkedin.com/in/djs-code-stars" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <FaLinkedin className="text-2xl hover:text-yellow-500 transition duration-300" />
          </a>
          <a href="https://www.instagram.com/djs-code-stars" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <FaInstagram className="text-2xl hover:text-yellow-500 transition duration-300" />
          </a>
          <a href="https://twitter.com/djs-code-stars" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <FaTwitter className="text-2xl hover:text-yellow-500 transition duration-300" />
          </a>
        </div>

        {/* Contact Details */}
        <div className="flex flex-col items-center md:items-end space-y-2">
          <a href="mailto:contact@djscodestars.com" className="flex items-center hover:text-yellow-500 transition duration-300">
            <HiOutlineMail className="mr-2 text-xl" />
            contact@djscodestars.com
          </a>
          <a href="tel:+1234567890" className="flex items-center hover:text-yellow-500 transition duration-300">
            <HiOutlinePhone className="mr-2 text-xl" />
            +1 234 567 890
          </a>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm text-gray-500">
        &copy; 2024 DJS CodeStars. All rights reserved.
      </div>
    </div>
  );
}
