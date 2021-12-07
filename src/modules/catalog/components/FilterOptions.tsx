/* eslint-disable @typescript-eslint/no-unused-vars */
import styled from '@emotion/styled';
import { Button, Collapse, Input, Select, Space } from 'antd';
import { useEffect, useState } from 'react';
import { FaSlidersH } from 'react-icons/fa';
import { PRIMARY } from '../../../shared/colors';
import { ButtonWithModal } from '../../shared/ButtonWithModal';

const FilterContainer = styled.div`
  display: none;

  @media (min-width: 768px) {
    display: flex;
    flex-direction: column;
    width: 290px;
    border-radius: 20px;
    min-height: 500px;
    flex-wrap: wrap;
    padding: 5px;
    padding-bottom: 20px;
    margin-top: 5px;
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

const FilterMobileContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px;
  @media (min-width: 768px) {
    display: none;
  }
`;

export const FilterOptions = ({
  auctions,
  setFilterLands,
}: {
  auctions: any[];
  setFilterLands: (lands: []) => void;
}) => {
  return (
    <div>
      <FilterMobileContainer>
        <ButtonWithModal
          buttonText={
            <Space>
              <FaSlidersH size={18} />
              <p style={{ marginBottom: 2 }}>Filtrer</p>
            </Space>
          }
          modalProps={{ title: 'Options de filtre' }}
          buttonProps={{
            type: 'default',
            size: 'large',
            style: { width: 300 },
          }}
        >
          {(closeModal) => (
            <>
              <FilterContent
                auctions={auctions}
                setFilterLands={setFilterLands}
              />
              <Button
                onClick={closeModal}
                type='primary'
                size='large'
                style={{
                  width: '100%',
                  marginTop: 20,
                  backgroundColor: PRIMARY,
                }}
              >
                Filtrer
              </Button>
            </>
          )}
        </ButtonWithModal>
      </FilterMobileContainer>
      <FilterContainer>
        <h2>Filtres</h2>
        <hr />
        <FilterContent auctions={auctions} setFilterLands={setFilterLands} />
      </FilterContainer>
    </div>
  );
};

const FilterContent = ({
  auctions,
  setFilterLands,
}: {
  auctions: any[];
  setFilterLands: (lands: []) => void;
}) => {
  const [filterValues, setFilterValues] = useState<{
    zoneValue: string;
    priceValue: number[];
    superficieValue: number[];
    typeValue: string;
  }>({
    zoneValue: '',
    priceValue: [0, 100000],
    superficieValue: [0, 100000],
    typeValue: '',
  });

  const [multiplierSuperficieMin, setMultiplierSuperficieMin] = useState(1);
  const [multiplierSuperficieMax, setMultiplierSuperficieMax] = useState(1);
  const [selectedLocalisations, setSelectedLocalisations] = useState<string[]>(
    [],
  );
  const [priceOption, setPriceOption] = useState('m2');

  useEffect(() => {
    // setFilterLands(
    //   auctions
    //     .filter(
    //       (land) =>
    //         selectedLocalisations.length === 0 ||
    //         selectedLocalisations.includes(land.localisation.quartier),
    //     )
    //     .filter((land) => land.etat.includes(filterValues.typeValue))
    //     .filter((land) =>
    //       priceOption === 'm2'
    //         ? land.prix >= filterValues.priceValue[0] &&
    //           land.prix <= filterValues.priceValue[1]
    //         : priceOption === 'hectare'
    //         ? (land.prixHectare as number) >= filterValues.priceValue[0] &&
    //           (land.prixHectare as number) <= filterValues.priceValue[1]
    //         : (land.prixGlobal as number) >= filterValues.priceValue[0] &&
    //           (land.prixGlobal as number) <= filterValues.priceValue[1],
    //     )
    //     .filter(
    //       (land) =>
    //         land.superficie >= filterValues.superficieValue[0] &&
    //         land.superficie <= filterValues.superficieValue[1],
    //     ),
    // );
    // eslint-disable-next-line
  }, [filterValues, selectedLocalisations]);

  return (
    <Collapse defaultActiveKey={['1']} ghost>
      <Collapse.Panel key={2} header='Superficie'>
        <Space direction='vertical'>
          <Space>
            <Select
              placeholder='metric'
              defaultValue='m2'
              style={{ width: 120 }}
              onChange={(value) => {
                if (value === 'm2') {
                  setMultiplierSuperficieMin(1);
                  filterValues.superficieValue = [
                    filterValues.superficieValue[0] / 10000,
                    filterValues.superficieValue[1],
                  ];
                  setFilterValues({ ...filterValues });
                } else {
                  setMultiplierSuperficieMin(10000);
                  filterValues.superficieValue = [
                    filterValues.superficieValue[0] * 10000,
                    filterValues.superficieValue[1],
                  ];
                  setFilterValues({ ...filterValues });
                }
              }}
            >
              <Select.Option value='m2'>m²</Select.Option>
              <Select.Option value='hectare'>hectare</Select.Option>
            </Select>
            <Select
              placeholder='metric'
              defaultValue='m2'
              style={{ width: 120 }}
              onChange={(value) => {
                if (value === 'm2') {
                  setMultiplierSuperficieMax(1);
                  filterValues.superficieValue = [
                    filterValues.superficieValue[0],
                    filterValues.superficieValue[1] / 10000,
                  ];
                  setFilterValues({ ...filterValues });
                } else {
                  setMultiplierSuperficieMax(10000);
                  filterValues.superficieValue = [
                    filterValues.superficieValue[0],
                    filterValues.superficieValue[1] * 10000,
                  ];
                  setFilterValues({ ...filterValues });
                }
              }}
            >
              <Select.Option value='m2'>m²</Select.Option>
              <Select.Option value='hectare'>hectare</Select.Option>
            </Select>
          </Space>
          <Space>
            <Input
              placeholder='min'
              onChange={(event) => {
                filterValues.superficieValue[0] =
                  Number(event.target.value) * multiplierSuperficieMin;
                setFilterValues({ ...filterValues });
              }}
              style={{ width: 120 }}
            />
            <Input
              placeholder='max'
              onChange={(event) => {
                filterValues.superficieValue[1] =
                  Number(event.target.value) * multiplierSuperficieMax;
                setFilterValues({ ...filterValues });
              }}
              style={{ width: 120 }}
            />
          </Space>
        </Space>
      </Collapse.Panel>
      <Collapse.Panel key={3} header='Mise à prix'>
        <Space direction='vertical'>
          <Select
            placeholder='metric'
            defaultValue='m2'
            style={{ width: '100%' }}
            onChange={(value) => {
              setPriceOption(value);
            }}
          >
            <Select.Option value='m2'>par m²</Select.Option>
            <Select.Option value='hectare'>par hectare</Select.Option>
            <Select.Option value='global'>global</Select.Option>
          </Select>
          <Space>
            <Input
              placeholder='min'
              onChange={(event) => {
                filterValues.priceValue[0] = Number(event.target.value);
                setFilterValues({ ...filterValues });
              }}
            />
            <Input
              placeholder='max'
              onChange={(event) => {
                filterValues.priceValue[1] = Number(event.target.value);
                setFilterValues({ ...filterValues });
              }}
            />
          </Space>
        </Space>
      </Collapse.Panel>
      <Collapse.Panel key={4} header='Type de terrain'>
        <Select
          placeholder='terrain'
          style={{ width: '100%' }}
          onChange={(value) => {
            if (value) {
              if (value.toString() === '----') {
                setFilterValues({
                  ...filterValues,
                  typeValue: '',
                });
              } else {
                setFilterValues({
                  ...filterValues,
                  typeValue: value.toString(),
                });
              }
            }
          }}
        >
          <Select.Option value='----'>----</Select.Option>
          <Select.Option value='Titré'>Titré</Select.Option>
          <Select.Option value='Non Titré'>Non Titré</Select.Option>
          <Select.Option value='Loti'>Loti</Select.Option>
        </Select>
      </Collapse.Panel>
      <Collapse.Panel key={1} header='Catégorie'>
        {/* {ZONES.map((zone) => (
          <GroupCheckbox
            key={zone.ville}
            title={zone.ville}
            content={zone.localisation}
            selectedValues={setSelectedLocalisations}
          />
        ))} */}
      </Collapse.Panel>
    </Collapse>
  );
};
