import React from 'react';
import MultipleSelect from './components/MultipleSelect';
import './App.css';
import useAlbums from './hooks/useAlbums';

const App: React.FC = () => {
  const albums = useAlbums();

  return (
    <div className='container'>
      <h1>Multiple Select Component</h1>
      <MultipleSelect
        options={albums.map(album => ({ value: String(album.id), label: album.title }))}
      />
    </div>
  );
};

export default App;
