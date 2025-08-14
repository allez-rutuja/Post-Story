import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../dashboard/Header';
import NavigationBottom from '../dashboard/NavigationBottom';
import './TermsAndServicesPage.css';

// SVG icon for the back button in the header
const BackIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
    </svg>
);

function TermsAndServicesPage() {
    const navigate = useNavigate();

    // The component will display the terms and conditions
    // You can replace this with your actual terms of service content
    const termsContent = [
        {
            title: '1. Acceptance of Terms',
            text: 'By accessing or using our services, you agree to be bound by these Terms and Conditions. If you do not agree with any part of the terms, you may not access the service.',
        },
        {
            title: '2. User Responsibilities',
            text: 'You are responsible for all activities that occur under your account. You agree to use our services in compliance with all applicable local, state, national, and international laws, rules, and regulations.',
        },
        {
            title: '3. Intellectual Property',
            text: 'The service and its original content, features, and functionality are and will remain the exclusive property of [Your Company Name] and its licensors. The service is protected by copyright, trademark, and other laws of both the [Your Country] and foreign countries.',
        },
        {
            title: '4. Limitation of Liability',
            text: 'In no event shall [Your Company Name], nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.',
        },
        {
            title: '5. Changes to Terms',
            text: 'We reserve the right, at our sole discretion, to modify or replace these Terms at any time. By continuing to access or use our service after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, please stop using the service.',
        },
    ];

    // useEffect to add the theme class to the body
    useEffect(() => {
        const theme = localStorage.getItem('theme') || 'light';
        document.body.className = theme + '-theme';
    }, []);

    const handleBackClick = () => {
        navigate(-1); // Navigates back to the previous page
    };

    return (
        <div className="terms-page-container">
            <Header
                title="Terms & Services"
                showBackButton={true}
                onBackButtonClick={handleBackClick}
            />

            <main className="terms-main-content">
                <div className="terms-text-container">
                    <h1 className="terms-title">Terms & Services</h1>
                    <p className="last-updated">Last Updated: August 2, 2025</p>
                    
                    {termsContent.map((section, index) => (
                        <div key={index}>
                            <h2 className="terms-subtitle">{section.title}</h2>
                            <p>{section.text}</p>
                        </div>
                    ))}

                    <p>If you have any questions about these Terms, please contact us.</p>
                </div>
            </main>
            
            <NavigationBottom />
        </div>
    );
}

export default TermsAndServicesPage;
