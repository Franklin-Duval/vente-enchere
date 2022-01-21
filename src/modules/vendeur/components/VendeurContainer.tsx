import styled from '@emotion/styled';
import { ReactNode, useState } from 'react';
import { FaChalkboardTeacher, FaClipboardList, FaUser } from 'react-icons/fa';
import { DashboardHeader } from '../../shared/DashboardHeader';
import { SideBar } from '../../shared/SideBar';

const Container = styled.div`
  margin-left: 50px;
  padding-left: 30px;
  font-size: 14px;
  font-family: Roboto;
  transition: 0.5s;

  .header {
    border: 1px solid black;
    height: 70px;
  }

  @media (min-width: 1200px) {
    margin-left: 200px;
    padding-left: 50px;
    transition: 0.5s;

    .shrink {
      margin-left: -180px;
      transition: 0.5s;
    }

    .header-shrinked {
      margin-left: -200px;
      transition: 0.5s;
      height: 80px;
    }
  }
`;

export const VendeurContainer = ({
  clicked,
  children,
}: {
  children: ReactNode;
  clicked: string;
}) => {
  const [shrink, setShrink] = useState(false);
  return (
    <div>
      <SideBar
        routes={ROUTES}
        clicked={clicked}
        shrink={shrink}
        setShrink={setShrink}
      />
      <Container>
        <DashboardHeader shrinked={shrink} />
        <div style={{ padding: 50 }}>
          <div className={shrink ? 'shrink' : ''}>{children}</div>
        </div>
      </Container>
    </div>
  );
};

const ROUTES = [
  {
    icon: (clicked: string) => (
      <FaChalkboardTeacher
        color={clicked === 'dashboard' ? 'white' : 'black'}
        size={25}
      />
    ),
    link: '/vendeur/dashboard',
    text: 'Dashboard',
    clicked: 'dashboard',
  },
  {
    icon: (clicked: string) => (
      <FaClipboardList
        color={clicked === 'products' ? 'white' : 'black'}
        size={24}
      />
    ),
    link: '/vendeur/products',
    text: 'Mes Evènements',
    clicked: 'products',
  },
  {
    icon: (clicked: string) => (
      <FaUser color={clicked === 'account' ? 'white' : 'black'} size={24} />
    ),
    link: '/vendeur/account',
    text: 'Mon Compte',
    clicked: 'account',
  },
];
