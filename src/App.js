// src/App.js
import { Client, ID } from 'appwrite';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from './components/ProtectedRoute'; // Import our new component

// Import your existing components
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Header from './components/dashboard/Header';
import PostStorySection from './components/dashboard/PostStorySection';
import CategorySection from './components/dashboard/CategorySection';
import NavigationBottom from './components/dashboard/NavigationBottom';
import PostDetailPage from './components/pages/PostDetailPage';
import SearchPage from './components/pages/SearchPage';
import CreatePage from './components/pages/CreatePage';
import DownloadPage from './components/pages/DownloadPage';
import ProfilePage from './components/pages/ProfilePage';
import TrendingPage from './components/pages/TrendingPage';
import FestivalPage from './components/pages/FestivalPage';
import SettingsPage from './components/pages/SettingsPage';
import MyPosts from './components/pages/MyPosts';
import TutorialPage from './components/pages/TutorialPage';
import PrivacyPolicyPage from './components/pages/Privacy';
import TermsAndServicesPage from './components/pages/TermsAndServices';
import HelpAndSupportPage from './components/pages/HelpAndSupportPage'; // Import the new HelpAndSupportPage

// Import your local images here
import image1 from './img/1.jpg';
import image2 from './img/2.jpg';
import image3 from './img/3.jpg';
import image4 from './img/4.jpg';
import image5 from './img/5.jpg';
import image6 from './img/6.jpg';

const client = new Client();
function App() {
  const trendingItems = [
    { id: 1, imageUrl: image1, title: 'Trending Post 1' },
    { id: 2, imageUrl: image2, title: 'Trending Post 2' },
    { id: 3, imageUrl: image3, title: 'Trending Post 3' },
  ];

  const festivalItems = [
    { id: 4, imageUrl: image4, title: 'Festival Post 1' },
    { id: 5, imageUrl: image5, title: 'Festival Post 2' },
    { id: 6, imageUrl: image6, title: 'Festival Post 3' },
  ];

  return (
    <Router>
      <Routes>
        {/* The root URL "/" will now show the Login page. */}
        <Route path="/" element={<Login />} />
        {/* The registration page is also public. */}
        <Route path="/register" element={<Register />} />

        {/* All these routes are now protected. */}
        {/* If the user is not logged in, they will be redirected to the /login page. */}
        <Route path="/home" element={<ProtectedRoute>
              <Home />
            </ProtectedRoute>} />
        <Route path="/search" element={<ProtectedRoute><SearchPage /></ProtectedRoute>} />
        <Route path="/create" element={<ProtectedRoute><CreatePage /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        <Route path="/trending" element={<ProtectedRoute><TrendingPage /></ProtectedRoute>} />
        <Route path="/festivals" element={<ProtectedRoute><FestivalPage /></ProtectedRoute>} />
        <Route path="/post/:postId" element={<ProtectedRoute><PostDetailPage /></ProtectedRoute>} />
        <Route path="/downloads" element={<ProtectedRoute><DownloadPage /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
        <Route path="/MyPosts" element={<ProtectedRoute><MyPosts /></ProtectedRoute>} />
        <Route path="/tutorial" element={<ProtectedRoute><TutorialPage /></ProtectedRoute>} />
        {/* Other public routes that don't require login */}
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/terms-and-services" element={<TermsAndServicesPage />} />
        <Route path="/help-and-support" element={<HelpAndSupportPage />} />
      </Routes>
    </Router>
  );
}

export default App;