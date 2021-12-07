import styled from '@emotion/styled';
import { ReactNode } from 'react';

const Container = styled.div`
  .header-container {
    box-shadow: 0 3px 5px 0 rgba(81, 45, 168, 0.3),
      0 6px 20px 0 rgba(81, 45, 168, 0.3);
    height: 80px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 10px 30px;
    margin-bottom: 50px;
  }

  @media (min-width: 1200px) {
    transition: 0.5s;

    .header-shrinked {
      box-shadow: 0px 6px 20px 0 rgba(81, 45, 168, 0.3);
      margin-left: -200px;
      transition: 0.5s;
      height: 80px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 10px 30px;
      margin-bottom: 50px;
    }
  }
`;

export const GerantHeader = ({
  shrinked,
  children,
}: {
  children: ReactNode;
  shrinked: boolean;
}) => {
  return (
    <div style={{}}>
      <Container>
        <div className={shrinked ? 'header-shrinked' : 'header-container'}>
          {children}
        </div>
      </Container>
    </div>
  );
};
