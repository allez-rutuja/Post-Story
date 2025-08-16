import React, { useState } from "react";
import { account, databases } from "../appwrite";
import { ID, Query } from "appwrite";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import logo from '../img/logo.png';

export default function Login() {
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [userId, setUserId] = useState(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    setMessage("");
    setMessageType("");
    if (!mobile || !/^\d{10}$/.test(mobile)) {
      setMessage("Please enter a valid 10-digit mobile number.");
      setMessageType("error");
      return;
    }

    try {
      const response = await databases.listDocuments(
        '688a05c8001f61e183ff', // Replace with your Appwrite database ID
        '688a05e7003de4a97a22', // Replace with your Appwrite collection ID
        [Query.equal('mobile', mobile)]
      );

      if (response.documents.length === 0) {
        setMessage("Mobile number not registered. Please register first.");
        setMessageType("error");
        setTimeout(() => navigate("/register"), 2000);
        return;
      }

      const phoneSession = await account.createPhoneSession(ID.unique(), `+91${mobile}`);
      setUserId(phoneSession.userId);
      setMessage("OTP sent successfully to your mobile number!");
      setMessageType("success");
    } catch (err) {
      console.error("Failed to send OTP:", err);
      setMessage(`Failed to send OTP: ${err.message}`);
      setMessageType("error");
    }
  };

  const handleVerifyOtp = async () => {
    setMessage("");
    setMessageType("");
    if (!otp) {
      setMessage("Please enter the OTP you received.");
      setMessageType("error");
      return;
    }

    try {
      await account.updatePhoneSession(userId, otp);
      setMessage("Login successful! Redirecting to home...");
      setMessageType("success");

      

      const response = await databases.listDocuments(
        '688a05c8001f61e183ff',
        '688a05e7003de4a97a22',
        [Query.equal('mobile', mobile)]
      );
      if (response.documents.length > 0) {
        const userData = response.documents[0];
        localStorage.setItem('userName', userData.name);
        const photoURL = `https://[https://fra.cloud.appwrite.io/v1]/v1/storage/buckets/YOUR_BUCKET_ID/files/${userData.photoId}/view?project=YOUR_APPWRITE_PROJECT_ID`;
        localStorage.setItem('userProfilePic', photoURL);
      }
      
      setTimeout(() => navigate("/home"), 1500);
    } catch (err) {
      console.error("OTP verification failed:", err);
      setMessage(`Login failed: ${err.message}`);
      setMessageType("error");
    }
  };

  // New function for Facebook login
    const handleFacebookLogin = async () => {
    try {
      const successUrl = 'https://post-story.vercel.app/home'; 
      const failureUrl = 'https://post-story.vercel.app/login';
      
      await account.createOAuth2Session('facebook', successUrl, failureUrl);
    } catch (error) {
      console.error("Facebook login failed:", error);
    }
  };
  
  // New function for Google login
// New function for Google login
  const handleGoogleLogin = async () => {
    try {
      const successUrl = 'https://post-story.vercel.app/home'; 
      const failureUrl = 'https://post-story.vercel.app/login'; 
      
      await account.createOAuth2Session('google', successUrl, failureUrl);
    } catch (error) {
      console.error("Google login failed:", error);
    }
  };

  return (
    <div className="login-container">
      <h3 className="login-title">Login</h3>
      <img src={logo} alt="PostStory Logo" className="login-logo" />

      {message && (
        <div className={`p-3 mb-4 rounded-md text-center ${messageType === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
          {message}
        </div>
      )}

      <input
        className="login-input"
        type="text"
        placeholder="Mobile Number"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
      />
      <input
        className="login-input"
        type="text"
        placeholder="OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <p className="resend-text" onClick={handleSendOtp}>Resend OTP</p>
      
      <div className="policy-container">
        <input type="checkbox" id="policy-checkbox" />
        <label htmlFor="policy-checkbox">Policy</label>
      </div>

      <button className="login-btn" onClick={handleVerifyOtp}>
        Login
      </button>

      {/* Add the Facebook login button here */}
      <button className="facebook-btn" onClick={handleFacebookLogin}>
        Continue with Facebook
      </button>
<br>
</br>
      {/* Update the Google login button with the new handler */}
      <button className="google-btn" onClick={handleGoogleLogin}>
        Continue with Google
      </button>

      <a href="/register" className="register-link">Register Here</a>
    </div>
  );
}
