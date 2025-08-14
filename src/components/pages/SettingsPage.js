import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationBottom from '../dashboard/NavigationBottom';
import './SettingsPage.css';

// SVG icons for a cleaner look
const BusinessIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.75a2.25 2.25 0 00-2.25-2.25h-2.5a2.25 2.25 0 00-2.25 2.25V18a2.25 2.25 0 002.25 2.25h2.5a2.25 2.25 0 002.25-2.25v-3.25z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21.75a2.25 2.25 0 002.25-2.25v-3.25a2.25 2.25 0 00-2.25-2.25H9.75a2.25 2.25 0 00-2.25 2.25V18a2.25 2.25 0 002.25 2.25H12z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75a.75.75 0 00-.75-.75h-18a.75.75 0 00-.75.75v3.25a.75.75 0 00.75.75H21a.75.75 0 00.75-.75V6.75z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 12a1.5 1.5 0 011.5-1.5h1.5a1.5 1.5 0 011.5 1.5V15a1.5 1.5 0 01-1.5 1.5h-1.5a1.5 1.5 0 01-1.5-1.5v-3z" />
    </svg>
);

const GalleryIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.25 6.75a.75.75 0 01.75.75v6a.75.75 0 01-1.5 0v-6a.75.75 0 01.75-.75zM12.75 6.75a.75.75 0 01.75.75v6a.75.75 0 01-1.5 0v-6a.75.75 0 01.75-.75z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
    </svg>
);

const TutorialIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 21a9.75 9.75 0 01-9.75-9.75V12a9.75 9.75 0 019.75-9.75h4.5a.75.75 0 01.75.75V18a.75.75 0 01-.75.75h-4.5z" />
    </svg>
);

const ShareIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 11.217a.75.75 0 011.06 1.06l-4.5 4.5a.75.75 0 01-1.06-1.06l4.5-4.5zM12 18a6 6 0 110-12 6 6 0 010 12zM12 18v3M12 3v3" />
    </svg>
);

const StarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 4.25a.562.562 0 00.475.345h4.5a.562.562 0 01.378.96l-3.6 3.75a.562.562 0 00-.184.538l.96 4.725a.562.562 0 01-.861.643l-4.075-2.262a.562.562 0 00-.516 0l-4.075 2.262a.562.562 0 01-.861-.643l.96-4.725a.562.562 0 00-.184-.538l-3.6-3.75a.562.562 0 01.378-.96h4.5a.562.562 0 00.475-.345l2.125-4.25z" />
    </svg>
);

const PrivacyIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const TermsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m3.75 0V18a2.25 2.25 0 002.25 2.25h1.5a2.25 2.25 0 002.25-2.25v-7.5M13.5 10.5h-3.75m3.75 0h-3.75" />
    </svg>
);

const WhatsappIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 9.75a.75.75 0 01-.75-.75V8.25a.75.75 0 00-.75-.75h-10.5a.75.75 0 00-.75.75v.75a.75.75 0 01-.75.75H4.5a.75.75 0 01-.75-.75V8.25a.75.75 0 01.75-.75h1.5a.75.75 0 00.75-.75V4.5a.75.75 0 01.75-.75h1.5a.75.75 0 01.75.75v.75a.75.75 0 00.75.75h1.5a.75.75 0 00.75-.75V4.5a.75.75 0 01.75-.75h1.5a.75.75 0 01.75.75v.75a.75.75 0 00.75.75h1.5a.75.75 0 00.75-.75V8.25a.75.75 0 01.75.75h-1.5zm-1.5-1.5a.75.75 0 00-.75-.75h-15a.75.75 0 00-.75.75v3a.75.75 0 00.75.75h15a.75.75 0 00.75-.75v-3z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6.75 6.75 0 100-13.5 6.75 6.75 0 000 13.5z" />
    </svg>
);

const ArrowIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="item-arrow-icon">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>
);

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="close-icon">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const TwitterIcon = () => (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" className="share-icon twitter-icon">
        <g>
            <path d="M18.244 2.25h3.308l-7.227 8.261 8.526 11.239H12.756l-6.83-8.971L3.454 22.25H0l8.133-10.65L0.867 2.25H4.202l6.096 7.98L18.244 2.25zm-6.286 15.034h1.838L4.464 4.125H2.34L12.01 17.284z"></path>
        </g>
    </svg>
);

const CopyIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="share-icon copy-icon">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 16.5V12a2.25 2.25 0 00-2.25-2.25H9.75M12 21.75a9.75 9.75 0 100-19.5 9.75 9.75 0 000 19.5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5a1.5 1.5 0 011.5-1.5h1.5a1.5 1.5 0 011.5 1.5V6a1.5 1.5 0 01-1.5 1.5H12a1.5 1.5 0 01-1.5-1.5V4.5z" />
    </svg>
);

// New SVG icon for Logout
const LogoutIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l3 3m0 0l-3 3m3-3H9" />
  </svg>
);

function SettingsPage() {
    const navigate = useNavigate();
    const [showShareModal, setShowShareModal] = useState(false);
    const [copiedMessage, setCopiedMessage] = useState(false);

    const shareData = {
        title: 'Check out this awesome app!',
        text: 'I found this great app. You should try it out!',
        url: 'https://example.com'
    };

    const handleShareAppClick = async () => {
        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (err) {
                console.error('Error sharing:', err);
            }
        } else {
            setShowShareModal(true);
        }
    };

    const copyToClipboard = () => {
        const el = document.createElement('textarea');
        el.value = shareData.url;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        setCopiedMessage(true);
        setTimeout(() => setCopiedMessage(false), 2000);
    };

    const handleWhatsAppShare = () => {
        const text = encodeURIComponent(`${shareData.title} ${shareData.text} ${shareData.url}`);
        window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
    };

    const handleTwitterShare = () => {
        const text = encodeURIComponent(shareData.text);
        const url = encodeURIComponent(shareData.url);
        window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
    };

    // New function for logging out
    const handleLogout = () => {
        // Here you would implement your logout logic, such as:
        // 1. Clearing user session/token from local storage or cookies.
        // 2. Making an API call to the backend to invalidate the session.
        // 3. Redirecting the user to the login page.
        console.log("User logged out");
        // For example:
        // localStorage.removeItem('userToken');
        navigate('/login');
    };

    return (
        <div className="settings-page-container">
            <header className="mobile-header">
                <span className="header-title">Your Account</span>
                <span className="header-phone">7620245598</span>
            </header>

            <main className="settings-main-content">
                <div className="settings-section account-section">
                    <button className="settings-item" onClick={() => navigate('/profile')}>
                        <span className="item-icon">
                            <BusinessIcon />
                        </span>
                        <span className="item-text">Edit Profile</span>
                        <span className="item-arrow">
                            <ArrowIcon />
                        </span>
                    </button>
                    <button className="settings-item" onClick={() => navigate('/myposts')}>
                        <span className="item-icon">
                            <GalleryIcon />
                        </span>
                        <span className="item-text">My Post</span>
                        <span className="item-arrow">
                            <ArrowIcon />
                        </span>
                    </button>
                </div>

                <div className="settings-section help-section">
                    <div className="section-header">
                        <h2 className="section-title">Help & Support</h2>
                        <p className="section-subtitle">How can we help you?</p>
                    </div>
                    <button className="settings-item" onClick={() => navigate('/tutorial')}>
                        <span className="item-icon">
                            <TutorialIcon />
                        </span>
                        <span className="item-text">Tutorial</span>
                        <span className="item-arrow">
                            <ArrowIcon />
                        </span>
                    </button>
                    <button className="settings-item" onClick={handleShareAppClick}>
                        <span className="item-icon">
                            <ShareIcon />
                        </span>
                        <span className="item-text">Share App</span>
                        <span className="item-arrow">
                            <ArrowIcon />
                        </span>
                    </button>
                  
                    <button className="settings-item" onClick={() => navigate('/privacy-policy')}>
                        <span className="item-icon">
                            <PrivacyIcon />
                        </span>
                        <span className="item-text">Privacy Policy</span>
                        <span className="item-arrow">
                            <ArrowIcon />
                        </span>
                    </button>
                    <button className="settings-item" onClick={() => navigate('/terms-and-services')}>
                        <span className="item-icon">
                            <TermsIcon />
                        </span>
                        <span className="item-text">Terms & Services</span>
                        <span className="item-arrow">
                            <ArrowIcon />
                        </span>
                    </button>
                    <button className="settings-item" onClick={() => navigate('/help-and-support')}>
                        <span className="item-icon">
                            <WhatsappIcon />
                        </span>
                        <span className="item-text">Help & Support</span>
                        <span className="item-arrow">
                            <ArrowIcon />
                        </span>
                    </button>
                </div>

             

                {/* The new Logout option */}
                <div className="settings-section logout-section">
                    <button className="settings-item logout-item" onClick={handleLogout}>
                        <span className="item-icon logout-icon">
                            <LogoutIcon />
                        </span>
                        <span className="item-text">Logout</span>
                        <span className="item-arrow">
                            <ArrowIcon />
                        </span>
                    </button>
                </div>

            </main>
            
            <NavigationBottom />

            {showShareModal && (
                <div className="share-modal-overlay" onClick={() => setShowShareModal(false)}>
                    <div className="share-modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="share-modal-header">
                            <h2>Share App</h2>
                            <button className="close-button" onClick={() => setShowShareModal(false)}><CloseIcon /></button>
                        </div>
                        <div className="share-options">
                            <button className="share-option-button whatsapp-button" onClick={handleWhatsAppShare}>
                                <WhatsappIcon />
                                <span>WhatsApp</span>
                            </button>
                            <button className="share-option-button twitter-button" onClick={handleTwitterShare}>
                                <TwitterIcon />
                                <span>Twitter</span>
                            </button>
                            <button className="share-option-button copy-link-button" onClick={copyToClipboard}>
                                <CopyIcon />
                                <span>{copiedMessage ? "Copied!" : "Copy Link"}</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SettingsPage;
