import styled from '@emotion/styled';
import { Space } from 'antd';
import { useEffect, useState } from 'react';
import { FaAngleRight } from 'react-icons/fa';
import { EventEntity } from '../../../../entities/Gestionproduit/event.entity';
import { PRIMARY } from '../../../../shared/colors';
import { fetchEvent } from '../../../vendeur/network';
import { AnnouncementCard } from './AnnouncementCard';

const AnnonceContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 50px;
`;

export const Announcements = () => {
  const [events, setEvents] = useState<EventEntity[]>([]);

  useEffect(() => {
    fetchEvent().then((data) => {
      if (data.success) {
        if (data.result.length > 3) {
          data.result.length = 3;
        }
        setEvents(data.result);
      }
    });
  }, []);

  return (
    <>
      <Space style={{ justifyContent: 'space-between', width: '100%' }}>
        <h2 style={{ color: PRIMARY, marginBottom: 20 }}>Annonces</h2>
        <h3
          style={{ margin: 0, textDecoration: 'underline', cursor: 'pointer' }}
        >
          Voir plus{' '}
          <FaAngleRight color='red' size={20} style={{ marginBottom: -6 }} />
        </h3>
      </Space>
      <AnnonceContainer>
        {events.map((event) => (
          <AnnouncementCard key={event._id} event={event} />
        ))}
      </AnnonceContainer>
    </>
  );
};
