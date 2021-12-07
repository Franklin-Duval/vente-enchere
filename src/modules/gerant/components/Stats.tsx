import styled from '@emotion/styled';
import { MdOutlineAssessment } from 'react-icons/md';
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

export const Stats = ({ stats }: { stats: any[] }) => {
  return (
    <>
      <h2 style={{ color: PRIMARY, marginBottom: 20 }}>Summary</h2>
      <StatsContainer>
        {stats.map((stat) => (
          <StatsCard
            icon={<MdOutlineAssessment color={PRIMARY} size={50} />}
            stat={stat.value}
            text={stat.label}
            gradientColors={['green', PRIMARY]}
          />
        ))}
      </StatsContainer>
    </>
  );
};
