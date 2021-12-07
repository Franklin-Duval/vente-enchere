import styled from '@emotion/styled';
import { Avatar, Badge, Dropdown, Menu, Space } from 'antd';
import { FaBell, FaRegUser } from 'react-icons/fa';
import { FiLogOut, FiMail } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import im from '../../../assets/images/slide1.jpg';
import { ConnectedUserEntity } from '../../../entities/ConnectedUserEntity';
import { SEMIDARK } from '../../../shared/colors';

const Container = styled.div`
  color: white;

  p {
    margin: 0;
  }

  .header-container {
    height: 60px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 10px 30px;
    background-color: ${SEMIDARK};
  }

  @media (min-width: 1200px) {
    .header-shrinked {
      margin-left: -200px;
      transition: 0.5s;
      height: 60px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 10px 30px;
      margin-bottom: 50px;
      background-color: ${SEMIDARK};
    }
  }
`;

export const DashboardHeader = ({ shrinked }: { shrinked: boolean }) => {
  const connectedUser: ConnectedUserEntity = useSelector(
    (state: any) => state.userReducer,
  ).user;

  return (
    <div>
      <Container>
        <div className={shrinked ? 'header-shrinked' : 'header-container'}>
          <div>
            <h2 style={{ color: 'white', margin: 0 }}>Dashboard</h2>
          </div>
          <div>
            <Space size={30}>
              <Badge
                title='Nouvelle notification'
                count={2}
                overflowCount={10}
                size='small'
              >
                <FaBell size={20} color='white' />
              </Badge>
              <Badge
                title='Nouveau message'
                count={5}
                overflowCount={10}
                size='small'
              >
                <FiMail size={20} color='white' />
              </Badge>
              <Space>
                <Avatar src={im} />
                <Dropdown overlay={menu} placement='bottomCenter'>
                  <p style={{ cursor: 'pointer' }}>
                    {connectedUser.nom} {connectedUser.prenom}{' '}
                  </p>
                </Dropdown>
              </Space>
            </Space>
          </div>
        </div>
      </Container>
    </div>
  );
};

const menu = (
  <Menu>
    <Menu.Item>
      <Space>
        <FaRegUser />
        <p style={{ margin: 0 }}>Modifier profil</p>
      </Space>
    </Menu.Item>
    <Menu.Item>
      <Space>
        <FiLogOut />
        <p style={{ margin: 0 }}>Se déconnecter</p>
      </Space>
    </Menu.Item>
  </Menu>
);
