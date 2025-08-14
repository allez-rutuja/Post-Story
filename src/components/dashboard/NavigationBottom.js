// src/components/dashboard/NavigationBottom.js
import React, { useState, useEffect } from 'react';
import './NavigationBottom.css';
import { useNavigate } from 'react-router-dom';

// Assuming these image paths are correct based on your local setup
import homeIcon from '../../img/home1.png';
import searchIcon from '../../img/search.png';
import defaultProfilePic from '../../img/person.png'; // A default profile picture
import settingsIconImage from '../../img/setting.png'; // A new image for the settings icon

function NavigationBottom() {
  const navigate = useNavigate();
  const [profilePic, setProfilePic] = useState(defaultProfilePic); // State for profile picture

  useEffect(() => {
    // Attempt to load profile pic from localStorage
    const storedProfilePic = localStorage.getItem('userProfilePic');
    if (storedProfilePic) {
      setProfilePic(storedProfilePic);
    }
  }, []);

  const handleNavClick = (path) => {
    navigate(path);
  };

  return (
    <nav className="navigation-bottom">
      {/* Home Icon */}
      <div className="nav-item" onClick={() => handleNavClick('/home')}>
        <img src={homeIcon} alt="Home" className="nav-icon" />
      </div>

      {/* Search Icon */}
      <div className="nav-item" onClick={() => handleNavClick('/search')}>
        <img src={searchIcon} alt="Search" className="nav-icon" />
      </div>

    

      {/* Settings Icon - NEW */}
      <div className="nav-item" onClick={() => handleNavClick('/settings')}>
        <img src={settingsIconImage} alt="Settings" className="nav-icon" />
      </div>

      {/* Profile Icon */}
     
    </nav>
  );
}

export default NavigationBottom;


