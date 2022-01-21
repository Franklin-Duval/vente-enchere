import styled from '@emotion/styled';
import { Space } from 'antd';
import { useEffect, useState } from 'react';
import { FaAngleRight } from 'react-icons/fa';
import { ProduitEntity } from '../../../../entities/Gestionproduit/produit.entity';
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
  const [produits, setProduits] = useState<ProduitEntity[]>([]);

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
    });
  }, []);

  return (
    <AuctionContainer>
      <Space style={{ justifyContent: 'space-between' }}>
        <h2>Enchères programmé</h2>
        <h3
          style={{ margin: 0, textDecoration: 'underline', cursor: 'pointer' }}
        >
          Voir plus{' '}
          <FaAngleRight color='red' size={20} style={{ marginBottom: -6 }} />
        </h3>
      </Space>
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
