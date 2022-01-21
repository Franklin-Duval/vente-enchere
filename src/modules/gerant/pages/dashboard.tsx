import { useEffect, useState } from 'react';
import { FaClock, FaUserAlt, FaUserMinus, FaUserPlus } from 'react-icons/fa';
import { VendeurEntity } from '../../../entities/GestionCompte/vendeur.entity';
import { GerantContainer } from '../components/GerantContainer';
import { StatsGerant } from '../components/Stats';
import { VendorGroup } from '../components/VendorGroup';
import { fetchVendeurs } from '../network/gerant.network';

export const GerantDashboard = () => {
  // const [isLoading, setIsLoading] = useState(false);
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

  const Stats = [
    {
      icon: <FaUserAlt size={30} color='white' />,
      text: 'All',
      stat: vendeurs.length,
      gradientColors: ['#00b5b8', '#16d39a'],
    },
    {
      icon: <FaClock size={30} color='white' />,
      text: 'Pending Requests',
      stat: 0,
      gradientColors: ['#FF425C', '#FFA8B4'],
    },
    {
      icon: <FaUserPlus size={30} color='white' />,
      text: 'Activated Accounts',
      stat: activatedVendors.length,
      gradientColors: ['#2193b0', '#6dd5ed'],
    },
    {
      icon: <FaUserMinus size={30} color='white' />,
      text: 'Deactivated Accounts',
      stat: deactivatedVendors.length,
      gradientColors: ['#ef629f', '#eecda3'],
    },
  ];

  return (
    <GerantContainer clicked='dashboard'>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
          padding: '0 50px',
        }}
      >
        <StatsGerant stats={Stats} />
        <VendorGroup label='Pending requests' vendors={[]} />
        <VendorGroup label='Activated vendors' vendors={activatedVendors} />
        <VendorGroup label='Deactivated vendors' vendors={deactivatedVendors} />
      </div>
    </GerantContainer>
  );
};
