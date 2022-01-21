import styled from '@emotion/styled';
import { Image } from 'antd';
import React from 'react';
import { FaOutdent, FaSignInAlt } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import logo from '../../../assets/images/logo2.png';
import { createUser } from '../../../redux/userStore/actions';
import { ROUTES } from '../../../routes';
import { PRIMARY } from '../../../shared/colors';
import { defaultImage } from '../../../shared/defaultImage';

const SideBarContainer = styled.div`
  .side-line {
    border: 1.2px solid ${PRIMARY};
    background-color: ${PRIMARY};
    margin: auto;
    margin-bottom: 20px;
    width: 90%;
  }

  .side-nav {
    height: 100%;
    width: 250px;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    background-color: white;
    overflow-x: hidden;
    float: left;
    transition: 0.5s;
    box-shadow: 0 3px 5px 0 rgba(81, 45, 168, 0.3),
      0 6px 20px 0 rgba(81, 45, 168, 0.3);

    > .img {
      display: flex;
      justify-content: center;
    }

    .link {
      display: flex;
      align-items: center;
      padding: 6px 6px 6px 10px;
      font-size: 15px;
      color: black;
      margin-bottom: 5px;
      font-family: 'Roboto';
      margin-left: 0px;
      margin-right: 0px;
      cursor: pointer;

      &:hover {
        background-color: #f4f5f8;
      }
    }

    .side-bar-text {
      margin-left: 10px;
    }
  }

  .clicked {
    display: flex;
    align-items: center;
    padding: 6px 6px 6px 10px;
    text-decoration: none;
    font-size: 15px;
    background-image: linear-gradient(to right, ${PRIMARY}, #2193fd);
    color: white;
    margin-bottom: 5px;
    font-family: 'Roboto';
    margin-left: 0px;
    margin-right: 0px;

    &:hover {
      background-image: linear-gradient(to right, #2193fd, #0053f3);
      color: white;
    }
  }

  .shrink-nav-bar {
    width: 50px;
    transition: 0.5s;

    > .img {
      display: none;
    }

    .side-bar-text {
      display: none;
    }
  }

  @media (max-width: 1200px) {
    .side-nav {
      width: 50px;
      transition: 0.5s;

      > .img {
        display: none;
      }
      .side-bar-text {
        display: none;
      }
    }

    .shrink-nav-bar {
      width: 250px;
      transition: 0.5s;

      > .img {
        display: block;
      }

      .side-bar-text {
        display: block;
      }
    }
  }
`;

export const SideBar = ({
  routes,
  clicked,
  shrink,
  setShrink,
}: {
  routes: any[];
  clicked: string;
  shrink: boolean;
  setShrink: (val: boolean) => void;
}) => {
  const router = useHistory();
  const dispatch = useDispatch();
  return (
    <SideBarContainer>
      <div className={shrink ? 'side-nav shrink-nav-bar' : 'side-nav'}>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <FaOutdent
            color='black'
            size={25}
            style={{ margin: 10, cursor: 'pointer' }}
            onClick={() => setShrink(!shrink)}
          />
        </div>
        <div className='img'>
          <Image
            alt='logo'
            src={logo}
            height={120}
            width={150}
            preview={false}
            style={{ objectFit: 'cover' }}
            fallback={defaultImage}
          />
        </div>
        <div className='side-line' />

        {routes.map((item) => (
          <div
            key={item.clicked}
            className={clicked === item.clicked ? 'clicked' : 'link'}
            onClick={() => router.push(item.link)}
          >
            {item.icon(clicked)}
            <span className='side-bar-text'>{item.text}</span>
          </div>
        ))}
        <div
          className={clicked === 'deconnect' ? 'clicked' : 'link'}
          onClick={() => {
            //revoke token
            dispatch(
              createUser({
                authentifie: false,
                roles: [],
                id: '',
                nom: '',
                prenom: '',
                token: '',
                nextAuthDate: 0,
              }),
            );
            router.push(ROUTES.SIGNIN);
          }}
        >
          <FaSignInAlt color='black' size={20} />
          <span className='side-bar-text'>Log out</span>
        </div>
      </div>
    </SideBarContainer>
  );
};
