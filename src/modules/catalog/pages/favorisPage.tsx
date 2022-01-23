import { useEffect, useState } from 'react';
import { ProduitEntity } from '../../../entities/Gestionproduit/produit.entity';
import { Header } from '../../shared/Layout/header';
import { fetchProduit } from '../../vendeur/network';
import { FavorisComponent } from '../components/FavorisComponent';

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
      <h1 style={{ textAlign: 'center' }}>Liste des Favoris</h1>

      {produits.map((item) => (
        <FavorisComponent product={item} key={item._id} />
      ))}
    </div>
  );
};
