import styled from 'styled-components';

const Container = styled.div`
    width: 300px;
    text-align: center;
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