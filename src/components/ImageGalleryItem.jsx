import React from 'react';

const ImageGalleryItem = ({ src, alt, onClick }) => {
  return (
    <li className="ImageGalleryItem" onClick={onClick}>
      <img className="ImageGalleryItem-image" src={src} alt="" />
    </li>
  );
};

export default ImageGalleryItem;
