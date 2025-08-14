// src/components/pages/MyPostsPage.js
import React, { useState, useEffect } from 'react';
import Header from '../dashboard/Header';
import NavigationBottom from '../dashboard/NavigationBottom';
import { databases } from '../../appwrite'; // Assuming a central appwrite client file
import { Query } from 'appwrite'; // Correct import for the Query object
import './MyPosts.css';

function MyPostsPage() {
    // State to store the user's posts (images and videos)
    const [userPosts, setUserPosts] = useState([]);
    // State to manage loading status
    const [loading, setLoading] = useState(true);
    // State to store any error messages
    const [error, setError] = useState(null);
    // State to store the current user's ID
    const [userId, setUserId] = useState(null);
    // State for tab navigation, 'images' is the default tab
    const [currentTab, setCurrentTab] = useState('images');

    // Filter posts based on the current active tab
    const filteredPosts = userPosts.filter(post => post.type === currentTab);

    useEffect(() => {
        const fetchUserPosts = async () => {
            setLoading(true);
            setError(null);
            
            try {
                // Retrieve the current user's ID from local storage.
                // The 'accountId' must be saved to localStorage after a user logs in.
                // Example: localStorage.setItem('accountId', user.$id);
                const currentUserId = localStorage.getItem('accountId');

                if (!currentUserId) {
                    setError("User not authenticated. Please log in.");
                    setLoading(false);
                    return;
                }
                setUserId(currentUserId);
                
                // Define your Appwrite Database ID and Collection ID
                const databaseId = '688a05c8001f61e183ff'; // Database ID from your Appwrite console
                const postsCollectionId = '688a05e7003de4a97a22'; // <<--- REPLACE WITH YOUR COLLECTION ID

                // Query the Appwrite database for documents where the 'userId' attribute matches the current user's ID
                // Make sure your posts collection has a 'userId' string attribute
                const response = await databases.listDocuments(
                    databaseId,
                    postsCollectionId,
                    [Query.equal('userId', currentUserId)]
                );
                
                // Process the response and update the state
                const fetchedPosts = response.documents.map(doc => ({
                    id: doc.$id,
                    name: doc.name,
                    type: doc.type, // Assumes a 'type' attribute exists ('image' or 'video')
                    url: doc.url, // Assumes a 'url' attribute exists for the file path
                    // Add other fields as needed
                }));

                setUserPosts(fetchedPosts);
            } catch (err) {
                setError(`Failed to fetch posts: ${err.message}`);
                console.error("Appwrite fetch error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchUserPosts();
    }, []); // Empty dependency array means this effect runs once on mount

    if (loading) {
        return (
            <div className="my-posts-container loading-screen">
                <Header title="My Posts" backButton={true} />
                <div className="loading-spinner"></div>
                <p>Loading your posts...</p>
                <NavigationBottom />
            </div>
        );
    }

    if (error) {
        return (
            <div className="my-posts-container error-screen">
                <Header title="My Posts" backButton={true} />
                <div className="error-content">
                    <img src="/path-to-your-logo.png" alt="HosBook" className="app-logo" />
                    <p>Error: {error}</p>
                </div>
                <NavigationBottom />
            </div>
        );
    }

    return (
        <div className="my-posts-container">
            {/* Header component from your Settings page */}
            <Header title="My Posts" backButton={true} />
            
            <main className="my-posts-main">
                {/* Tab navigation for images and videos */}
                <div className="posts-tab-nav">
                    <button 
                        className={`tab-button ${currentTab === 'images' ? 'active' : ''}`}
                        onClick={() => setCurrentTab('images')}
                    >
                        IMAGES
                    </button>
                    <button 
                        className={`tab-button ${currentTab === 'videos' ? 'active' : ''}`}
                        onClick={() => setCurrentTab('videos')}
                    >
                        VIDEOS
                    </button>
                </div>

                <div className="posts-list-container">
                    {filteredPosts.length > 0 ? (
                        <div className="posts-grid">
                            {filteredPosts.map((post) => (
                                <div key={post.id} className="post-item">
                                    {post.type === 'images' ? (
                                        <img src={post.url} alt={post.name} className="post-image" />
                                    ) : (
                                        <video src={post.url} className="post-video" controls />
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="no-posts-message">
                            You have no {currentTab} saved yet.
                        </div>
                    )}
                </div>
            </main>
            
            <NavigationBottom />
        </div>
    );
}

export default MyPostsPage;