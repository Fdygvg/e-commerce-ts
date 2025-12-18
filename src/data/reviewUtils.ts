// src/data/reviewUtils.ts
import type { Review } from '../types';

const userNames = [
  "Alex Johnson", "Sam Wilson", "Taylor Swift", "Jordan Lee", "Casey Smith",
  "Morgan Brown", "Riley Davis", "Jamie Miller", "Taylor Kim", "Jordan Patel",
  "Casey Garcia", "Morgan Taylor", "Riley Martinez", "Jamie Anderson", "Alex Thomas"
];

const userAvatars = Array.from({ length: 15 }, (_, i) => 
  `https://i.pravatar.cc/150?img=${i + 1}`
);

const positiveComments = [
  "Absolutely love this product! Exceeded my expectations.",
  "Great value for money. Does exactly what it promises.",
  "High quality and durable. Would recommend to friends.",
  "Arrived quickly and in perfect condition. Very satisfied!",
  "Perfect for my needs. Easy to use and set up.",
  "Better than I expected. The photos don't do it justice.",
  "Worth every penny. Will definitely buy again.",
  "Excellent customer service and fast shipping.",
  "Very impressed with the quality. Met all my expectations.",
  "Simple, effective, and reliable. What more could you want?"
];

const mixedComments = [
  "Good product overall, but instructions could be clearer.",
  "Works well, though it took some time to set up properly.",
  "Quality is decent for the price. Does the job.",
  "It's okay, but I expected slightly better performance.",
  "Good value, but shipping took longer than expected."
];

const dates = [
  "2024-01-15", "2024-01-10", "2024-01-05", "2023-12-20", "2023-12-15",
  "2023-12-10", "2023-12-05", "2023-11-28", "2023-11-20", "2023-11-15"
];

export function generateReviewsForProduct(productId: number, count: number = 5): Review[] {
  const reviews: Review[] = [];
  
  for (let i = 0; i < count; i++) {
    const userName = userNames[Math.floor(Math.random() * userNames.length)];
    const userAvatar = userAvatars[Math.floor(Math.random() * userAvatars.length)];
    const date = dates[Math.floor(Math.random() * dates.length)];
    const rating = Math.floor(Math.random() * 2) + 4; // 4-5 stars mostly
    const commentPool = rating >= 4 ? positiveComments : mixedComments;
    const comment = commentPool[Math.floor(Math.random() * commentPool.length)];
    const helpful = Math.floor(Math.random() * 50);
    
    reviews.push({
      id: productId * 100 + i,
      productId,
      userName,
      userAvatar,
      rating,
      date,
      comment,
      helpful
    });
  }
  
  return reviews;
}

