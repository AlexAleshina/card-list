import { useState } from 'react';
import './ImageCarousel.css';
import styled from 'styled-components';


const CarouselWrapper = styled.div`
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
    overflow: hidden;
    position: relative;
    height: 150px;
`;

const CarouselTrack = styled.div<{ translate: number }>`
    display: flex;
    transition: transform 0.5s ease-in-out;
    transform: translateX(${props => -props?.translate || 0}px);
`;

const CarouselSlide = styled.div`
    min-width: 100%;
    box-sizing: border-box;
`;

const SlideImage = styled.img`
    width: 100%;
    display: block;
`;

const CarouselButton = styled.button`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(255, 255, 255, 0.8);
    color: #e3e3e3;
    border: none;
    border-radius: 30px;
    padding: 8px;
    cursor: pointer;
    &:hover {
        background: rgba(255, 255, 255, 1);
    }
`;

const PrevButton = styled(CarouselButton)`
    left: 10px;
`;

const NextButton = styled(CarouselButton)`
    right: 10px;
`;


type CarouselProps = {
  data: Record<string, any>[];
}

const ImageCarousel = ({ data }: { data: any }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? data?.galleryImage.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === data?.galleryImage.length - 1 ? 0 : prevIndex + 1));
  };

  const slideWidth = 300;
  return (
    <CarouselWrapper>
      <CarouselTrack translate={currentIndex * slideWidth}>
        {data?.galleryImage.map((slide: string, i: number) => (
          <CarouselSlide key={slide + i}>
            <SlideImage onClick={() => openModal()} src={slide} alt={data?.galleryImageAlt[currentIndex]} />
          </CarouselSlide>
        ))}
      </CarouselTrack>
      <PrevButton onClick={handlePrev}>&#9664;</PrevButton>
      <NextButton onClick={handleNext}>&#9654;</NextButton>

      {isModalOpen && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={closeModal}>&times;</span>
            <img src={data?.galleryImageLarge[currentIndex]} alt={data?.galleryImageAlt[currentIndex]} className="modal-image" />
          </div>
        </div>
      )}
    </CarouselWrapper>
  );
};

export default ImageCarousel;
