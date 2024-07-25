import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Spinner } from './styled';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  aspect-ratio: 5 / 4;
  overflow: hidden;
  text-align: center;

  @media (min-width: 1126px) {
    max-width: 1126px;
  }

  @media (min-height: 751px) {
    max-height: 751px;
  }
`;

const CloseButton = styled.span`
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 32px;
  font-weight: bold;
  cursor: pointer;
  color: #e1e1e1;
  z-index: 2;
  &:hover {
    color: #9e9e9e;
  }
`;

const ModalImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  position: relative;
  filter: drop-shadow(16px 16px 16px grey);
`;

const Placeholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
  min-height: 300px;
  min-width: 400px;
`;

const Modal = ({ isOpen, onClose, image, altText }: { isOpen: boolean, onClose: () => void, image: string, altText: string }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = image;
    img.onload = () => setLoaded(true);
  }, [image]);

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        {image && loaded ? (
          <ModalImage src={image} alt={altText} />
        ) : (
          <Placeholder>
            <Spinner />
          </Placeholder>
        )}
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;
