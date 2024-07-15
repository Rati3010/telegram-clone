import React, { useState, useEffect } from 'react';
import { RxHamburgerMenu } from "react-icons/rx";
import { IoSearchOutline } from "react-icons/io5";
import "./App.css";
import Menubar from "./components/Menubar";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Close the menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.menu-bar') && !event.target.closest('.hamburger-icon')) {
        closeMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={isDarkMode ? "dark-mode" : "light-mode"}>
      <div style={{ display: "flex", justifyContent: 'space-between' }}>
        <RxHamburgerMenu className="hamburger-icon" style={{ width: '30px', height: "30px" }} onClick={toggleMenu} />
        <IoSearchOutline style={{ width: '30px', height: "30px" }} />
      </div>
      <Menubar isOpen={isMenuOpen} closeMenu={closeMenu} toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
    </div>
  );
}

export default App;
