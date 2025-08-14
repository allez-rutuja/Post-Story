// src/components/pages/DownloadPage.js
import React, { useState, useEffect } from 'react';
import Header from '../dashboard/Header';
import NavigationBottom from '../dashboard/NavigationBottom';
import './DownloadPage.css'; // Create this CSS file

// For demonstration, let's assume some dummy saved/shared images
// In a real app, you would fetch these from local storage or a backend API
import savedImage1 from '../../img/5.jpg';
import savedImage2 from '../../img/6.jpg';
import sharedImage1 from '../../img/1.jpg';

const dummySavedAndSharedImages = [
  { id: 'dl1', imageUrl: savedImage1, title: 'Saved Festival Image', type: 'saved' },
  { id: 'dl2', imageUrl: savedImage2, title: 'Saved Celebration', type: 'saved' },
  { id: 'dl3', imageUrl: sharedImage1, title: 'Shared Trending Post', type: 'shared' },
  // Add more dummy data as needed
];

function DownloadPage() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    // In a real application, you would load saved/shared images here
    // For now, we use dummy data
    setImages(dummySavedAndSharedImages);
  }, []);

  return (
    <div className="download-page-container">
      <Header />
      <main className="download-main-content">
        <h2>Your Saved & Shared Images</h2>

        {images.length > 0 ? (
          <div className="downloaded-images-grid">
            {images.map(image => (
              <div key={image.id} className="downloaded-image-item">
                <img src={image.imageUrl} alt={image.title} className="downloaded-image" />
                <p className="image-title">{image.title}</p>
                <span className={`image-type ${image.type}`}>{image.type}</span>
              </div>
            ))}
          </div>
        ) : (
          <p>No saved or shared images yet.</p>
        )}
      </main>
      <NavigationBottom />
    </div>
  );
}

export default DownloadPage;