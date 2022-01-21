import styled from '@emotion/styled';
import { Card } from 'antd';
import { useHistory } from 'react-router';
import { EnchereEntity } from '../../../entities/GestionEnchere/enchere.entity';
import { ROUTES } from '../../../routes';

const CardContainer = styled.div`
  margin: 10px;
  height: 250px;
  border-radius: 20px;
  box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.3), 0 6px 20px 0 rgba(0, 0, 0, 0.3);
  transition: 0.5s;

  &:hover {
    margin-top: -2px;
    transition: 0.5s;
  }

  @media (min-width: 768px) {
    margin: 10px;
  }
`;

export const AuctionCard = ({ enchere }: { enchere: EnchereEntity }) => {
  const router = useHistory();
  return (
    <CardContainer>
      <Card
        hoverable
        style={{ width: 250, height: '100%', borderRadius: 20 }}
        onClick={() =>
          router.push(ROUTES.CATALOG_PAGE.PRODUCT(enchere._id), enchere)
        }
      >
        <p>{enchere.date} </p>
      </Card>
    </CardContainer>
  );
};
