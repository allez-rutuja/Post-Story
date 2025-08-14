// src/components/pages/TutorialPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../dashboard/Header';
import NavigationBottom from '../dashboard/NavigationBottom';
import './TutorialPage.css';

// SVG icons for visual appeal
const PlayIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 play-icon">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.97 12l-6.848-3.424A1 1 0 008.122 8.766l.006 6.468a1 1 0 001.002.827l6.848-3.424a1 1 0 000-1.782z" />
    </svg>
);

const ArrowIcon = () => (
    <svg className="arrow-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>
);

function TutorialPage() {
    const navigate = useNavigate();

    // Placeholder data for tutorials
    const tutorials = [
        { id: 1, title: 'Getting Started with Your Account', description: 'A quick guide to setting up your profile and managing your account settings.' },
        { id: 2, title: 'How to Download and Post Content', description: 'Learn the steps to download, edit, and share content with the community.' },
        { id: 3, title: 'Exploring the Search Feature', description: 'Tips and tricks to find the content you love using our powerful search.' },
        { id: 4, title: 'Connecting with Others', description: 'Discover how to follow other users and build your network.' },
        { id: 5, title: 'Managing Your Privacy Settings', description: 'Understand your privacy options and how to control who sees your content.' },
    ];

    const handleTutorialClick = (id) => {
        // Here you can navigate to a detailed tutorial page, e.g., /tutorial/1
        console.log(`Navigating to tutorial with ID: ${id}`);
        // Example: navigate(`/tutorial/${id}`);
    };

    return (
        <div className="tutorial-page-container">
            <Header title="Tutorials" />
            
            <main className="tutorial-main-content">
                <h1 className="main-title">Step-by-Step Guides</h1>
                <p className="subtitle">Learn how to use all the features of our app.</p>

                <div className="tutorial-list">
                    {tutorials.map(tutorial => (
                        <button key={tutorial.id} className="tutorial-item" onClick={() => handleTutorialClick(tutorial.id)}>
                            <div className="item-content">
                                <span className="item-icon">
                                    <PlayIcon />
                                </span>
                                <div className="item-text-group">
                                    <h3 className="item-title">{tutorial.title}</h3>
                                    <p className="item-description">{tutorial.description}</p>
                                </div>
                            </div>
                            <span className="item-arrow">
                                <ArrowIcon />
                            </span>
                        </button>
                    ))}
                </div>
            </main>

            <NavigationBottom />
        </div>
    );
}

export default TutorialPage;
