import { Collapse, Select, Space } from 'antd';
import { ProduitEntity } from '../../../entities/Gestionproduit/produit.entity';

let _ = require('lodash');

export const SortContent = ({
  products,
  setProducts,
}: {
  products: ProduitEntity[];
  setProducts: (products: ProduitEntity[]) => void;
}) => {
  return (
    <Collapse defaultActiveKey={['1']} ghost>
      <Collapse.Panel key={2} header='Nom'>
        <Space direction='vertical'>
          <Space>
            <Select
              placeholder='Choisir un ordre'
              style={{ width: '100%', marginLeft: 30 }}
              onSelect={(value) => {
                products = _.sortBy(products, ['nom']);
                if (value === 1) {
                  products = products.reverse();
                }
                setProducts(products);
              }}
            >
              <Select.Option value={0}>A-Z</Select.Option>
              <Select.Option value={1}>Z-A</Select.Option>
            </Select>
          </Space>
        </Space>
      </Collapse.Panel>
      <Collapse.Panel key={3} header="Prix minimal d'enchère">
        <Space direction='vertical'>
          <Space>
            <Select
              placeholder='Choisir un ordre'
              style={{ width: '100%', marginLeft: 30 }}
              onSelect={(value) => {
                products = _.sortBy(products, ['prixMin']);
                if (value === 'desc') {
                  products = products.reverse();
                }
                setProducts(products);
              }}
            >
              <Select.Option value='asc'>Ascendant</Select.Option>
              <Select.Option value='desc'>Descedant</Select.Option>
            </Select>
          </Space>
        </Space>
      </Collapse.Panel>
    </Collapse>
  );
};
