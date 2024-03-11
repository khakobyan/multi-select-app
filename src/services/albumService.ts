import axios from 'axios';

export interface Album {
  userId: number;
  id: number;
  title: string;
}

const API_URL = process.env.REACT_APP_API_URL || 'https://jsonplaceholder.typicode.com';

export const fetchAlbums = async (): Promise<Album[]> => {
  try {
    const response = await axios.get(`${API_URL}/albums`);
    return response.data.slice(0, 50);
  } catch (error) {
    console.error('Error fetching albums:', error);
    return [];
  }
};
