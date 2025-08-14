// src/components/dashboard/Header.js
import React, { useState, useEffect } from 'react';
import './Header.css';
import defaultAvatar from '../../img/default-avatar.jpg';
import appLogo from '../../img/logo.png';

function Header({ showShareButton = true }) { // Add a prop with a default value
  const [userName, setUserName] = useState("Guest");
  const [userProfilePic, setUserProfilePic] = useState(defaultAvatar);
  const [showShareMenu, setShowShareMenu] = useState(false);

  useEffect(() => {
    const storedName = localStorage.getItem('userName');
    const storedProfilePic = localStorage.getItem('userProfilePic');

    if (storedName) {
      setUserName(storedName);
    }
    if (storedProfilePic) {
      setUserProfilePic(storedProfilePic);
    }
  }, []);

  const handleShareClick = () => {
    setShowShareMenu(!showShareMenu);
  };

  const shareToSocial = (platform) => {
    let shareUrl = "";
    const currentUrl = window.location.href;
    const shareText = `Check out this post by ${userName}!`;

    switch (platform) {
      case 'whatsapp':
        shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + " " + currentUrl)}`;
        break;
     case 'instagram':
  shareUrl = `https://www.instagram.com/yourusername/`; // Or any public profile
  break;

      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}&quote=${encodeURIComponent(shareText)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(currentUrl)}`;
        break;
      default:
        return;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank');
      setShowShareMenu(false);
    }
  };

  return (
    <header className="header">
      <div className="profile">
        <img
          src={userProfilePic}
          alt={userName}
          className="profile-pic"
          onError={(e) => { e.target.src = defaultAvatar; }}
        />
        <div className="profile-info">
          <h3>{userName}</h3>
          {showShareButton && ( // Conditionally render based on the prop
            <div className="share-container">
              <button className="share-button" onClick={handleShareClick}>
                Share Post
              </button>
              {showShareMenu && (
                <div className="share-menu">
                  <button onClick={() => shareToSocial('whatsapp')}>WhatsApp</button>
                  <button onClick={() => shareToSocial('instagram')}>Instagram</button>
                  <button onClick={() => shareToSocial('facebook')}>Facebook</button>
                  <button onClick={() => shareToSocial('twitter')}>X (Twitter)</button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="app-logo-container">
        <img src={appLogo} alt="App Logo" className="app-logo" />
      </div>
    </header>
  );
}

export default Header;