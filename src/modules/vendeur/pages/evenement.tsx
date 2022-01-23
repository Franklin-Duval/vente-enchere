import { Button, Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import { FiTrash } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { ConnectedUserEntity } from '../../../entities/ConnectedUserEntity';
import { CategorieEntity } from '../../../entities/Gestionproduit/categorie.entity';
import { EventEntity } from '../../../entities/Gestionproduit/event.entity';
import { SEMIDARK } from '../../../shared/colors';
import { ButtonWithModal } from '../../shared/ButtonWithModal';
import { DataTable } from '../../shared/Table';
import {
  dateFormatter,
  dateFormatterNoTime,
} from '../../shared/Table/cellFormatter';
import { EventForm } from '../components/EvenementForm';
import { VendeurContainer } from '../components/VendeurContainer';
import { fetchVendeurEvent } from '../network';

export const VendeurEventPage = () => {
  const [events, setEvents] = useState<EventEntity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const connectedUser: ConnectedUserEntity = useSelector(
    (state: any) => state.userReducer,
  ).user;

  useEffect(() => {
    fetchVendeurEvent(connectedUser._id).then((data) => {
      if (data.success) {
        setEvents(data.result);
      }
      setIsLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const Columns = [
    {
      title: "Nom du l'évènement",
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
      title: 'Catégorie',
      dataIndex: 'category',
      key: 'category',
      render: (cell: CategorieEntity, row: any) => <span>{cell.nom}</span>,
    },
    {
      title: 'Période',
      key: 'periode',
      dataIndex: 'periode',
      render: dateFormatterNoTime,
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
    {
      title: 'Action',
      key: 'action',
      render: (cell: any, row: any) => (
        <Tooltip title='Supprimer'>
          <Button danger type='primary' icon={<FiTrash />} />
        </Tooltip>
      ),
    },
  ];

  return (
    <VendeurContainer clicked='event'>
      <div>
        <h2>Evènement</h2>
        <DataTable
          loading={isLoading}
          data={events}
          columns={Columns}
          buttons={
            <ButtonWithModal
              buttonText='Nouveau Evénement'
              buttonProps={{
                style: { backgroundColor: SEMIDARK, borderWidth: 0 },
              }}
              modalProps={{ title: "Création d'un événement" }}
            >
              {(closeModal) => <EventForm closeModal={closeModal} />}
            </ButtonWithModal>
          }
        />
      </div>
    </VendeurContainer>
  );
};
