// src/components/CategorySection.js
import React from 'react';
import './CategorySection.css'; // Specific styles
import Card from './Card'; // Import the Card component
import { useNavigate, Link } from 'react-router-dom';

function CategorySection({ title, items }) {
  const navigate = useNavigate(); // *** Crucial: Initialize useNavigate hook ***

  // Function to handle "View All" click
  const handleViewAllClick = () => {
    if (title === "Festival Templates") { // Changed from "Festival & Celebration" to "Festival Templates" to match your UI
      navigate('/festival-images'); // Example route for all festival images
    } else if (title === "Trending Now") { // Changed from "Trending" to "Trending Now" to match your UI
      navigate('/trending'); // Navigate to your existing TrendingPage or a dedicated 'all trending' page
    }
  };

  return (
    <section className="category-section">
      <div className="category-header"> {/* *** Crucial: Added div for alignment *** */}
        <h3>{title}</h3>
        {/* The "View All" button is conditionally rendered here */}
        {(title === "Festival Templates" || title === "Trending Now") && ( // Check for the exact titles
          <button className="view-all-button" onClick={handleViewAllClick}>
            View All
          </button>
        )}
      </div>
       <div className="items-grid">
        {items.map(item => (
          // Wrap the Card component with a Link
          <Link key={item.id} to={`/post/${item.id}`}>
            <Card
              imageUrl={item.imageUrl}
              title={item.title}
              // The linkTo prop is now handled by the Link component
            />
          </Link>
        ))}
      </div>
    </section>
  );
}

export default CategorySection;