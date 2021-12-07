import styled from '@emotion/styled';
import { Space } from 'antd';
import { VendeurEntity } from '../../../entities/GestionCompte/vendeur.entity';
import { PRIMARY } from '../../../shared/colors';
import { VendorCard } from '../../shared/VendorCard';

const VendorGroupContainer = styled.div`
  margin-bottom: 60px;
  h2 {
    color: ${PRIMARY};
  }

  > div {
    display: flex;
    flex-wrap: wrap;
  }
`;

export const VendorGroup = ({
  label,
  vendors,
}: {
  label: string;
  vendors: VendeurEntity[];
}) => {
  return (
    <VendorGroupContainer>
      <Space style={{ justifyContent: 'space-between' }}>
        <h2>{label}</h2>
        <h3
          style={{
            margin: 0,
            textDecoration: 'underline',
            cursor: 'pointer',
          }}
        >
          {/*  Voir plus{' '}
          <FaAngleRight color='red' size={20} style={{ marginBottom: -6 }} /> */}
        </h3>
      </Space>
      <div>
        {vendors.length === 0 ? (
          <p>Liste Vide!</p>
        ) : (
          vendors.map((vendor: VendeurEntity) => (
            <VendorCard key={vendor._id} vendor={vendor} />
          ))
        )}
      </div>
    </VendorGroupContainer>
  );
};
