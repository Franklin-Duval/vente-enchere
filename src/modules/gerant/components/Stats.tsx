import styled from '@emotion/styled';
import { ReactNode } from 'react';
import { PRIMARY } from '../../../shared/colors';
import { StatsCard } from '../../shared/StatsCard';

const StatsContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 50px;

  @media (min-width: 1200px) {
    justify-content: space-between;
  }
`;

export const StatsGerant = ({ stats }: { stats: StatType[] }) => {
  return (
    <>
      <h2 style={{ color: PRIMARY, marginBottom: 20 }}>Summary</h2>
      <StatsContainer>
        {stats.map((stat) => (
          <StatsCard
            icon={stat.icon}
            stat={stat.stat}
            text={stat.text}
            gradientColors={stat.gradientColors}
          />
        ))}
      </StatsContainer>
    </>
  );
};

export type StatType = {
  icon: ReactNode;
  text: string;
  stat: number;
  gradientColors: string[];
};
