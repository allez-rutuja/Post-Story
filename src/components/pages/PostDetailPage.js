// src/components/pages/PostDetailPage.js
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import NavigationBottom from '../dashboard/NavigationBottom';
import { databases, storage } from '../../appwrite';
import { ID, Permission, Role } from 'appwrite';
import defaultAvatar from '../../img/logo.png';

// Import all images used on the Home page
import img1 from '../../img/1.jpg';
import img2 from '../../img/2.jpg';
import img3 from '../../img/3.jpg';
import img4 from '../../img/4.jpg';
import diwaliImg from '../../img/5.jpg';
import christmasImg from '../../img/6.jpg';
import birthdayImg from '../../img/7.jpg';
import anniversaryImg from '../../img/8.jpg';
// Import the trending images to use them in the postImages object
import trendingImage1 from '../../img/treading1.jpg';
import trendingImage2 from '../../img/treading2.jpg';
import trendingImage3 from '../../img/treading3.jpg';
import trendingImage4 from '../../img/treading4.jpg';
import trendingImage5 from '../../img/treading5.jpg';
import trendingImage6 from '../../img/treading6.jpg';
import trendingImage7 from '../../img/treading7.jpg';
import trendingImage8 from '../../img/treading8.jpg';
import trendingImage9 from '../../img/treading9.jpg';

// Import icons and images for frames
import addLogoIcon from '../../img/logo.png';
import addTextIcon from '../../img/text.png';
import addStickerIcon from '../../img/sticker.png';
import textColorIcon from '../../img/color.png';
import fontTypeIcon from '../../img/font.png';
import nameIcon from '../../img/name.png';
import logoIcon from '../../img/logoicon.png';
import emailIcon from '../../img/email.png';
import locationIcon from '../../img/location.png';
import webIcon from '../../img/web.png';
import frameIcon from '../../img/frame.png';

// The images you want to use for the frames
import frame1Full from '../../img/9.png';
import frame2Full from '../../img/10.png';
import frame3Full from '../../img/11.png';


import './PostDetailPage.css';

// This array holds the paths to your frame images
const fullFrameImages = [frame1Full, frame2Full, frame3Full];

// --- Appwrite Database IDs (REPLACE WITH YOUR ACTUAL IDs) ---
const databaseId = '688a05c8001f61e183ff';
const myPostsCollectionId = '688a05e7003de4a97a22'; // Corrected to match MyPosts.js
const storageBucketId = '688a04e5001688297a7d';
// -----------------------------------------------------------

// A consolidated list of images to look up based on the postId
const postImages = {
  // IDs for images from Home.js (Trending)
  '1': img1,
  '2': img2,
  '3': img3,
  '4': img4,
  // IDs for festival images from Home.js
  '10': diwaliImg,
  '11': christmasImg,
  // IDs for best wishes images from Home.js
  '20': birthdayImg,
  '21': anniversaryImg,
  // IDs for trending images from TrendingPage.js
  '30': trendingImage1,
  '31': trendingImage2,
  '32': trendingImage3,
  '33': trendingImage4,
  '34': trendingImage5,
  '35': trendingImage6,
  '36': trendingImage7,
  '37': trendingImage8,
  '38': trendingImage9,
};

// State to manage the text and uploaded images on the canvas
const initialElement = {
  text: { value: '', size: 24, x: 50, y: 50 },
  image: { url: '', size: 100, x: 0, y: 0 },
};

function PostDetailPage() {
  const { postId } = useParams();
  const canvasRef = useRef(null);
  const originalImageRef = useRef(null);
  const frameImageRef = useRef(null);

  const [baseImageUrl, setBaseImageUrl] = useState('');
  const [hashtag, setHashtag] = useState('');
  const [userProfilePic, setUserProfilePic] = useState(defaultAvatar);
  const [selectedFrame, setSelectedFrame] = useState(0);
  const [filter, setFilter] = useState('none');
  const [isReady, setIsReady] = useState(false);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    website: '',
  });

  const [dynamicElements, setDynamicElements] = useState(initialElement);
  const [isDragging, setIsDragging] = useState(null); // 'text' or 'image'
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const drawImageOnCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !originalImageRef.current) return;

    const ctx = canvas.getContext('2d');
    const imageToDraw = originalImageRef.current;

    const aspectRatio = imageToDraw.naturalWidth / imageToDraw.naturalHeight;
    const containerWidth = canvas.parentElement ? canvas.parentElement.clientWidth : 400;

    let canvasWidth = containerWidth;
    let canvasHeight = containerWidth / aspectRatio;
    const maxHeight = window.innerHeight * 0.6;
    if (canvasHeight > maxHeight) {
      canvasHeight = maxHeight;
      canvasWidth = maxHeight * aspectRatio;
    }

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.filter = filter;
    ctx.drawImage(imageToDraw, 0, 0, canvas.width, canvas.height);
    ctx.filter = 'none';

    if (frameImageRef.current) {
      ctx.drawImage(frameImageRef.current, 0, 0, canvas.width, canvas.height);
    }
    
    // Only draw dynamic elements if a full frame is selected
    if (selectedFrame >= 0 && selectedFrame <= 2) {
      // Draw uploaded image if it exists
      if (dynamicElements.image.url) {
        const uploadedImage = new Image();
        uploadedImage.src = dynamicElements.image.url;
        uploadedImage.onload = () => {
          const imgSize = dynamicElements.image.size;
          ctx.drawImage(uploadedImage, dynamicElements.image.x, dynamicElements.image.y, imgSize, imgSize);
        };
      }

      // Draw dynamic text if it exists
      if (dynamicElements.text.value) {
        ctx.font = `bold ${dynamicElements.text.size}px Arial`;
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(dynamicElements.text.value, dynamicElements.text.x, dynamicElements.text.y);
      }
    }
  }, [filter, dynamicElements, selectedFrame]);

  useEffect(() => {
    // Load the correct base image based on the postId
    if (postId && postImages[postId]) {
      setBaseImageUrl(postImages[postId]);
    } else {
      setBaseImageUrl('https://placehold.co/400x300/E0E0E0/333333?text=Image+Not+Found');
    }

    // Load other user data from localStorage
    const storedName = localStorage.getItem('userName') || '';
    const storedEmail = localStorage.getItem('userEmail') || '';
    const storedPhone = localStorage.getItem('userPhone') || '';
    const storedWebsite = localStorage.getItem('userWebsite') || '';
    setUserData({
      name: storedName,
      email: storedEmail,
      phone: storedPhone,
      website: storedWebsite
    });

    const storedProfilePic = localStorage.getItem('userProfilePic');
    if (storedProfilePic) setUserProfilePic(storedProfilePic);
  }, [postId]);

  useEffect(() => {
    // This effect is responsible for loading both the base image and the frame image
    setIsReady(false);
    const img = new Image();
    img.src = baseImageUrl;
    img.onload = () => {
      originalImageRef.current = img;

      const frameImg = new Image();
      // This line is crucial: it uses the selectedFrame index to get the correct image path
      frameImg.src = fullFrameImages[selectedFrame];
      frameImg.onload = () => {
        frameImageRef.current = frameImg;
        setIsReady(true);
      };
      frameImg.onerror = () => {
        console.error(`Failed to load frame: ${fullFrameImages[selectedFrame]}`);
        frameImageRef.current = null;
        setIsReady(true);
      };
    };
    img.onerror = () => {
      console.error(`Failed to load base image: ${baseImageUrl}`);
      originalImageRef.current = null;
      setIsReady(true);
    };
  }, [baseImageUrl, selectedFrame]);

  useEffect(() => {
    // This effect redraws the canvas only when all images are loaded
    if (isReady) {
      drawImageOnCanvas();
    }
  }, [isReady, drawImageOnCanvas, dynamicElements]);

  useEffect(() => {
    const handleResize = () => drawImageOnCanvas();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [drawImageOnCanvas]);

  const savePostToDatabase = async (file, actionType) => {
    try {
      const currentUserId = localStorage.getItem('accountId');
      if (!currentUserId) {
        console.error("User not authenticated.");
        return;
      }
  
      // 1. Upload the image to Appwrite storage
      const fileResponse = await storage.createFile(
        storageBucketId,
        ID.unique(),
        file,
        [Permission.read(Role.user(currentUserId))]
      );
  
      const fileUrl = `${window.location.origin}/v1/storage/buckets/${storageBucketId}/files/${fileResponse.$id}/view?project=${process.env.REACT_APP_APPWRITE_PROJECT_ID}`;
  
      // 2. Create a document in the Appwrite database
      await databases.createDocument(
        databaseId,
        myPostsCollectionId,
        ID.unique(),
        {
          userId: currentUserId,
          type: 'image',
          url: fileUrl,
          action: actionType,
          // You can add more attributes here, like a title, hashtags, etc.
          createdAt: new Date().toISOString(),
        }
      );
      console.log(`${actionType} action logged successfully!`);
    } catch (error) {
      console.error(`Failed to save post to database: ${error}`);
    }
  };

  const handleSave = () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.toBlob((blob) => {
        const file = new File([blob], 'my-edited-post.png', { type: 'image/png' });
        
        // Save the post to the database first
        savePostToDatabase(file, 'save');

        // Then download the file to the user's device
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'my-edited-post.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }, 'image/png');
    }
  };

  const handleShareClick = () => {
    if (navigator.share) {
      const canvas = canvasRef.current;
      canvas.toBlob(async (blob) => {
        const file = new File([blob], 'my-edited-post.png', { type: 'image/png' });

        // Save the share event to the database
        await savePostToDatabase(file, 'share');

        // Then open the native share dialog
        try {
          await navigator.share({
            title: 'My Edited Post',
            text: 'Check out this post I created!',
            files: [file],
          });
          console.log('Post shared successfully');
        } catch (error) {
          console.error('Error sharing:', error);
          alert('Failed to share. Please try again.');
        }
      }, 'image/png');
    } else {
      alert('Sharing is not supported on this browser. You can save the image and share it manually.');
    }
  };

  const handleFrameSelect = (index) => {
    // This is the key: simply update the state
    setSelectedFrame(index);
    // The `useEffect` hook will automatically detect this change and redraw the canvas
  };

  const handleApplyFilter = (e) => {
    setFilter(e.target.value);
  };

  const handleTextChange = (e) => {
    setDynamicElements(prev => ({
      ...prev,
      text: { ...prev.text, value: e.target.value },
    }));
  };

  const handleTextResize = (e) => {
    setDynamicElements(prev => ({
      ...prev,
      text: { ...prev.text, size: parseInt(e.target.value, 10) },
    }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setDynamicElements(prev => ({
          ...prev,
          image: { ...prev.image, url: event.target.result },
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePhotoResize = (e) => {
    setDynamicElements(prev => ({
      ...prev,
      image: { ...prev.image, size: parseInt(e.target.value, 10) },
    }));
  };

  const handleDeleteElement = (elementType) => {
    setDynamicElements(prev => ({
      ...prev,
      [elementType]: initialElement[elementType],
    }));
  };

  const getCursorPosition = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handleMouseDown = (e) => {
    const { x, y } = getCursorPosition(e);
    // Check if click is on the text
    if (dynamicElements.text.value) {
      // Simple collision detection for text
      const textWidth = canvasRef.current.getContext('2d').measureText(dynamicElements.text.value).width;
      if (x > dynamicElements.text.x - textWidth / 2 && x < dynamicElements.text.x + textWidth / 2 &&
          y > dynamicElements.text.y - dynamicElements.text.size / 2 && y < dynamicElements.text.y + dynamicElements.text.size / 2) {
        setIsDragging('text');
        setDragStart({ x: x - dynamicElements.text.x, y: y - dynamicElements.text.y });
        return;
      }
    }
    // Check if click is on the image
    if (dynamicElements.image.url) {
      // Simple collision detection for image
      if (x > dynamicElements.image.x && x < dynamicElements.image.x + dynamicElements.image.size &&
          y > dynamicElements.image.y && y < dynamicElements.image.y + dynamicElements.image.size) {
        setIsDragging('image');
        setDragStart({ x: x - dynamicElements.image.x, y: y - dynamicElements.image.y });
        return;
      }
    }
    setIsDragging(null);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const { x, y } = getCursorPosition(e);
    const newX = x - dragStart.x;
    const newY = y - dragStart.y;

    if (isDragging === 'text') {
      setDynamicElements(prev => ({
        ...prev,
        text: { ...prev.text, x: newX, y: newY },
      }));
    } else if (isDragging === 'image') {
      setDynamicElements(prev => ({
        ...prev,
        image: { ...prev.image, x: newX, y: newY },
      }));
    }
  };

  const handleMouseUp = () => {
    setIsDragging(null);
  };


  return (
    <div className="post-detail-page-container">
      <div className="top-bar">
        <span className="top-bar-title">Select Frame</span>
        <button className="next-button">Next</button>
      </div>
      <main className="post-detail-content">
        <div className="post-image-wrapper">
          <canvas
            ref={canvasRef}
            className="post-detail-canvas"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
          ></canvas>
        </div>

        <div className="frame-carousel">
          {fullFrameImages.map((frameSrc, idx) => (
            <img
              key={idx}
              src={frameSrc}
              alt={`Frame ${idx + 1}`}
              className={`frame-thumbnail ${selectedFrame === idx ? 'selected' : ''}`}
              onClick={() => handleFrameSelect(idx)}
            />
          ))}
        </div>

        <div className="editing-tools-section">
          <div className="tool-group">
            <h3>Filters</h3>
            <select value={filter} onChange={handleApplyFilter} className="tool-select">
              <option value="none">None</option>
              <option value="grayscale(100%)">Grayscale</option>
              <option value="sepia(100%)">Sepia</option>
              <option value="blur(2px)">Blur</option>
              <option value="brightness(150%)">Brightness</option>
              <option value="contrast(200%)">Contrast</option>
              <option value="invert(100%)">Invert</option>
            </select>
          </div>

          <div className="tool-group">
            <h3>Add Photo</h3>
            <input type="file" accept="image/*" onChange={handlePhotoUpload} />
            {dynamicElements.image.url && (
              <>
                <label>Size: </label>
                <input
                  type="range"
                  min="50"
                  max="300"
                  value={dynamicElements.image.size}
                  onChange={handlePhotoResize}
                />
                <button onClick={() => handleDeleteElement('image')}>Delete Photo</button>
              </>
            )}
          </div>

          <div className="tool-group">
            <h3>Add Text</h3>
            <input
              type="text"
              placeholder="Enter text..."
              value={dynamicElements.text.value}
              onChange={handleTextChange}
            />
            {dynamicElements.text.value && (
              <>
                <label>Size: </label>
                <input
                  type="range"
                  min="12"
                  max="72"
                  value={dynamicElements.text.size}
                  onChange={handleTextResize}
                />
                <button onClick={() => handleDeleteElement('text')}>Delete Text</button>
              </>
            )}
          </div>
        </div>
        
        {/* Removed the tool-icon-bar */}
        
        <div className="add-hashtag-section">
          <img src={userProfilePic} alt="User Avatar" className="hashtag-avatar" />
          <input type="text" placeholder="Add a hashtag or caption..." value={hashtag} onChange={(e) => setHashtag(e.target.value)} className="hashtag-input" />
        </div>

        <div className="action-buttons">
          <button className="save-post-button" onClick={handleSave}>Save Edited Post</button>
          <button className="share-post-button" onClick={handleShareClick}>Share Post</button>
        </div>
      </main>
      <NavigationBottom />
    </div>
  );
}

export default PostDetailPage;