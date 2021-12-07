/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import { useHistory } from 'react-router';
import { ProduitEntity } from '../../../entities/Gestionproduit/produit.entity';
import { Layout } from '../../shared/Layout';

export const ProductDetails = () => {
  const router = useHistory();
  // const params = new URLSearchParams(useLocation().search);
  // params.get('id')
  const [product, setProduct] = useState<ProduitEntity>(
    router.location.state as any,
  );

  return (
    <Layout maxWidth={1300}>
      <h2>Details Produit</h2>
      <h3>{product.nom} </h3>
    </Layout>
  );
};
