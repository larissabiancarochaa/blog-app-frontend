// blog-app-frontend/src/services/api.ts
import { API_URL } from "./config";

export const fetchPosts = async () => {
    try {
      const response = await fetch(`${API_URL}/api/posts`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data || []; 
    } catch (error) {
      console.error('Error fetching posts:', error);
      return []; 
    }
  };
  
  export const fetchTopPosts = async () => {
    try {
      const response = await fetch(`${API_URL}/api/posts/top`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data || [];
    } catch (error) {
      console.error('Error fetching top posts:', error);
      return [];
    }
};