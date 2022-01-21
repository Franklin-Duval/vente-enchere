import { Checkbox, Collapse, Input, Space } from 'antd';
import { useEffect, useState } from 'react';
import { CategorieEntity } from '../../../entities/Gestionproduit/categorie.entity';
import { fetchCategories } from '../../vendeur/network';

export const FilterContent = ({
  filterValues,
  setFilterValues,
}: {
  filterValues: any;
  setFilterValues: (filterValues: any) => void;
}) => {
  const [categorieOptions, setCategorieOptions] = useState<CategorieEntity[]>(
    [],
  );

  useEffect(() => {
    fetchCategories().then((data) => {
      if (data.success) {
        setCategorieOptions(data.result);
      }
    });
  }, []);

  return (
    <Collapse defaultActiveKey={['1']} ghost>
      <Collapse.Panel key={2} header='Catégorie'>
        <Space direction='vertical' style={{ marginLeft: 30, marginRight: 30 }}>
          {categorieOptions.map((elt) => (
            <Checkbox
              key={elt._id}
              onChange={(e) => {
                if (e.target.checked) {
                  filterValues.categories.push(elt);
                } else {
                  filterValues.categories = filterValues.categories.filter(
                    (category: CategorieEntity) => category._id !== elt._id,
                  );
                }
                setFilterValues({ ...filterValues });
              }}
            >
              {elt.nom}
            </Checkbox>
          ))}
        </Space>
      </Collapse.Panel>
      <Collapse.Panel key={3} header="Prix minimal d'enchère">
        <Space direction='vertical'>
          <Space>
            <Input
              placeholder='0'
              type='number'
              onChange={(event) => {
                filterValues.prixMinValue[0] = Number(event.target.value);
                setFilterValues({ ...filterValues });
              }}
            />
            <Input
              placeholder='10000000'
              type='number'
              onChange={(event) => {
                filterValues.prixMinValue[1] = Number(event.target.value);
                setFilterValues({ ...filterValues });
              }}
            />
          </Space>
        </Space>
      </Collapse.Panel>
      <Collapse.Panel key={4} header='Type'>
        <Checkbox
          style={{ marginLeft: 30, marginRight: 30 }}
          onChange={(e) => {
            filterValues.estBio = e.target.checked;
            setFilterValues({ ...filterValues });
          }}
        >
          Produits Bio
        </Checkbox>
      </Collapse.Panel>
    </Collapse>
  );
};
