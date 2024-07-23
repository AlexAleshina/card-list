import React, { useState } from 'react';
import './ImageCarousel.css';


type CarouselProps = {
  data: Record<string, any>[];
}

const ImageCarousel = ({ data, selectedValues }: { data: any, selectedValues: any }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % data?.galleryImage?.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + data?.galleryImage?.length) % data?.galleryImage?.length);
  };

  return (
    <div className="carousel">
      <p>{data.displayName}:</p>

      <button onClick={prevSlide} className="carousel-button prev-button">❮</button>
      <div className="carousel-inner">
        <div className="carousel-item" onClick={() => openModal()}>
          <img
            src={data?.galleryImage[currentIndex]}
            alt={data?.galleryImageAlt[currentIndex]}
            className="carousel-image"
          />
        </div>
      </div>
      <button onClick={nextSlide} className="carousel-button next-button">❯</button>

      {isModalOpen && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={closeModal}>&times;</span>
            <img src={data?.galleryImageLarge[currentIndex]} alt={data?.galleryImageAlt[currentIndex]} className="modal-image" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageCarousel;
