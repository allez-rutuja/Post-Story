// src/components/pages/CreatePage.js
import React from 'react';
import Header from '../dashboard/Header';
import NavigationBottom from '../dashboard/NavigationBottom';

// import './CreatePage.css'; // Create this CSS file for specific styles

function CreatePage() {
  return (
    <div className="create-page-container">
      <Header />
      <main className="create-main-content" style={{ padding: '20px', textAlign: 'center' }}>
        <h2>Create New Content</h2>
        <p>Start designing your next post or story!</p>
        {/* Add forms or tools for content creation here */}
      </main>
      <NavigationBottom />
    </div>
  );
}

export default CreatePage;