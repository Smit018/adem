import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Images = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  
  useEffect(() => {
    fetchImages();
  }, [page]);

  const fetchImages = async () => {
    try {
      const response = await axios.get(`https://picsum.photos/v2/list?page=${page}&limit=6`);
      setImages([...images, ...response.data]);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const loadMoreImages = () => {
    setPage(page + 1);
  };

  return (
    <div className="container mx-auto p-4">
      <header className="flex justify-between items-center py-4">
        <div className="logo">Logo</div>
        <div className="site-title">Site Title</div>
      </header>

      <div className="header-image h-64 bg-gray-300 flex items-center justify-center">
        Header Image
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
        {images.slice(0, 3).map((image, index) => (
          <div key={index} className="h-64">
            <img src={image.download_url} alt={image.author} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        {images.slice(3, 7).map((image, index) => (
          <div key={index} className="h-64">
            <img src={image.download_url} alt={image.author} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <button onClick={loadMoreImages} className="px-4 py-2 bg-blue-500 text-white rounded">
          Load More
        </button>
      </div>
    </div>
  );
};

export default Images;



