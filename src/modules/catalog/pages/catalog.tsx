/* eslint-disable @typescript-eslint/no-unused-vars */
import styled from '@emotion/styled';
import { Button, Input, Space } from 'antd';
import { useEffect, useState } from 'react';
import { ProduitEntity } from '../../../entities/Gestionproduit/produit.entity';
import { Footer } from '../../homePage/components/Footer';
import { Layout } from '../../shared/Layout';
import { ProductCard } from '../../shared/ProductCard';
import { fetchProduit } from '../../vendeur/network';
import { FilterOptions } from '../components/FilterOptions';
import { SortOptions } from '../components/SortOptions';

const { Search } = Input;

const CatalogContainer = styled.div`
  > .body {
    flex-direction: column;
    align-items: flex-start;
  }
  @media (min-width: 768px) {
    > .body {
      flex-direction: row;
    }
  }
`;

const onSearch = (value: string) => {
  console.log(value);
};

export const CatalogPage = () => {
  const [produits, setProduits] = useState<ProduitEntity[]>([]);

  useEffect(() => {
    fetchProduit().then((data) => {
      if (data.success) {
        setProduits(data.result);
      }
    });
  }, []);

  return (
    <>
      <Layout maxWidth={1300}>
        <Space
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            margin: 20,
          }}
        >
          <Search
            placeholder='Search product by name...'
            allowClear
            onSearch={onSearch}
            style={{ width: 400 }}
            enterButton
          />
        </Space>
        <CatalogContainer>
          <Space className='body'>
            <Space direction='vertical'>
              <Button
                onClick={() => {
                  fetchProduit().then((data) => {
                    if (data.success) {
                      setProduits(data.result);
                    }
                  });
                }}
              >
                Réinitialiser la liste
              </Button>
              <SortOptions products={produits} setSortProducts={setProduits} />
              <FilterOptions
                produits={produits}
                setFilterProduits={setProduits}
              />
            </Space>
            <div>
              <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {produits.map((produit) => (
                  <ProductCard key={produit._id} produit={produit} showInfo />
                ))}
              </div>
            </div>
          </Space>
        </CatalogContainer>
      </Layout>
      <Footer />
    </>
  );
};
