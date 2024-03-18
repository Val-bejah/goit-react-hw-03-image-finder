import React, { useState, useEffect } from 'react';
import axios from 'axios';

// import * as basicLightbox from 'basiclightbox';

import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import ImageGalleryItem from './ImageGalleryItem';
import Button from './Button';
import Loader from './Loader';
import Modal from './Modal';

export const App = () => {
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');

  const API_KEY = '42934312-8b48413b534c76ebd3c5da37b';
  const BASE_URL = 'https://pixabay.com/api/';

  useEffect(() => {
    if (!searchQuery) return;

    const fetchImages = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${BASE_URL}?q=${encodeURIComponent(
            searchQuery
          )}&page=${currentPage}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
        );
        setImages(prevImages => [...prevImages, ...response.data.hits]);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data: ', error);
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [searchQuery, currentPage]);

  const handleSearchSubmit = query => {
    setImages([]);
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const loadMore = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const openModal = imageUrl => {
    setShowModal(true);
    setLargeImageURL(imageUrl);
  };

  const closeModal = () => {
    setShowModal(false);
    setLargeImageURL('');
  };

  // const openLightbox = imageUrl => {
  //   const instance = basicLightbox.create(`
  //     <img src="${imageUrl}" width="800" height="600">
  //  `);
  //   instance.show();
  // };

  return (
    <div className="App">
      <Searchbar onSubmit={handleSearchSubmit} />
      {isLoading && <Loader />}
      <ImageGallery>
        {images.map(image => (
          <ImageGalleryItem
            key={image.id}
            src={image.webformatURL}
            alt={image.tags}
            onClick={() => openModal(image.largeImageURL)}
          />
        ))}
      </ImageGallery>
      {images.length > 0 && !isLoading && (
        <Button onClick={loadMore} className="Button" />
      )}
      {showModal && (
        <Modal
          imageUrl={largeImageURL}
          alt={searchQuery}
          onClose={closeModal}
          className="Overlay"
        />
      )}
    </div>
  );
};
export default App;
