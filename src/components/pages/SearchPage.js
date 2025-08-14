// src/components/pages/SearchPage.js
import React, { useState, useEffect } from 'react';
import Header from '../dashboard/Header';
import NavigationBottom from '../dashboard/NavigationBottom';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './SearchPage.css';

// Import your local images here (these should match what's in App.js)
// In a real app, you'd fetch these from an API
import image1 from '../../img/1.jpg';
import image2 from '../../img/2.jpg';
import image3 from '../../img/3.jpg';
import image4 from '../../img/4.jpg';
import image5 from '../../img/5.jpg';
import image6 from '../../img/6.jpg';

// Define your "mock" image data here, similar to how it's done in App.js
// In a real application, you'd fetch this from a backend or global state.
const allAvailableImages = [
  { id: 't1', imageUrl: image1, title: 'Hot Trends', category: 'trending' },
  { id: 't2', imageUrl: image2, title: 'New Viral', category: 'trending' },
  { id: 't3', imageUrl: image3, title: 'Latest Buzz', category: 'trending' },
  { id: 'f1', imageUrl: image4, title: 'Diwali Special', category: 'festivals' },
  { id: 'f2', imageUrl: image5, title: 'Birthday Bash', category: 'festivals' },
  { id: 'f3', imageUrl: image6, title: 'Eid Greetings', category: 'festivals' },
  { id: 't4', imageUrl: image1, title: 'Summer Festival', category: 'festivals' },
  { id: 't5', imageUrl: image2, title: 'Winter Wonders', category: 'trending' },
  { id: 't6', imageUrl: image3, title: 'Graduation', category: 'events' },
];


function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    // Filter images whenever the searchTerm changes
    if (searchTerm.trim() === '') {
      setSearchResults([]); // Clear results if search bar is empty
    } else {
      const filtered = allAvailableImages.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(filtered);
    }
  }, [searchTerm]);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // New handler for clicking a search result image
  const handleImageClick = (item) => {
    // Navigate to PostDetailPage, passing the item's ID as a URL parameter
    // and the image URL as state for PostDetailPage to use.
    navigate(`/post/${item.id}`, { state: { imageUrl: item.imageUrl } });
  };

  return (
    <div className="search-page-container">
      <Header />
      <main className="search-main-content">
        <div className="search-bar-container">
          <input
            type="text"
            placeholder="Search for images (e.g., Diwali, Birthday, Trending)..."
            value={searchTerm}
            onChange={handleInputChange}
            className="search-input"
          />
        </div>

        <div className="search-results">
          {searchResults.length > 0 ? (
            searchResults.map(item => (
              <div
                key={item.id}
                className="search-result-item"
                onClick={() => handleImageClick(item)} // Add onClick handler here
              >
                <img src={item.imageUrl} alt={item.title} className="search-result-image" />
                <p className="search-result-title">{item.title}</p>
              </div>
            ))
          ) : (
            searchTerm.trim() !== '' && <p>No results found for "{searchTerm}"</p>
          )}
          {searchTerm.trim() === '' && <p>Start typing to search for images.</p>}
        </div>
      </main>
      <NavigationBottom />
    </div>
  );
}

export default SearchPage;