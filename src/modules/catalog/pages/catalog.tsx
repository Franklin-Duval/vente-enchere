/* eslint-disable @typescript-eslint/no-unused-vars */
import styled from '@emotion/styled';
import { Cascader, Space } from 'antd';
import { useEffect, useState } from 'react';
import { FiFilter } from 'react-icons/fi';
import { Footer } from '../../homePage/components/Footer';
import { AuctionCard } from '../../shared/AuctionCard';
import { Layout } from '../../shared/Layout';
import { FilterOptions } from '../components/FilterOptions';

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

export const CatalogPage = () => {
  const [lands, setLands] = useState([]);
  const [filterLands, setFilterLands] = useState([]);

  useEffect(() => {
    // fetchLands()
    //   .then((lands) => {
    //     setLands(lands.result);
    //     setFilterLands(lands.result);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
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
          <Cascader
            options={options}
            expandTrigger='hover'
            placeholder='Trier par'
            displayRender={(label) => {
              if (label.length !== 0) {
                return `${label[0]}-${label[1]}`;
              }
            }}
            suffixIcon={<FiFilter color='black' />}
            onChange={(value) => {
              // const order = value[1] as 'asc' | 'desc';
              // if (value[0].toString() === '----') {
              //   setFilterLands(filterLands);
              // } else if (value[0].toString() === '1') {
              //   setFilterLands(orderBy(filterLands, ['superficie'], order));
              // } else if (value[0].toString() === '2') {
              //   setFilterLands(orderBy(filterLands, ['prix'], order));
              // } else if (value[0].toString() === '3') {
              //   setFilterLands(orderBy(filterLands, ['prix'], order));
              // } else if (value[0].toString() === '4') {
              //   setFilterLands(orderBy(filterLands, ['prix'], order));
              // }
            }}
          />
        </Space>
        <CatalogContainer>
          <Space className='body'>
            <FilterOptions auctions={lands} setFilterLands={setFilterLands} />
            <div>
              <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {/* {filterLands.map((auction, index) => (
                  <AuctionCard key={index} auction={{}} />
                ))} */}
                <AuctionCard auction={{}} />
                <AuctionCard auction={{}} />
                <AuctionCard auction={{}} />
                <AuctionCard auction={{}} />
                <AuctionCard auction={{}} />
                <AuctionCard auction={{}} />
                <AuctionCard auction={{}} />
                <AuctionCard auction={{}} />
                <AuctionCard auction={{}} />
              </div>
            </div>
          </Space>
        </CatalogContainer>
      </Layout>
      <Footer />
    </>
  );
};

const options = [
  {
    value: '----',
    label: '----',
    children: [
      {
        value: '----',
        label: '----',
      },
    ],
  },
  {
    value: '1',
    label: 'Superficie',
    children: [
      {
        value: 'asc',
        label: 'Croissant',
      },
      {
        value: 'desc',
        label: 'Décroissant',
      },
    ],
  },
  {
    value: '2',
    label: 'Prix par m²',
    children: [
      {
        value: 'asc',
        label: 'Croissant',
      },
      {
        value: 'desc',
        label: 'Décroissant',
      },
    ],
  },
  {
    value: '3',
    label: 'Prix par hectare',
    children: [
      {
        value: 'asc',
        label: 'Croissant',
      },
      {
        value: 'desc',
        label: 'Décroissant',
      },
    ],
  },
  {
    value: '4',
    label: 'Prix terrains entier',
    children: [
      {
        value: 'asc',
        label: 'Croissant',
      },
      {
        value: 'desc',
        label: 'Décroissant',
      },
    ],
  },
];
