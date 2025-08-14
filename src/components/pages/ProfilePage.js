
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NavigationBottom from '../dashboard/NavigationBottom';
import defaultProfilePic from '../../img/person.png';
import './ProfilePage.css';
import { databases, storage } from '../../appwrite';
import { ID } from 'appwrite';

function ProfilePage() {
  const [profilePic, setProfilePic] = useState(localStorage.getItem('userProfilePic') || defaultProfilePic);
  const [userName, setUserName] = useState(localStorage.getItem('userName') || 'John Doe');
  const [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail') || '');
  const [userPhone, setUserPhone] = useState(localStorage.getItem('userPhone') || '');
  const [userBio, setUserBio] = useState(localStorage.getItem('userBio') || 'Welcome to my profile! I love creating and sharing.');
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState('');
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [showThemeOptions, setShowThemeOptions] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedAccountId = localStorage.getItem('accountId');

    const fetchUserProfile = async (accountId) => {
      try {
        const userDoc = await databases.getDocument(
          '688a05c8001f61e183ff', 
          '688a05e7003de4a97a22', 
          accountId
        );
        
        setUserName(userDoc.name);
        setUserEmail(userDoc.email);
        setUserPhone(userDoc.mobile);
        setUserBio(userDoc.bio || 'Welcome to my profile! I love creating and sharing.');
        
        let photoURL = userDoc.photoUrl;
        if (!photoURL && userDoc.photoId) {
            photoURL = `https://fra.cloud.appwrite.io/v1/storage/buckets/688a04e5001688297a7d/files/${userDoc.photoId}/view?project=6889fa6a00124e2115b7`;
        }
        setProfilePic(photoURL || defaultProfilePic);
        
        localStorage.setItem('userName', userDoc.name);
        localStorage.setItem('userProfilePic', photoURL || '');
        localStorage.setItem('userEmail', userDoc.email);
        localStorage.setItem('userPhone', userDoc.mobile);
        localStorage.setItem('userBio', userDoc.bio || 'Welcome to my profile! I love creating and sharing.');

      } catch (err) {
        if (err.code === 404) {
          try {
            const newUserDoc = await databases.createDocument(
              '688a05c8001f61e183ff',
              '688a05e7003de4a97a22',
              accountId,
              { 
                name: localStorage.getItem('userName') || 'New User', 
                email: localStorage.getItem('userEmail') || '', 
                mobile: '', 
                bio: localStorage.getItem('userBio') || '',
                userId: accountId,
                photoId: '',
                photoUrl: ''
              }
            );
            fetchUserProfile(accountId);
            setMessage("Profile created successfully!");
          } catch (createErr) {
            console.error("Failed to create new user profile:", createErr);
            setMessage("Failed to create profile data.");
          }
        } else {
          console.error("Failed to fetch user profile:", err);
          setMessage("Failed to load profile data.");
        }
      }
    };
    
    if (storedAccountId) {
      fetchUserProfile(storedAccountId);
    } else {
      navigate('/register');
    }

    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) setTheme(storedTheme);
  }, [navigate]);
  
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('edit') === 'true') {
      setIsEditing(true);
    }
  }, [location.search]);

  useEffect(() => {
    document.body.className = theme + '-theme';
  }, [theme]);
  
  const handleProfilePicChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    setMessage('Uploading new profile photo...');

    try {
      const storedAccountId = localStorage.getItem('accountId');
      if (!storedAccountId) {
        setMessage('Error: Not logged in.');
        return;
      }
      
      const fileResponse = await storage.createFile(
        '688a04e5001688297a7d', 
        ID.unique(),
        file
      );

      const newPhotoURL = `https://fra.cloud.appwrite.io/v1/storage/buckets/688a04e5001688297a7d/files/${fileResponse.$id}/view?project=6889fa6a00124e2115b7`;
      
      let userDoc;
      try {
        userDoc = await databases.getDocument(
          '688a05c8001f61e183ff',
          '688a05e7003de4a97a22',
          storedAccountId
        );
      } catch (docErr) {
        if (docErr.code === 404) {
          userDoc = await databases.createDocument(
            '688a05c8001f61e183ff',
            '688a05e7003de4a97a22',
            storedAccountId,
            { photoId: fileResponse.$id, photoUrl: newPhotoURL, name: userName, email: userEmail, mobile: userPhone, bio: userBio, userId: storedAccountId }
          );
        } else {
          throw docErr;
        }
      }
      
      // FIX: Added a try-catch block around the delete operation
      if (userDoc && userDoc.photoId) {
        try {
          await storage.deleteFile('688a04e5001688297a7d', userDoc.photoId);
        } catch (deleteError) {
          console.warn("Failed to delete old profile picture. It may have already been removed.", deleteError);
          // Continue with the update even if the old file is not found
        }
      }
      
      await databases.updateDocument(
        '688a05c8001f61e183ff',
        '688a05e7003de4a97a22',
        storedAccountId,
        { photoId: fileResponse.$id, photoUrl: newPhotoURL }
      );
      
      setProfilePic(newPhotoURL);
      localStorage.setItem('userProfilePic', newPhotoURL);
      setMessage('Profile photo updated successfully!');

    } catch (err) {
      console.error("Failed to update profile picture:", err);
      setMessage('Failed to update profile picture.');
    }
  };

  const handleSaveProfile = async () => {
    try {
      const storedAccountId = localStorage.getItem('accountId');
      if (!storedAccountId) {
        setMessage('Error: Not logged in.');
        return;
      }

      await databases.updateDocument(
        '688a05c8001f61e183ff',
        '688a05e7003de4a97a22',
        storedAccountId,
        {
          name: userName,
          email: userEmail,
          mobile: userPhone,
          bio: userBio,
        }
      );
      
      localStorage.setItem('userName', userName);
      localStorage.setItem('userEmail', userEmail);
      localStorage.setItem('userPhone', userPhone);
      localStorage.setItem('userBio', userBio);
      setIsEditing(false);
      setMessage('Profile saved successfully!');
      setTimeout(() => setMessage(''), 3000);
      
    } catch (err) {
      console.error('Failed to save profile:', err);
      setMessage('Failed to save profile.');
    }
  };

  const handleCancelEdit = () => {
    setUserName(localStorage.getItem('userName') || 'John Doe');
    setUserEmail(localStorage.getItem('userEmail') || '');
    setUserPhone(localStorage.getItem('userPhone') || '');
    setUserBio(localStorage.getItem('userBio') || 'Welcome to my profile! I love creating and sharing.');
    setIsEditing(false);
    setMessage('Edit cancelled.');
    setTimeout(() => setMessage(''), 3000);
  };
  
  const handleThemeChangeClick = () => {
    setShowThemeOptions(true);
  };

  const handleSetTheme = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    setShowThemeOptions(false);
    setMessage(`Theme set to ${newTheme}!`);
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className={`profile-page-container ${theme}-theme`}>
      <main className="profile-main-content">
        <div className="profile-header-section">
          {message && (
            <div className={`message-box ${message.includes('successfully') ? 'success' : 'info'}`}>
              {message}
            </div>
          )}

          <div className="profile-pic-wrapper">
            <img
              src={profilePic}
              alt="Profile"
              className="profile-pic-large"
              onError={(e) => { e.target.onerror = null; e.target.src = defaultProfilePic; }}
            />
            {isEditing && (
              <label htmlFor="profile-pic-upload" className="edit-pic-overlay">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175M4.318 16.318A4.486 4.486 0 0010.58 18.006c.38.054.757.112 1.134.175m0-13.5c.84-.08 1.68-.147 2.52-.193m0 0A2.31 2.31 0 0118.828 6.175M16.5 18.006A4.486 4.486 0 0013.42 15.69a2.31 2.31 0 01-2.186-1.06l-.74-1.48m1.92-2.308a2.31 2.31 0 011.828 1.06l.74 1.48m0 0l.114.228m1.92-2.308a2.31 2.31 0 011.828 1.06l.74 1.48m0 0l.114.228M12 10.5V2.25m-4.5 4.5L12 10.5m0 0l4.5-4.5M12 10.5V18" />
                </svg>
                <input
                  id="profile-pic-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePicChange}
                  style={{ display: 'none' }}
                />
              </label>
            )}
          </div>
          {isEditing ? (
            <>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="profile-name-input"
                placeholder="Your Name"
              />
              <input
                type="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                className="profile-name-input"
                placeholder="Your Email"
              />
              <input
                type="tel"
                value={userPhone}
                onChange={(e) => setUserPhone(e.target.value)}
                className="profile-name-input"
                placeholder="Your Phone Number"
              />
              <textarea
                value={userBio}
                onChange={(e) => setUserBio(e.target.value)}
                className="profile-bio-textarea"
                rows="3"
                placeholder="Tell us about yourself..."
              />
              <div className="profile-action-buttons-edit">
                <button onClick={handleSaveProfile} className="profile-action-button save-button">Save Profile</button>
                <button onClick={handleCancelEdit} className="profile-action-button cancel-button">Cancel</button>
              </div>
            </>
          ) : (
            <>
              <h1 className="profile-name">{userName}</h1>
              <p className="profile-bio">{userBio}</p>
              <div className="profile-contact-info">
                <p>Email: {userEmail}</p>
                <p>Phone: {userPhone}</p>
              </div>
              <button onClick={() => setIsEditing(true)} className="profile-action-button edit-button">Edit Profile</button>
            </>
          )}

          <div className="profile-additional-options">
            <button onClick={handleThemeChangeClick} className="profile-action-button theme-button">
              Theme Change
              <svg className="arrow-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        </div>
      </main>
      <NavigationBottom />

      {showThemeOptions && (
        <div className="theme-modal-overlay">
          <div className="theme-modal-content">
            <h2>Select Theme</h2>
            <div className="theme-options">
              <button onClick={() => handleSetTheme('light')} className="theme-option-button light-theme-option">White</button>
              <button onClick={() => handleSetTheme('dark')} className="theme-option-button dark-theme-option">Black</button>
            </div>
            <button onClick={() => setShowThemeOptions(false)} className="theme-modal-close-button">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;