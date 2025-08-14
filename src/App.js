// src/App.js
import { Client, ID } from 'appwrite';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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
    { id: 1, imageUrl: image1, title: 'Trending Post 1' }, // Changed 'img' to 'imageUrl'
    { id: 2, imageUrl: image2, title: 'Trending Post 2' }, // Changed 'img' to 'imageUrl'
    { id: 3, imageUrl: image3, title: 'Trending Post 3' }, // Changed 'img' to 'imageUrl'
  ];

   const festivalItems = [
    { id: 4, imageUrl: image4, title: 'Festival Post 1' }, // Changed 'img' to 'imageUrl'
    { id: 5, imageUrl: image5, title: 'Festival Post 2' }, // Changed 'img' to 'imageUrl'
    { id: 6, imageUrl: image6, title: 'Festival Post 3' }, // Changed 'img' to 'imageUrl'
  ];

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
       <Route path="/" element={<Home />} /> 
<Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
    
        {/* Protected Routes that require a user to be logged in */}
        <Route
          path="/home"
          element={
            <>
              <Header />
              <main>
                <PostStorySection />
                      <CategorySection title="Trending Now" items={trendingItems} />
                <CategorySection title="Festival Templates" items={festivalItems} />
              </main>
              <NavigationBottom />
            </>
          }
        />

        {/* Other Page Routes */}
        <Route path="/search" element={<SearchPage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/trending" element={<TrendingPage />} />
        <Route path="/festivals" element={<FestivalPage />} />
        <Route path="/post/:postId" element={<PostDetailPage />} />
        <Route path="/downloads" element={<DownloadPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/MyPosts" element={<MyPosts />}/>
        <Route path="/tutorial" element={<TutorialPage />} />
        {/* Corrected component name from 'Privacy' to 'PrivacyPolicyPage' */}
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        {/* Corrected route path to match the button in SettingsPage */}
        <Route path="/terms-and-services" element={<TermsAndServicesPage />} />
        <Route path="/help-and-support" element={<HelpAndSupportPage />} />
           <Route path="/post-details" element={<PostDetailPage />} />
           <Route path="/post/:postId" element={<PostDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
     