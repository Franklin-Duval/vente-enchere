import styled from '@emotion/styled';
import { Button, Image, message, Space, Tag, Tooltip } from 'antd';
import { FaCheckCircle } from 'react-icons/fa';
import { FiTrash2 } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import { LotEntity } from '../../../entities/Gestionproduit/lot.entity';
import { getColor } from '../../../shared/colors';
import { defaultImage } from '../../../shared/defaultImage';
import { API_ROUTES } from '../../shared/ApiRoutes';
import { ButtonWithModal } from '../../shared/ButtonWithModal';
import { DateFrHrWithTime } from '../../shared/DateToFrench';
import { DataTable } from '../../shared/Table';
import { dateFormatter } from '../../shared/Table/cellFormatter';
import { VendeurContainer } from '../components/VendeurContainer';

const RefusContainer = styled.div`
  margin-top: 50px;
  border: 2px solid red;
  background-color: #ffcdd2;
  padding: 30px;

  > h2 {
    font-weight: bold;
  }

  > p {
    font-size: 16px;
  }
`;

export const DetailLot = () => {
  const router = useHistory();
  const lot: LotEntity = router.location.state as any;

  return (
    <VendeurContainer clicked='dashboard'>
      <h1>
        Detail Lot <strong>N° {lot.numeroLot}</strong>{' '}
      </h1>
      <h2>
        Etat Lot :{' '}
        <Tag style={{ fontSize: 16 }} color={getColor(lot.statut)}>
          {lot.statut}
        </Tag>
      </h2>
      <h2>
        Prix Minimun: <strong>{lot.prixMin} FCFA</strong>{' '}
      </h2>
      <h2>
        Date Reception: <strong>{DateFrHrWithTime(lot.dateCreation)}</strong>
      </h2>

      <DataTable data={lot.produits} columns={ProductColumns} />

      {['en_attente_selection', 'refuse', 'rejete'].includes(lot.statut) && (
        <Space>
          <Tooltip title='Relancer le Lot'>
            <ButtonWithModal
              buttonText={
                <>
                  Relancer le lot <FaCheckCircle style={{ marginLeft: 10 }} />
                </>
              }
              buttonProps={{
                danger: true,
                size: 'large',
                style: { backgroundColor: '#4caf50', borderWidth: 0 },
              }}
              modalProps={{ title: 'Confirmation' }}
            >
              {(closeModal) => (
                <div>
                  <h3>Voulez vous relancer ce lot ?</h3>

                  <Space>
                    <Button type='primary' onClick={() => closeModal()}>
                      Fermer
                    </Button>
                    <Button
                      danger
                      onClick={async () => {
                        if (lot.statut === 'rejete') {
                          message.error({
                            content:
                              'Desolé!! Il est impossible de relancer un lot qui a été completement rejété',
                          });
                        }
                        closeModal();
                      }}
                    >
                      Oui
                    </Button>
                  </Space>
                </div>
              )}
            </ButtonWithModal>
          </Tooltip>

          <Tooltip title='Annuler le Lot'>
            <ButtonWithModal
              buttonText={
                <>
                  Annuler le lot <FiTrash2 style={{ marginLeft: 10 }} />
                </>
              }
              buttonProps={{
                danger: true,
                size: 'large',
              }}
              modalProps={{ title: 'Confirmation' }}
            >
              {(closeModal) => (
                <div>
                  <h4>
                    Voulez vous annuler ce lot de façon définitif ? Il ne sera
                    plus possible de retourner en arrière !{' '}
                  </h4>

                  <Space>
                    <Button type='primary' onClick={() => closeModal()}>
                      Fermer
                    </Button>
                    <Button
                      danger
                      onClick={async () => {
                        closeModal();
                      }}
                    >
                      Oui
                    </Button>
                  </Space>
                </div>
              )}
            </ButtonWithModal>
          </Tooltip>
        </Space>
      )}

      {lot.commentaireRefus && (
        <RefusContainer>
          <h2>Raison de refus</h2>
          <p>{lot.commentaireRefus}</p>
        </RefusContainer>
      )}
    </VendeurContainer>
  );
};

const ProductColumns = [
  {
    title: 'Image',
    dataIndex: 'images',
    key: 'images',
    render: (cell: string[], row: any) => (
      <Image
        alt='logo'
        src={API_ROUTES.IMAGES(cell[0])}
        height={70}
        width={80}
        preview={false}
        style={{ objectFit: 'cover', borderRadius: 10 }}
        fallback={defaultImage}
      />
    ),
  },
  {
    title: 'Nom du produit',
    dataIndex: 'nom',
    key: 'nom',
  },
  {
    title: 'Quantité',
    dataIndex: 'quantite',
    key: 'quantite',
    render: (cell: any, row: any) => (
      <span>
        {cell.valeur} {cell.unite}
      </span>
    ),
  },
  {
    title: 'Prix Minimale',
    key: 'prixMin',
    dataIndex: 'prixMin',
    render: (cell: any, row: any) => <span>{cell} FCFA</span>,
  },
  {
    title: "Date d'Ajout",
    dataIndex: 'dateCreation',
    key: 'dateCreation',
    render: dateFormatter,
  },
  {
    title: 'Description',
    key: 'description',
    dataIndex: 'description',
    width: 300,
  },
];
