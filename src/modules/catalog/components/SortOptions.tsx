/* eslint-disable @typescript-eslint/no-unused-vars */
import styled from '@emotion/styled';
import { ProduitEntity } from '../../../entities/Gestionproduit/produit.entity';
import { SortContent } from './SortContent';

const FilterContainer = styled.div`
  display: none;

  @media (min-width: 768px) {
    display: flex;
    flex-direction: column;
    width: 290px;
    border-radius: 20px;
    min-height: 150;
    flex-wrap: wrap;
    padding: 5px;
    padding-bottom: 20px;
    margin-top: 5px;
    margin-bottom: 10px;
    box-shadow: 0 3px 5px 0 rgba(0, 83, 243, 0.2),
      0 6px 20px 0 rgba(0, 83, 243, 0.2);

    > h2 {
      margin: 5px;
      margin-left: 25px;
      color: #777;
      font-size: 18px;
    }

    > hr {
      background-color: #777;
      width: 80%;
      border-width: 1.3px;
    }
  }
`;

export const SortOptions = ({
  products,
  setSortProducts,
}: {
  products: ProduitEntity[];
  setSortProducts: (products: ProduitEntity[]) => void;
}) => {
  return (
    <div>
      <FilterContainer>
        <h2>Options de Tri</h2>
        <hr />
        <SortContent products={products} setProducts={setSortProducts} />
      </FilterContainer>
    </div>
  );
};
