import styled from '@emotion/styled';
import { ReactNode, useState } from 'react';
import { FaChalkboardTeacher, FaClipboardList, FaUser } from 'react-icons/fa';
import { SideBar } from '../../shared/SideBar';

const Container = styled.div`
  margin-left: 50px;
  padding: 30px;
  font-size: 14px;
  font-family: Roboto;
  transition: 0.5s;

  @media (min-width: 1200px) {
    margin-left: 200px;
    padding: 50px;
    transition: 0.5s;

    .shrink {
      margin-left: -180px;
      transition: 0.5s;
    }
  }
`;

export const AdminContainer = ({
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
        <div className={shrink ? 'shrink' : ''}>{children}</div>
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
    link: '/admin/dashboard',
    text: 'Dashboard',
    clicked: 'dashboard',
  },
  {
    icon: (clicked: string) => (
      <FaClipboardList
        color={clicked === 'produits' ? 'white' : 'black'}
        size={24}
      />
    ),
    link: '/admin/products',
    text: 'Produits',
    clicked: 'produits',
  },
  {
    icon: (clicked: string) => (
      <FaUser color={clicked === 'account' ? 'white' : 'black'} size={24} />
    ),
    link: '/admin/my-account',
    text: 'Mon Compte',
    clicked: 'account',
  },
];