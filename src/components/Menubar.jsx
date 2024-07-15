import React, { useState, useEffect } from 'react';
import { IoIosSunny } from "react-icons/io";
import { FaMoon } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import profileImg from '../assets/profile2.jpg';

const Menubar = ({ isOpen, closeMenu, toggleTheme, isDarkMode }) => {
  const [startX, setStartX] = useState(null);
  const [currentX, setCurrentX] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX);
    setIsDragging(false);
  };

  const handleTouchMove = (e) => {
    if (startX === null) return;
    const touchX = e.touches[0].clientX;
    setCurrentX(touchX);
    setIsDragging(true);
  };

  const handleTouchEnd = () => {
    if (isDragging && startX - currentX > 50) { // Adjust the threshold as needed
      closeMenu();
    }
    setStartX(null);
    setCurrentX(null);
    setIsDragging(false);
  };

  const handleMouseDown = (e) => {
    setStartX(e.clientX);
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (startX === null) return;
    const mouseX = e.clientX;
    setCurrentX(mouseX);
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    if (isDragging && startX - currentX > 50) { 
      closeMenu();
    }
    setStartX(null);
    setCurrentX(null);
    setIsDragging(false);
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isOpen]);

  const getLeftPosition = () => {
    if (isDragging && currentX !== null && startX !== null) {
      const diffX = startX - currentX;
      if (diffX > 0) {
        return -diffX;
      }
    }
    return isOpen ? 0 : -70 * window.innerWidth / 100; // 70vw in pixels
  };

  return (
    <div
      className="menu-bar"
      style={{
        height: '100vh',
        width: '70vw',
        backgroundColor: 'gray',
        position: 'fixed',
        top: 0,
        left: `${getLeftPosition()}px`,
        transition: isDragging ? 'none' : 'left 0.3s ease-in-out',
        zIndex: 1000,
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
    >
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
          <img src={profileImg} alt="profile_photo" style={{ height: '70px', width: '70px', borderRadius: "50%" }} />
          {isDarkMode ? (
            <IoIosSunny style={{ width: "30px", height: '30px', cursor: 'pointer' }} onClick={toggleTheme} />
          ) : (
            <FaMoon style={{ width: "30px", height: '30px', cursor: 'pointer' }} onClick={toggleTheme} />
          )}
        </div>
        <div>
          <div>
            <p>Ratikanta Mohanta</p>
            <p>+91 1234567890</p>
          </div>
          <div>
            <IoMdArrowDropdown />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menubar;
