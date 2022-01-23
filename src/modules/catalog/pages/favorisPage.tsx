import styled from '@emotion/styled';
import { Divider } from 'antd';
import { useEffect, useState } from 'react';
import { ProduitEntity } from '../../../entities/Gestionproduit/produit.entity';
import { Header } from '../../shared/Layout/header';
import { fetchProduit } from '../../vendeur/network';
import { FavorisComponent } from '../components/FavorisComponent';

const FavContainer = styled.div`
  display: flex;
  height: 200px;
  padding: 20px;

  flex-wrap: wrap;
  column-gap: 30px;
`;
export const FavorisPage = () => {
  const [produits, setProduit] = useState<ProduitEntity[]>([]);
  useEffect(() => {
    fetchProduit().then((data) => {
      setProduit(data.result);
    });
  }, []);
  return (
    <div>
      <Header />

      <div style={{ marginTop: 40, marginLeft: 40 }}>
        <h1 style={{ textAlign: 'center' }}>Liste des Favoris</h1>
        <Divider style={{ backgroundColor: '#777', height: 2 }} />
        <FavContainer>
          {produits.map((item) => (
            <FavorisComponent product={item} key={item._id} />
          ))}
        </FavContainer>
      </div>
    </div>
  );
};
