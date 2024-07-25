import { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Spinner = styled.div`
  border: 8px solid #f3f3f3;
  border-top: 8px solid #3498db;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: ${spin} 2s linear infinite;
  margin: auto;
`;
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
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
  aspect-ratio: 3 / 2;
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
  right: 10px;
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
  color: #333;
  z-index: 2;
  &:hover {
    color: #ff0000;
  }
`;

const ModalImage = styled.img<{ loaded: boolean }>`
  width: 100%;
  height: 100%;
  object-fit: contain;
  position: relative;
  display: ${props => (props.loaded ? 'block' : 'none')};
  filter: ${props => (props.loaded ? 'none' : 'blur(15px)')};
  transition: opacity 0.5s ease-in-out;
`;

const Placeholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
  color: #999;
  font-size: 24px;
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
          <ModalImage loaded={loaded} src={image} alt={altText} />
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
