import React, { useState, useEffect } from 'react';
import { IoIosSunny } from "react-icons/io";
import { FaMoon } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import profileImg from '../assets/profile2.jpg';
import { FaRegCircleUser } from "react-icons/fa6";
import { AiOutlineTeam, AiOutlineUser, AiOutlineQuestionCircle } from "react-icons/ai";
import { MdOutlineCall } from "react-icons/md";
import { VscPerson } from "react-icons/vsc";
import { CiBookmark } from "react-icons/ci";
import { IoSettingsOutline, IoPersonAddOutline } from "react-icons/io5";

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
    };
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
      className={`menu-bar ${isDarkMode ? 'dark-mode' : 'light-mode'}`}
      style={{
        height: '100vh',
        width: '70vw',
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
      <div className='profile'>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
          <img src={profileImg} alt="profile_photo" style={{ height: '70px', width: '70px', borderRadius: "50%" }} />
          {isDarkMode ? (
            <IoIosSunny style={{ width: "30px", height: '30px', cursor: 'pointer' }} onClick={toggleTheme} />
          ) : (
            <FaMoon style={{ width: "30px", height: '30px', cursor: 'pointer' }} onClick={toggleTheme} />
          )}
        </div>
        <div className='profile-details'>
          <div>
            <p>Aradhya Sahoo</p>
            <p>+91 1234567890</p>
          </div>
          <div>
            <IoMdArrowDropdown  style={{width:'20px', height:'20px'}}/>
          </div>
        </div>
      </div>
      <div className='profile-bottom' >
        <div>
          <FaRegCircleUser/>
          <p>My Profile</p>
        </div>
        <div>
        <AiOutlineTeam />
        <p>New Group</p>
        </div>
        <div>
          <AiOutlineUser/>
          <p>Contacts</p>
        </div>
        <div>
          <MdOutlineCall/>
          <p>calls</p>
        </div>
        <div>
          <VscPerson/>
          <p>People Nearby</p>
        </div>
        <div>
          <CiBookmark/>
          <p>Saved Messages</p>
        </div>
        <div>
          <IoSettingsOutline/>
          <p>Seettings</p>
        </div>
        <div>
          <IoPersonAddOutline/>
          <p>Invite Friends</p>
        </div>
        <div>
          <AiOutlineQuestionCircle/>
          <p>Telegram Features</p>
        </div>
      </div>
    </div>
  );
};

export default Menubar;
