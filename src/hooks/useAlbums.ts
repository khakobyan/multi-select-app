import { useState, useEffect } from 'react';
import { Album, fetchAlbums } from '../services/albumService';

const useAlbums = () => {
  const [albums, setAlbums] = useState<Album[]>([]);

  useEffect(() => {
    const fetchAndSetAlbums = async () => {
      const albumsData = await fetchAlbums();
      setAlbums(albumsData);
    };

    fetchAndSetAlbums();
  }, []);

  return albums;
};

export default useAlbums;
