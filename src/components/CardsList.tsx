import CardMain from './CardMain';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
`
const CardsList = ({ data }: { data: any }) => {
  return (
    <Container>
      {data.map((item: any) => (
        <CardMain item={item} key={item.familyId} />
      ))}
    </Container>
  );
};

export default CardsList;
