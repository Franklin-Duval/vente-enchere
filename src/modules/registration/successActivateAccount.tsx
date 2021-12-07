import styled from '@emotion/styled';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ConnectedUserEntity } from '../../entities/ConnectedUserEntity';
import { ROUTES } from '../../routes';
import { Header } from '../shared/Layout/header';
import { MessageContainer } from '../shared/MessageContainer';

const ActivateCompanyContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 700px;
`;

export const SuccessActivateAccount = () => {
  const router = useHistory();
  const connectedUser: ConnectedUserEntity = useSelector(
    (state: any) => state.userReducer,
  ).user;

  return (
    <>
      <Header />
      <ActivateCompanyContainer>
        <MessageContainer
          title='Votre compte a été activé avec succès.'
          onClick={() =>
            connectedUser.roles.includes('vendeur')
              ? router.push(ROUTES.VENDEUR_PAGE.DASHBOARD)
              : router.push(ROUTES.CATALOG_PAGE.CATALOG)
          }
        />
      </ActivateCompanyContainer>
    </>
  );
};
