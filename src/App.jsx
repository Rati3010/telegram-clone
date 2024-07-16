import React, { useState, useEffect } from 'react';
import { RxHamburgerMenu } from "react-icons/rx";
import { IoSearchOutline } from "react-icons/io5";
import "./App.css";
import Menubar from "./components/Menubar";
import Messages from './components/Messages';
import { messages } from './utils/data';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [transitionClass, setTransitionClass] = useState('');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleTheme = () => {
    setTransitionClass('theme-transition');
    setIsDarkMode(!isDarkMode);
    setTimeout(() => {
      setTransitionClass('');
    }, 1000); // Adjust the duration to match the CSS transition duration
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
    <div className={`${isDarkMode ? "dark-mode" : "light-mode"} ${transitionClass}`}>
      <div style={{ display: "flex", justifyContent: 'space-between',padding:"20px" }}>
        <RxHamburgerMenu className="hamburger-icon" style={{ width: '30px', height: "30px" }} onClick={toggleMenu} />
        <IoSearchOutline style={{ width: '30px', height: "30px" }} />
      </div>
      <Menubar isOpen={isMenuOpen} closeMenu={closeMenu} toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
      <div style={{display:'flex', justifyContent:'space-around',padding:'20px', fontSize:'20px'}}>
        <div>All Chats</div>
        <div>Personal</div>
        <div>Group</div>
      </div>
      {messages && messages.map((message)=>{
          return <Messages message={message} />
      })}
      
    </div>
  );
}

export default App;
