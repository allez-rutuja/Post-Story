// src/components/pages/HelpAndSupportPage.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../dashboard/Header';
import NavigationBottom from '../dashboard/NavigationBottom';
import './HelpAndSupportPage.css';

function HelpAndSupportPage() {
    const navigate = useNavigate();

    // Mock content for the help page
    const helpTopics = [
        {
            title: 'How to create a new post?',
            text: 'To create a new post, navigate to the "Create" tab from the bottom navigation bar. You can then select a template, add your content, and publish it to your profile.'
        },
        {
            title: 'How to change my profile picture?',
            text: 'You can change your profile picture from the "Edit Profile" section in your account settings. Tap on your current profile picture to upload a new one from your device.'
        },
        {
            title: 'I forgot my password, what should I do?',
            text: 'If you have forgotten your password, please use the "Forgot Password" link on the login screen. You will receive an email with instructions on how to reset it.'
        },
        {
            title: 'How do I contact support?',
            text: 'For further assistance, you can contact our support team through WhatsApp by clicking the "Help & Support" button on the Settings page.'
        }
    ];

    useEffect(() => {
        const theme = localStorage.getItem('theme') || 'light';
        document.body.className = theme + '-theme';
    }, []);

    const handleBackClick = () => {
        navigate(-1); // Navigates back to the previous page
    };

    return (
        <div className="help-page-container">
            <Header
                title="Help & Support"
                showBackButton={true}
                onBackButtonClick={handleBackClick}
            />

            <main className="help-main-content">
                <div className="help-text-container">
                    <h1 className="help-title">Frequently Asked Questions</h1>
                    <p className="last-updated">Last Updated: August 2, 2025</p>

                    {helpTopics.map((topic, index) => (
                        <div key={index} className="help-topic">
                            <h2 className="help-topic-title">{topic.title}</h2>
                            <p className="help-topic-text">{topic.text}</p>
                        </div>
                    ))}
                </div>
            </main>
            
            <NavigationBottom />
        </div>
    );
}

export default HelpAndSupportPage;
