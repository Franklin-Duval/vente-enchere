/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import styled from '@emotion/styled';
import { Button, message, notification, Space, Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
import { FaHeart, FaLongArrowAltLeft, FaRegPaperPlane } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { useLocation } from 'react-router-dom';
import { ConnectedUserEntity } from '../../../entities/ConnectedUserEntity';
import { LotEntity } from '../../../entities/Gestionproduit/lot.entity';
import { ProduitEntity } from '../../../entities/Gestionproduit/produit.entity';
import { ROUTES } from '../../../routes';
import { PRIMARY } from '../../../shared/colors';
import { Footer } from '../../homePage/components/Footer';
import { DateFrHrWithTime } from '../../shared/DateToFrench';
import { ImageCarousel } from '../../shared/ImageCarousel';
import { Layout } from '../../shared/Layout';
import { ProductCard } from '../../shared/ProductCard';
import { addFavoris, subFavoris } from '../../vendeur/network';
import { addRappel, fetchLotProduit } from '../network';

const ProductInfoContainer = styled.div`
  height: 350px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  > div {
    p {
      font-size: 16px;
      margin: 3px;
    }

    h2 {
      font-family: 'Montserrat';
      font-size: 20px;
      margin-bottom: 5px;
    }

    .icon {
      margin-bottom: -3px;
      margin-right: 10px;
    }

    .info {
      margin-left: 40px;
      margin-bottom: 20px;
    }

    @media (min-width: 768px) {
      p {
        font-size: 16px;
      }
    }
  }
`;

export const ProductDetails = () => {
  const router = useHistory();
  const [product, setProduct] = useState<ProduitEntity>(
    router.location.state as any,
  );
  const [favoris, setFavoris] = useState(product.favoris);
  const [lot, setLot] = useState<LotEntity>();

  const params = new URLSearchParams(useLocation().search);
  const connectedUser: ConnectedUserEntity = useSelector(
    (state: any) => state.userReducer,
  ).user;

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchLotProduit(product._id).then((data) => {
      if (data.success) {
        setLot(data.result[0]);
      }
    });
  }, []);

  useEffect(() => {
    setProduct(router.location.state as any);
  }, [params.get('id')]);

  return (
    <Layout footer={<Footer />}>
      <Button
        icon={
          <FaLongArrowAltLeft
            style={{ marginRight: 10, marginBottom: -4 }}
            size={20}
          />
        }
        type='link'
        size='large'
        style={{ marginBottom: 20 }}
      >
        Retour
      </Button>
      <div></div>
      <Space style={{ alignItems: 'flex-start', flexWrap: 'wrap' }} size={30}>
        <ImageCarousel imageListIds={product.images}></ImageCarousel>
        <ProductInfoContainer>
          <div>
            <h2>Informations du Produit</h2>
            <p>
              Nom: <strong>{product.nom}</strong>
            </p>
            <p>
              Categorie: <strong>{product.category.nom}</strong>
            </p>
            <p>
              Prix min: <strong>{product.prixMin} FCFA</strong>
            </p>
            <p>
              Quantit??:{' '}
              <strong>
                {product.quantite.valeur} {product.quantite.unite}
              </strong>
            </p>
            <p>
              Date cr??ation:{' '}
              <strong>{DateFrHrWithTime(product.dateCreation)}</strong>
            </p>
            <p>
              Num??ro de Lot:{' '}
              <strong style={{ fontSize: 20, color: 'red' }}>
                {lot &&
                  `${lot.numeroLot.toString().slice(0, 3)}-${lot?.numeroLot
                    .toString()
                    .slice(3)}`}
              </strong>
            </p>
          </div>
          <div>
            <Space size={20}>
              <Tooltip title='Ajouter aux favoris'>
                {favoris.includes(connectedUser.userId) ? (
                  <FaHeart
                    size={25}
                    color='red'
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      subFavoris(connectedUser.userId, product._id).then(
                        (data) => {
                          if (data.success) {
                            setFavoris(data.result.favoris);
                            message.success(data.message);
                          }
                        },
                      );
                    }}
                  />
                ) : (
                  <AiOutlineHeart
                    size={25}
                    color='red'
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      try {
                        addFavoris(connectedUser.userId, product._id).then(
                          (data) => {
                            if (data.success) {
                              setFavoris(data.result.favoris);
                              message.success(data.message);
                            }
                          },
                        );
                      } catch (error) {
                        console.log('error', error);
                      }
                    }}
                  />
                )}
              </Tooltip>
              <Tooltip title='Me rappeler'>
                <FaRegPaperPlane
                  size={20}
                  color={PRIMARY}
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    addRappel(product._id, connectedUser.userId).then(
                      (data) => {
                        if (data.success) {
                          notification.success({
                            message: 'Succ??s',
                            description: data.message,
                          });
                        }
                      },
                    );
                  }}
                />
              </Tooltip>
              <Button
                type='primary'
                size='large'
                onClick={() =>
                  router.push(
                    ROUTES.ENCHERE_PAGE.ENCHERE_DETAIL(product._id),
                    product,
                  )
                }
              >
                Visiter l'ench??re
              </Button>
            </Space>
          </div>
        </ProductInfoContainer>
      </Space>

      <h3 style={{ marginTop: 50 }}>Description:</h3>
      <p>{product.description}</p>
      <h3 style={{ marginTop: 50 }}>Autres produit du lot</h3>
      <div className='horizontal-scroll'>
        {lot &&
          lot.produits?.map(
            (produit) =>
              produit._id !== product._id && (
                <ProductCard
                  key={produit._id}
                  produit={produit}
                  showInfo
                  onClick={() => router.go(0)}
                />
              ),
          )}
      </div>
    </Layout>
  );
};
