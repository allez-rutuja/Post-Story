import React, { useState } from "react";
import { databases, storage } from "../appwrite";
import { ID } from "appwrite";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import logo from '../img/logo.png';

export default function Register() {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const navigate = useNavigate();

  const handleSave = async () => {
    setMessage("");
    setMessageType("");

    if (!name || !mobile || !email) {
      setMessage("Please fill all fields.");
      setMessageType("error");
      return;
    }

    if (!/^\d{10}$/.test(mobile)) {
      setMessage("Please enter a valid 10-digit mobile number.");
      setMessageType("error");
      return;
    }

    try {
      let photoId = "";
      let photoURL = "";
      const userId = ID.unique();

      if (photo) {
        // Upload the photo to Appwrite storage
        const fileResponse = await storage.createFile(
          '688a04e5001688297a7d', // Your Appwrite bucket ID
          ID.unique(),
          photo
        );
        photoId = fileResponse.$id;
        
        // Correctly construct the public URL for the uploaded photo
        photoURL = `https://fra.cloud.appwrite.io/v1/storage/buckets/688a04e5001688297a7d/files/${photoId}/view?project=6889fa6a00124e2115b7`;
      } else {
        // Use a default placeholder URL if no photo is uploaded
        photoURL = "https://placehold.co/120x120/E0E0E0/333333?text=User";
      }

      // Create a new document in your Appwrite database.
      const documentResponse = await databases.createDocument(
        '688a05c8001f61e183ff', // Your Appwrite database ID
        '688a05e7003de4a97a22', // Your Appwrite collection ID
        ID.unique(),
        {
          name,
          mobile,
          email,
          photoId,
          photoUrl: photoURL,
          userId,
        }
      );

      if (documentResponse) {
        // Save ALL user information to local storage
        localStorage.setItem('userName', name);
        localStorage.setItem('userProfilePic', photoURL);
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userPhone', mobile);
        localStorage.setItem('accountId', userId);
        
        setMessage("Registration successful!");
        setMessageType("success");
        navigate('/home');
      }
      
    } catch (err) {
      console.error("Registration failed:", err);
      setMessage("Registration failed: " + err.message);
      setMessageType("error");
    }
  };

  return (
    <div className="register-wrapper min-h-screen flex flex-col items-center justify-center p-4 bg-gray-100 font-sans">
      <div className="register-logo-left mb-8">
        <img
          src={logo}
          alt="PostStory Logo"
          className="w-48 h-auto rounded-lg shadow-md"
          onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/192x108/E0E0E0/333333?text=Logo"; }}
        />
      </div>

      <div className="register-container bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Register</h2>

        {message && (
          <div className={`p-3 mb-4 rounded-md text-center ${messageType === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
            {message}
          </div>
        )}

        <div className="photo-wrapper flex flex-col items-center mb-6">
          {photo ? (
            <img
              src={URL.createObjectURL(photo)}
              alt="Preview"
              className="photo-preview w-32 h-32 object-cover rounded-full border-4 border-gray-300 mb-3"
            />
          ) : (
            <div className="edit-photo w-32 h-32 flex items-center justify-center bg-gray-200 text-gray-600 rounded-full border-4 border-gray-300 mb-3 cursor-pointer">
              Edit Photo
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setPhoto(e.target.files[0])}
            className="file-input text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
          />
        </div>

        <input
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 mb-4"
        />
        <input
          placeholder="Enter your mobile number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 mb-4"
        />
        <input
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 mb-6"
        />
        <button
          className="save-btn w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold p-3 rounded-lg shadow-md transition duration-300 ease-in-out"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  );
}