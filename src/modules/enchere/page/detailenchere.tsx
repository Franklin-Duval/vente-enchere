import styled from '@emotion/styled';
import { Button, Space, Spin, Statistic, Tag } from 'antd';
import { useEffect, useState } from 'react';
import { FaLongArrowAltLeft } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import { EnchereEntity } from '../../../entities/GestionEnchere/enchere.entity';
import { ProduitEntity } from '../../../entities/Gestionproduit/produit.entity';
import { ROUTES } from '../../../routes';
import { getColor } from '../../../shared/colors';
import { Footer } from '../../homePage/components/Footer';
import { DateFrHrWithTime } from '../../shared/DateToFrench';
import { Layout } from '../../shared/Layout';
import { ProduitEnchere } from '../components/produit_Enchere';
import { fetchProduitEnchere } from '../network';

const Container = styled.div`
  font-size: 18px;
`;

export const EnchereDetails = () => {
  const router = useHistory();
  const product = router.location.state as ProduitEntity;
  const [enchere, setEnchere] = useState<EnchereEntity>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduitEnchere(product._id).then((data) => {
      if (data.success) {
        setEnchere(data.result[0]);
        setLoading(false);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <Spin spinning={loading} />;
  }

  if (!enchere) {
    return (
      <Layout footer={<Footer />}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 400,
          }}
        >
          <h2>Aucune enchère n'est défini pour l'instant!</h2>
          <Button
            type='primary'
            size='large'
            icon={<FaLongArrowAltLeft style={{ marginRight: 5 }} />}
            onClick={() => {
              router.goBack();
            }}
          >
            Retour
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout footer={<Footer />}>
      <h2>Informations sur l'enchère</h2>
      <Container>
        <p>
          Date d'enchère :{' '}
          <strong>{DateFrHrWithTime(enchere.dateOuverture)}</strong>
        </p>
        <p>
          Nombre de lots : <strong>{enchere.lots.length}</strong>
        </p>
        <p>
          Durée de l'enchère : <strong>{enchere.duree} heures</strong>
        </p>
        <p>
          Statut : <Tag color={getColor(enchere.statut)}>{enchere.statut}</Tag>
        </p>
        <Space>
          Début dans :{' '}
          <Statistic.Countdown
            valueStyle={{ fontSize: 20, color: 'red' }}
            value={new Date(enchere.dateOuverture).getTime()}
          />
          <Button
            size='large'
            type='primary'
            style={{ marginLeft: 30 }}
            onClick={() => {
              const win = window.open(
                ROUTES.AUCTION_ROOM.ROOM(enchere._id),
                '_blank',
              );
              win?.focus();
            }}
          >
            Participer à l'enchère
          </Button>
        </Space>
      </Container>
      <div>
        <h2 style={{ marginTop: 20 }}>Produits de l'enchère</h2>
        <ProduitEnchere lots={enchere.lots} />
      </div>
    </Layout>
  );
};
