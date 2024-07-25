import styled from 'styled-components';

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
