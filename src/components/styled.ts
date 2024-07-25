import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const Spinner = styled.div`
  border: 8px solid #fff;
  border-top: 8px solid #9e9e9e;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: ${spin} 2s linear infinite;
  margin: auto;
`;

export const CardImage = styled.img`
  border-radius: 8px;
  max-width: 100%;
  height: auto;
  display: block;
  margin-left: auto;
  margin-right: auto;
  height: 250px;
  object-fit: contain;
  
  &:hover {
    transform: scale(1.1);
    }
`;
