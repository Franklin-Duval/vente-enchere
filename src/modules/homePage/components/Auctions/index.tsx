import styled from '@emotion/styled';
import { Space, Spin } from 'antd';
import { useEffect, useState } from 'react';
import { FaAngleRight } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import { ProduitEntity } from '../../../../entities/Gestionproduit/produit.entity';
import { ROUTES } from '../../../../routes';
import { PRIMARY } from '../../../../shared/colors';
import { AnimationOnScroll } from '../../../shared/AnimationOnScroll';
import { ProductCard } from '../../../shared/ProductCard';
import { fetchProduit } from '../../../vendeur/network';

const AuctionContainer = styled.div`
  margin-bottom: 50px;
  h2 {
    color: ${PRIMARY};
  }

  > div {
    display: flex;
    flex-wrap: wrap;
  }
`;

export const Auction = () => {
  const [loading, setLoading] = useState(true);
  const [produits, setProduits] = useState<ProduitEntity[]>([]);
  const router = useHistory();

  useEffect(() => {
    fetchProduit().then((data) => {
      if (data.success) {
        if (data.result.length > 9) {
          data.result.length = 9;
          setProduits(data.result);
        } else {
          setProduits(data.result);
        }
      }
      setLoading(false);
    });
  }, []);

  return (
    <AuctionContainer>
      <Space style={{ justifyContent: 'space-between' }}>
        <h2>Enchères programmées</h2>
        <h3
          style={{ margin: 0, textDecoration: 'underline', cursor: 'pointer' }}
          onClick={() => {
            router.push(ROUTES.CATALOG_PAGE.CATALOG);
          }}
        >
          Voir plus{' '}
          <FaAngleRight color='red' size={20} style={{ marginBottom: -6 }} />
        </h3>
      </Space>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Spin spinning={loading} size='large' />
        {!loading && produits.length === 0 && (
          <h2>Aucun produit pour l'instant</h2>
        )}
      </div>
      <div>
        {produits.map((produit) => (
          <AnimationOnScroll key={produit._id} animation='zoom-in-up'>
            <ProductCard produit={produit} showInfo />
          </AnimationOnScroll>
        ))}
      </div>
    </AuctionContainer>
  );
};
