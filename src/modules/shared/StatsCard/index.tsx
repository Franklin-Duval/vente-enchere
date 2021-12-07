import styled from '@emotion/styled';
import { ReactNode } from 'react';

const StatsContainer = styled.div<{ gradientColors: string[] }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 250px;
  height: 100px;
  margin: 5px;
  background: linear-gradient(
    45deg,
    ${(props) => `${props.gradientColors[0]} 50%, ${props.gradientColors[1]}`}
  );
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0 3px 5px 0 rgba(81, 45, 168, 0.3),
    0 6px 20px 0 rgba(81, 45, 168, 0.3);

  .stats {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
    font-family: Roboto;
    font-size: 16px;

    > .num {
      font-family: Montserrat;
      font-size: 18px;
      margin-bottom: 5px;
    }
  }

  @media (min-width: 768px) {
    width: 280px;
    height: 130px;

    .stats {
      font-size: 18px;

      > .num {
        font-size: 25px;
        margin-bottom: 10px;
      }
    }
  }
`;

export const StatsCard = ({
  icon,
  stat,
  text,
  gradientColors,
}: {
  icon: ReactNode;
  stat: number;
  text: string;
  gradientColors: string[];
}) => {
  return (
    <StatsContainer gradientColors={gradientColors}>
      <div>{icon}</div>
      <div className='stats'>
        <p className='num'>{stat} </p>
        <p>{text}</p>
      </div>
    </StatsContainer>
  );
};
