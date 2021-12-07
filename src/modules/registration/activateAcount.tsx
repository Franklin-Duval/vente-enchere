import styled from '@emotion/styled';
import { Header } from '../shared/Layout/header';
import { MessageContainer } from '../shared/MessageContainer';

const ActivateCompanyContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 700px;
`;

export const ActivateAccount = () => {
  return (
    <>
      <Header />
      <ActivateCompanyContainer>
        <MessageContainer
          title='Votre compte a été créé.'
          description='Vérifiez vos mails et cliquez sur le lien afin de pouvoir activer votre
        compte'
        />
      </ActivateCompanyContainer>
    </>
  );
};
