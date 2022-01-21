import { useEffect, useState } from 'react';
import { VendeurEntity } from '../../../entities/GestionCompte/vendeur.entity';
import { GerantContainer } from '../components/GerantContainer';
import { VendorGroup } from '../components/VendorGroup';
import { fetchVendeurs } from '../network/gerant.network';

export const GerantVendors = () => {
  const [vendeurs, setVendeurs] = useState<VendeurEntity[]>([]);

  const activatedVendors: VendeurEntity[] = vendeurs.filter(
    (vendeur) => vendeur.accreditation,
  );

  const deactivatedVendors: VendeurEntity[] = vendeurs.filter(
    (vendeur) => !vendeur.accreditation,
  );

  useEffect(() => {
    fetchVendeurs().then((data) => {
      if (data.success) {
        setVendeurs(data.result);
      }
    });
  }, []);

  return (
    <GerantContainer clicked='vendors'>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
          padding: '0 50px',
        }}
      >
        <VendorGroup label='Pending requests' vendors={[]} />
        <VendorGroup label='Activated vendors' vendors={activatedVendors} />
        <VendorGroup label='Deactivated vendors' vendors={deactivatedVendors} />
      </div>
    </GerantContainer>
  );
};
