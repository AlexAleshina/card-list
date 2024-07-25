import styled from 'styled-components';
import { CARD_WIDTH } from './constants';

const Container = styled.div`
    width: ${CARD_WIDTH}px;
    text-align: left;
`;

const PriceText = styled.p`
    font-size: 16px;
    font-weight: bold;
    color: #333;
    margin: 8px;
`;

const ComingSoonText = styled.p`
    font-size: 18px;
    color: #fff;
    background-color: rgba(10, 106, 218, 0.5);
    padding: 5px 10px;
    border-radius: 5px;
    display: inline-block;
    &:hover {
        background: rgba(10, 106, 218, 0.8);
    }
`;

const ModelDetailsContainer = ({ data }: { data: any }) => (
  <Container>
    {data?.priceDisplay
      ? <PriceText>Price: {data.priceDisplay}</PriceText>
      : <PriceText>Price not available now</PriceText>
    }
    {data?.isComingSoon && <ComingSoonText>Coming Soon</ComingSoonText>}
  </Container>
);

export default ModelDetailsContainer;