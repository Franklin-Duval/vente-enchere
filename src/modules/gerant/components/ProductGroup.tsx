import styled from '@emotion/styled';
import { Space } from 'antd';
import { ProduitEntity } from '../../../entities/Gestionproduit/produit.entity';
import { PRIMARY } from '../../../shared/colors';
import { ProductCard } from '../../shared/ProductCard';

const ProductGroupContainer = styled.div`
  margin-bottom: 60px;
  h2 {
    color: ${PRIMARY};
  }

  > div {
    display: flex;
    flex-wrap: wrap;
  }
`;

export const ProductGroup = ({ products }: { products: ProduitEntity[] }) => {
  return (
    <ProductGroupContainer>
      <Space style={{ justifyContent: 'space-between' }}>
        <h2>Produits du vendeur</h2>
      </Space>
      <div>
        {products.map((produit: ProduitEntity) => (
          <ProductCard key={produit._id} produit={produit} />
        ))}
      </div>
    </ProductGroupContainer>
  );
};
