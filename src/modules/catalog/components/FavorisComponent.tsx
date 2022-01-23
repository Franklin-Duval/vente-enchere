import styled from '@emotion/styled';
import { Button, Image } from 'antd';
import { FaMinus } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { ConnectedUserEntity } from '../../../entities/ConnectedUserEntity';
import { ProduitEntity } from '../../../entities/Gestionproduit/produit.entity';
import { defaultImage } from '../../../shared/defaultImage';
import { API_ROUTES } from '../../shared/ApiRoutes';
import { subFavoris } from '../../vendeur/network';

const FavContainer = styled.div`
  display: flex;
  height: 300px;
  margin: 20px;

  .box {
    margin-left: 20px;
  }
`;

export const FavorisComponent = ({ product }: { product: ProduitEntity }) => {
  const connectedUser: ConnectedUserEntity = useSelector(
    (state: any) => state.userReducer,
  ).user;
  return (
    <div>
      <FavContainer>
        <Image
          alt='logo'
          src={API_ROUTES.IMAGES(product.images[0])}
          height={150}
          width={200}
          preview={false}
          style={{ objectFit: 'cover', borderRadius: 10 }}
          fallback={defaultImage}
        />
        <div className='box'>
          <p>{product.nom}</p>
          <p>{product.category.nom}</p>
          <Button
            icon={<FaMinus />}
            danger
            onClick={() => {
              subFavoris(connectedUser.userId, product._id);
            }}
          ></Button>
        </div>
      </FavContainer>
    </div>
  );
};
