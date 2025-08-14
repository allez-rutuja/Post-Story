// src/components/dashboard/PostStorySection.js
import React from 'react';
import './PostStorySection.css'; // You'll need to create this CSS file

function PostStorySection() {
  return (
    <section className="post-story-section">
      <div className="post-story-content">
        <h2>Post Story - Make Every Post Count.</h2>
        <p>Create and share stunning images for festivals, wishes, and special moments!</p>
        {/* You can add a button here to navigate to the PostDetailPage for creating a new post */}
        {/* <button className="create-post-button">Create New Post</button> */}
      </div>
    </section>
  );
}

export default PostStorySection;