// src/components/pages/TrendingPage.js
import React from 'react';
import Header from '../dashboard/Header';
import NavigationBottom from '../dashboard/NavigationBottom';
import Card from '../dashboard/Card';
import './TrendingPage.css';

import trendingImage1 from '../../img/treading1.jpg';
import trendingImage2 from '../../img/treading2.jpg';
import trendingImage3 from '../../img/treading3.jpg';
import trendingImage4 from '../../img/treading4.jpg';
import trendingImage5 from '../../img/treading5.jpg';
import trendingImage6 from '../../img/treading6.jpg';
import trendingImage7 from '../../img/treading7.jpg';
import trendingImage8 from '../../img/treading8.jpg';
import trendingImage9 from '../../img/treading9.jpg';

function TrendingPage() {
  const trendingItems = [
    { id: 't1', imageUrl: trendingImage1, title: '', linkTo: { pathname: '/post/30', state: { imageUrl: trendingImage1, postId: '30' } } },
    { id: 't2', imageUrl: trendingImage2, title: '', linkTo: { pathname: '/post/31', state: { imageUrl: trendingImage2, postId: '31' } } },
    { id: 't3', imageUrl: trendingImage3, title: '', linkTo: { pathname: '/post/32', state: { imageUrl: trendingImage3, postId: '32' } } },
    { id: 't4', imageUrl: trendingImage4, title: '', linkTo: { pathname: '/post/33', state: { imageUrl: trendingImage4, postId: '33' } } },
    { id: 't5', imageUrl: trendingImage5, title: '', linkTo: { pathname: '/post/34', state: { imageUrl: trendingImage5, postId: '34' } } },
    { id: 't6', imageUrl: trendingImage6, title: '', linkTo: { pathname: '/post/35', state: { imageUrl: trendingImage6, postId: '35' } } },
    { id: 't7', imageUrl: trendingImage7, title: '', linkTo: { pathname: '/post/36', state: { imageUrl: trendingImage7, postId: '36' } } },
    { id: 't8', imageUrl: trendingImage8, title: '', linkTo: { pathname: '/post/37', state: { imageUrl: trendingImage8, postId: '37' } } },
    { id: 't9', imageUrl: trendingImage9, title: '', linkTo: { pathname: '/post/38', state: { imageUrl: trendingImage9, postId: '38' } } },
  ];

  return (
    <div className="trending-page-container">
      <Header />
      <main className="trending-main-content">
        <h2 className="trending-heading">Trending</h2>
        <div className="trending-items-grid">
          {trendingItems.map(item => (
            <Card
              key={item.id}
              imageUrl={item.imageUrl}
              title={item.title}
              linkTo={item.linkTo}
            />
          ))}
        </div>
      </main>
      <NavigationBottom />
    </div>
  );
}

export default TrendingPage;