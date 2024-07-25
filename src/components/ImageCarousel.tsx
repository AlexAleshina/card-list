import { useState } from 'react';
import styled from 'styled-components';
import { CardImage } from './styled';
import Modal from './Modal';
import { CARD_WIDTH } from './constants';

const slideWidth = CARD_WIDTH;

const CarouselWrapper = styled.div`
    width: 100%;
    max-width: ${CARD_WIDTH * 2}px;
    margin: 0 auto;
    overflow: hidden;
    position: relative;
    height: 250px;
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
      color: #9e9e9e;
    }
`;

const PrevButton = styled(CarouselButton)`
    left: 10px;
`;

const NextButton = styled(CarouselButton)`
    right: 10px;
`;


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

  return (
    <CarouselWrapper>
      <CarouselTrack translate={currentIndex * slideWidth}>
        {data?.galleryImage.map((slide: string, i: number) => (
          <CarouselSlide key={slide + i}>
            <CardImage loading='eager' onClick={() => openModal()} src={slide} alt={data?.galleryImageAlt[currentIndex]} />
          </CarouselSlide>
        ))}
      </CarouselTrack>
      <PrevButton onClick={handlePrev}>&#9664;</PrevButton>
      <NextButton onClick={handleNext}>&#9654;</NextButton>

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={closeModal} image={data?.galleryImageLarge[currentIndex]} altText={data?.galleryImageAlt[currentIndex]} />
      )}
    </CarouselWrapper>
  );
};

export default ImageCarousel;
