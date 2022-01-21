/* eslint-disable @typescript-eslint/no-unused-vars */
import styled from '@emotion/styled';
import { Button } from 'antd';
import { useState } from 'react';
import { CategorieEntity } from '../../../entities/Gestionproduit/categorie.entity';
import { ProduitEntity } from '../../../entities/Gestionproduit/produit.entity';
import { FilterContent } from './FilterContent';

const FilterContainer = styled.div`
  display: none;

  @media (min-width: 768px) {
    display: flex;
    flex-direction: column;
    width: 290px;
    border-radius: 20px;
    min-height: 250;
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

export const FilterOptions = ({
  produits,
  setFilterProduits,
}: {
  produits: ProduitEntity[];
  setFilterProduits: (products: ProduitEntity[]) => void;
}) => {
  const [filterValues, setFilterValues] = useState<{
    categories: CategorieEntity[];
    prixMinValue: number[];
    estBio: boolean;
  }>({
    categories: [],
    prixMinValue: [0, 1000000],
    estBio: true,
  });

  const handleFilter = () => {
    //Filter per categories
    /* fetchProduit().then((data) => {
      if (data.success) {
        setFilterProduits(data.result);
      }
    }); */

    let result: ProduitEntity[] = [];
    for (let cat of filterValues.categories) {
      result = [
        ...result,
        ...produits.filter((prod) => prod.category._id === cat._id),
      ];
    }

    //filter per prixMin
    result = result.filter(
      (prod) =>
        filterValues.prixMinValue[0] <= prod.prixMin &&
        prod.prixMin <= filterValues.prixMinValue[1],
    );

    //filter bio
    result = result.filter((prod) => prod.estBio === filterValues.estBio);

    setFilterProduits(result);
  };

  return (
    <div>
      <FilterContainer>
        <h2>Options de Filtrage</h2>
        <hr />
        <FilterContent
          filterValues={filterValues}
          setFilterValues={setFilterValues}
        />
        <Button
          type='primary'
          style={{ marginLeft: 50, marginRight: 50, borderRadius: 10 }}
          onClick={handleFilter}
        >
          Filtrer
        </Button>
      </FilterContainer>
    </div>
  );
};
