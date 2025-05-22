// blog-app-frontend/src/services/api.ts
export const fetchPosts = async () => {
    try {
      const response = await fetch('http://192.168.0.21:3000/api/posts');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data || []; // Retorna array vazio se data for undefined
    } catch (error) {
      console.error('Error fetching posts:', error);
      return []; // Sempre retorna um array, mesmo em caso de erro
    }
  };
  
  export const fetchTopPosts = async () => {
    try {
      const response = await fetch('http://192.168.0.21:3000/api/posts/top');
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