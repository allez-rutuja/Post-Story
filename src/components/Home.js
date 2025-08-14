// src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

// Import the original Header component
import Header from './dashboard/Header';
import PostStorySection from './dashboard/PostStorySection';
import CategorySection from './dashboard/CategorySection';
import NavigationBottom from './dashboard/NavigationBottom';

import img1 from '../img/1.jpg';
import img2 from '../img/2.jpg';
import img3 from '../img/3.jpg';
import img4 from '../img/4.jpg';

import diwaliImg from '../img/5.jpg';
import christmasImg from '../img/6.jpg';

import birthdayImg from '../img/7.jpg';
import anniversaryImg from '../img/8.jpg';

const trendingItems = [
  { id: 1, imageUrl: img1, title: 'Minimalist Art' },
  { id: 2, imageUrl: img2, title: 'Ocean View' },
  { id: 3, imageUrl: img3, title: 'Greenery' },
  { id: 4, imageUrl: img4, title: 'Plant Pot' },
];

const festivalItems = [
  // These IDs are now unique and don't overlap with trending items
  { id: 10, imageUrl: diwaliImg, title: 'Diwali' },
  { id: 11, imageUrl: christmasImg, title: 'Christmas' },
];

const bestWishesItems = [
    // These IDs are also unique
    { id: 20, imageUrl: birthdayImg, title: 'Birthday' },
    { id: 21, imageUrl: anniversaryImg, title: 'Anniversary' },
];

function Home() {
  return (
    <div className="home-dashboard-container">
      <Header showShareButton={false} />
      <main className="dashboard-main-content">
        <PostStorySection />
        <CategorySection title="Trending" items={trendingItems} />
        <CategorySection title="Festival & Celebration" items={festivalItems} />
        <CategorySection title="Best Wishes" items={bestWishesItems} />
      </main>
      <NavigationBottom />
    </div>
  );
}

export default Home;