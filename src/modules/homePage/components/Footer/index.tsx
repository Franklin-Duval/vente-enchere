import styled from '@emotion/styled';
import { Divider, Space } from 'antd';
import React from 'react';
import { FaChrome, FaFacebook, FaPhoneAlt } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { PRIMARY } from '../../../../shared/colors';
import { Wave } from '../../WaveSvg/waveSvg';

const FooterContainer = styled.div`
  margin-top: -1px;
  padding: 20px;
  background-color: ${PRIMARY};
  color: white;
  min-height: 300px;
  padding-top: 70px;

  .content {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;

    > div {
      display: flex;
      flex-direction: column;
      margin: 20px;
      h2 {
        color: white;
        font-family: Montserrat;
      }
      p {
        font-size: 16px;
        font-family: Calibri;
        margin: 0;
      }
      > .social-icon {
        display: flex;
        flex-wrap: wrap;
        margin-top: 20px;

        > p {
          font-size: 16px;
        }
      }
    }
  }

  .copyright {
    text-align: center;
    font-size: 16px;
  }
`;

export const Footer = () => {
  return (
    <>
      <Wave />
      <FooterContainer id='contact'>
        <div className='content'>
          <div>
            <h2>Découvrir nos annonces</h2>
            <Divider
              style={{
                height: 1.5,
                backgroundColor: 'white',
                marginTop: 0,
                marginBottom: 20,
              }}
            />
            <p>Bananes de l'ouest</p>
            <p>Maïs frais du centre</p>
            <p>Avocats de Mbouda</p>
            <p>Plantains</p>
            <p>Tracteurs</p>
            <p>Machettes</p>
          </div>
          <div>
            <h2>Découvrir nos produits</h2>
            <Divider
              style={{
                height: 1.5,
                backgroundColor: 'white',
                marginTop: 0,
                marginBottom: 20,
              }}
            />
            <p>Bananes de l'ouest</p>
            <p>Maïs frais du centre</p>
            <p>Avocats de Mbouda</p>
            <p>Plantains</p>
            <p>Tracteurs</p>
            <p>Machettes</p>
          </div>
          <div>
            <h2>Autres</h2>
            <Divider
              style={{
                height: 1.5,
                backgroundColor: 'white',
                marginTop: 0,
                marginBottom: 20,
              }}
            />
            <p>Mention Légale</p>
            <p>Conditions d'utilisation</p>
            <p>Aide & FAQs</p>
            <p>Assurance</p>
            <div className='social-icon'>
              <Space size={30}>
                {socialLinks.map(({ link, icon }, index) => (
                  <a key={index} href={link} target='_blank' rel='noreferrer'>
                    {icon}
                  </a>
                ))}
              </Space>
            </div>
          </div>
        </div>
        <div className='copyright'>
          <hr style={{ backgroundColor: 'white' }} />
          <p style={{ textAlign: 'center' }}>Copyright © 2021 - GI 2022.</p>
        </div>
      </FooterContainer>
    </>
  );
};

const socialLinks = [
  {
    link: 'https://www.facebook.com/kmtcapitalsarl/',
    icon: <FaFacebook size={25} color='white' />,
  },
  {
    link: undefined,
    icon: (
      <FaPhoneAlt
        size={20}
        color='white'
        onClick={() => window.open('tel:695060693')}
      />
    ),
  },
  {
    link: '/',
    icon: <FaChrome size={25} color='white' />,
  },
  {
    link: undefined,
    icon: (
      <MdEmail
        size={25}
        color='white'
        onClick={() => window.open('mailto:kjauresjaspers@gmail.com')}
      />
    ),
  },
];
