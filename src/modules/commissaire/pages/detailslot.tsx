import { Button, Image, Input, notification, Space, Tag, Tooltip } from 'antd';
import { useState } from 'react';
import { FaCheckCircle, FaClock } from 'react-icons/fa';
import { FiTrash2 } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import { LotEntity } from '../../../entities/Gestionproduit/lot.entity';
import { ROUTES } from '../../../routes';
import { getColor } from '../../../shared/colors';
import { defaultImage } from '../../../shared/defaultImage';
import { API_ROUTES } from '../../shared/ApiRoutes';
import { ButtonWithModal } from '../../shared/ButtonWithModal';
import { DateFrHrWithTime } from '../../shared/DateToFrench';
import { DataTable } from '../../shared/Table';
import { dateFormatter } from '../../shared/Table/cellFormatter';
import { CommissaireContainer } from '../components/CommissaireContainer';
import { refuserLot, rejeterLot, validerLot } from '../network';

export const DetailLot = () => {
  const router = useHistory();
  const lot: LotEntity = router.location.state as any;
  const [isLoading1, setIsLoading1] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [isLoading3, setIsLoading3] = useState(false);
  const [motifRefus, setMotifRefus] = useState('');

  return (
    <CommissaireContainer clicked='dashboard'>
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
      <Space style={{ justifyContent: 'flex-end', display: 'flex' }}>
        <Tooltip title='Valider le Lot'>
          <Button
            size='large'
            type='primary'
            style={{ backgroundColor: '#4caf50', borderWidth: 0 }}
            loading={isLoading1}
            onClick={async () => {
              setIsLoading1(true);
              validerLot(lot._id).then((data) => {
                if (data.success) {
                  notification.success({
                    message: 'Success',
                    description: 'Le lot a été validé avec succès',
                  });
                  router.push(ROUTES.COMMISSAIRE_PAGE.DASHBOARD);
                } else {
                  notification.error({
                    message: 'Erreur',
                    description: 'Une erreur est survenu',
                  });
                }
              });
              setIsLoading1(false);
            }}
          >
            Valider <FaCheckCircle style={{ marginLeft: 10 }} />
          </Button>
        </Tooltip>

        <Tooltip title='Refuser  le Lot'>
          <ButtonWithModal
            buttonText={
              <>
                Refuser <FaClock style={{ marginLeft: 10 }} />
              </>
            }
            buttonProps={{ danger: true, size: 'large' }}
            modalProps={{ title: 'Confirmation' }}
          >
            {(closeModal) => (
              <div>
                <h3>Motif de refus du lot ?</h3>
                <Input.TextArea
                  rows={5}
                  placeholder='motif'
                  onChange={(event) => setMotifRefus(event.target.value)}
                />
                <Space style={{ marginTop: 20 }}>
                  <Button type='default' onClick={() => closeModal()}>
                    Fermer
                  </Button>
                  <Button
                    type='primary'
                    loading={isLoading2}
                    onClick={async () => {
                      setIsLoading2(true);
                      refuserLot(lot._id, motifRefus).then((data) => {
                        if (data.success) {
                          notification.success({
                            message: 'Success',
                            description: 'Le lot a été refusé',
                          });
                          router.push(ROUTES.COMMISSAIRE_PAGE.DASHBOARD);
                        } else {
                          notification.error({
                            message: 'Erreur',
                            description: 'Une erreur est survenu',
                          });
                        }
                      });
                      setIsLoading2(false);

                      closeModal();
                    }}
                  >
                    Envoyer
                  </Button>
                </Space>
              </div>
            )}
          </ButtonWithModal>
        </Tooltip>

        <Tooltip title='Rejeter le Lot'>
          <ButtonWithModal
            buttonText={
              <>
                Rejeter <FiTrash2 style={{ marginLeft: 10 }} />
              </>
            }
            buttonProps={{
              danger: true,
              size: 'large',
              style: { backgroundColor: '#7B0000' },
            }}
            modalProps={{ title: 'Confirmation' }}
          >
            {(closeModal) => (
              <div>
                <h3>Motif de rejet du lot ?</h3>
                <Input.TextArea
                  rows={5}
                  placeholder='motif'
                  onChange={(event) => setMotifRefus(event.target.value)}
                />
                <Space style={{ marginTop: 20 }}>
                  <Button type='default' onClick={() => closeModal()}>
                    Fermer
                  </Button>
                  <Button
                    type='primary'
                    loading={isLoading3}
                    onClick={async () => {
                      setIsLoading3(true);
                      rejeterLot(lot._id, motifRefus).then((data) => {
                        if (data.success) {
                          notification.success({
                            message: 'Success',
                            description: 'Le lot a été réjeté',
                          });
                          router.push(ROUTES.COMMISSAIRE_PAGE.DASHBOARD);
                        } else {
                          notification.error({
                            message: 'Erreur',
                            description: 'Une erreur est survenu',
                          });
                        }
                      });
                      setIsLoading3(false);

                      closeModal();
                    }}
                  >
                    Envoyer
                  </Button>
                </Space>
              </div>
            )}
          </ButtonWithModal>
        </Tooltip>
      </Space>
      <DataTable data={lot.produits} columns={ProductColumns} />
    </CommissaireContainer>
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
