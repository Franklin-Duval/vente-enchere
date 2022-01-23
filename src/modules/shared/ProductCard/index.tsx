import styled from '@emotion/styled';
import { Card, Image, Space, Statistic, Tooltip } from 'antd';
import { AiOutlineHeart } from 'react-icons/ai';
import { FaHeart, FaRegPaperPlane } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { ConnectedUserEntity } from '../../../entities/ConnectedUserEntity';
import { ProduitEntity } from '../../../entities/Gestionproduit/produit.entity';
import { ROUTES } from '../../../routes';
import { PRIMARY } from '../../../shared/colors';
import { defaultImage } from '../../../shared/defaultImage';
import { addFavoris, subFavoris } from '../../vendeur/network';
import { API_ROUTES } from '../ApiRoutes';

const CardContainer = styled.div`
  margin: 10px;
  height: 470px;
  border-radius: 20px;
  box-shadow: 0 3px 5px 0 rgba(81, 45, 168, 0.3),
    0 6px 20px 0 rgba(81, 45, 168, 0.3);
  transition: 0.5s;

  &:hover {
    margin-top: -2px;
    transition: 0.5s;
  }

  .name {
    font-size: 16px;
    margin-bottom: 10px;
    font-family: 'Montserrat';
  }

  .category {
    font-size: 14px;
    margin-bottom: 10px;
  }

  .price {
    color: red;
    font-size: 12px;
    margin-bottom: 0px;
    border: 1.5px solid red;
    border-radius: 5px;
    padding: 3px;
    min-width: 90px;
    text-align: center;
  }

  .qte {
    color: blue;
    font-size: 12px;
    margin-bottom: 0px;
    border: 1.5px solid blue;
    border-radius: 5px;
    min-width: 50px;
    padding: 3px;
    text-align: center;
  }

  .description {
    color: #777;
    font-size: 12px;
    margin-bottom: 0;
    margin-top: 10px;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }

  @media (min-width: 768px) {
    margin: 10px;
  }
`;

export const ProductCard = ({
  produit,
  showInfo,
  onClick,
}: {
  produit: ProduitEntity;
  showInfo?: boolean;
  onClick?: () => void;
}) => {
  const router = useHistory();
  const connectedUser: ConnectedUserEntity = useSelector(
    (state: any) => state.userReducer,
  ).user;

  return (
    <CardContainer>
      <Card
        hoverable
        style={{ width: 300, height: '100%', borderRadius: 20 }}
        onClick={() => {
          router.push(ROUTES.CATALOG_PAGE.PRODUCT(produit._id), produit);
          onClick?.();
        }}
        cover={
          <>
            <Image
              alt='profil_image'
              height={200}
              width='100%'
              style={{
                objectFit: 'cover',
                borderTopRightRadius: 20,
                borderTopLeftRadius: 20,
              }}
              preview={false}
              src={API_ROUTES.IMAGES(produit.images[0])}
              fallback={defaultImage}
            />
            <Space style={{ display: 'flex', justifyContent: 'center' }}>
              <Tooltip title='Ajouter aux favoris'>
                {produit.favoris.includes(connectedUser.userId) ? (
                  <FaHeart
                    size={25}
                    color='red'
                    onClick={() => {
                      subFavoris(connectedUser.userId, produit._id);
                    }}
                  />
                ) : (
                  <AiOutlineHeart
                    size={25}
                    color='red'
                    onClick={() => {
                      try {
                        addFavoris(connectedUser.userId, produit._id);
                      } catch (error) {
                        console.log('error', error);
                      }
                    }}
                  />
                )}
              </Tooltip>
              <Tooltip title='Me rappeler'>
                <FaRegPaperPlane size={20} color={PRIMARY} />
              </Tooltip>
            </Space>
          </>
        }
      >
        <div style={{ overflow: 'hidden', marginTop: -10 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <p className='name'>{produit.nom}</p>
            <p className='category'>{produit.category.nom} </p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Tooltip title='Mise à prix'>
              <p className='price'>{produit.prixMin} FCFA </p>
            </Tooltip>
            <p className='qte'>
              {produit.quantite.valeur} {produit.quantite.unite}{' '}
            </p>
          </div>
          <p className='description'>{produit.description}</p>
          {showInfo && (
            <>
              <hr />
              <h4>Début de l'enchère dans</h4>
              <Statistic.Countdown
                valueStyle={{ fontSize: 20, color: 'red' }}
                value={Date.now() + 1000 * 60 * 60 * 24 * 1 + 1000 * 30}
              />
            </>
          )}
        </div>
      </Card>
    </CardContainer>
  );
};
