// src/components/pages/FestivalPage.js
import React from 'react';
import Header from '../dashboard/Header';
import NavigationBottom from '../dashboard/NavigationBottom';
import Card from '../dashboard/Card'; // Import Card component to display images
import './FestivalPage.css'; // You'll create this CSS file for styling the grid



function FestivalPage() {
  // *** Populate this array with ALL your festival image data ***
  const allFestivalItems = [
  
  ];

  return (
    <div className="festival-page-container">
      <Header />
      <main className="festival-main-content">
        <h2 className="festival-heading">All Festival & Celebration Images</h2>
        <div className="full-festival-images-grid"> {/* Apply grid styles here */}
          {allFestivalItems.map(item => (
            <Card
              key={item.id}
              imageUrl={item.imageUrl}
              title={item.title}
              linkTo={item.linkTo} // If cards on this page should also be clickable
            />
          ))}
        </div>
      </main>
      <NavigationBottom />
    </div>
  );
}

export default FestivalPage;