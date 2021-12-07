import styled from '@emotion/styled';
import { Space } from 'antd';
import { FaAngleRight } from 'react-icons/fa';
import { PRIMARY } from '../../../../shared/colors';
import { CommentCard } from './CommentCard';

const CommentSection = styled.div`
  .horizontal-scroll {
    display: flex;
    overflow: auto;
    white-space: nowrap;
  }
`;

export const Comments = () => {
  return (
    <CommentSection>
      <Space style={{ justifyContent: 'space-between', width: '100%' }}>
        <h2 style={{ color: PRIMARY, marginBottom: 20 }}>
          Avis et Commentaires
        </h2>
        <h3
          style={{ margin: 0, textDecoration: 'underline', cursor: 'pointer' }}
        >
          Voir plus{' '}
          <FaAngleRight color='red' size={20} style={{ marginBottom: -6 }} />
        </h3>
      </Space>
      <div className='horizontal-scroll'>
        <CommentCard
          name='Talom Franklin'
          comment='La meilleure plateforme camerounaise des enchère de produits et équipements agricole'
          date='2021-10-18 09:05:50'
        />
        <CommentCard
          name='Mouen Kevin'
          comment='La meilleure plateforme camerounaise des enchère de produits et équipements agricole'
          date='2021-9-10 09:05:50'
        />
        <CommentCard
          name='Ualom Talla'
          comment='La meilleure plateforme camerounaise des enchère de produits et équipements agricole'
          date='2021-10-18 09:05:50'
        />
        <CommentCard
          name='Talom Franklin'
          comment='La meilleure plateforme camerounaise des enchère de produits et équipements agricole'
          date='2021-10-18 09:05:50'
        />
        <CommentCard
          name='Talom Franklin'
          comment='La meilleure plateforme camerounaise des enchère de produits et équipements agricole'
          date='2021-10-18 09:05:50'
        />
      </div>
    </CommentSection>
  );
};
