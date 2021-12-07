import { Button, Space, Tag, Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { FiTrash2 } from 'react-icons/fi';
import { UserEntity } from '../../../entities/GestionCompte/user.entity';
import { ButtonWithModal } from '../../shared/ButtonWithModal';
import { DataTable } from '../../shared/Table';
import { dateFormatter } from '../../shared/Table/cellFormatter';
import { fetchUsers } from '../network/admin.network';

export const PersonelsList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState<UserEntity[]>([]);

  useEffect(() => {
    fetchUsers().then((data) => {
      if (data.success) {
        setUsers(data.result);
        setIsLoading(false);
      }
    });
  }, []);

  return (
    <>
      <h2 style={{ marginTop: 50 }}>Personnel</h2>
      <DataTable
        loading={isLoading}
        data={users}
        columns={userColumns}
        filterFunction={(user: UserEntity, filterValue: string) =>
          user.nom.toLowerCase().includes(filterValue) ||
          user.prenom.toLowerCase().includes(filterValue) ||
          user.email.toLowerCase().includes(filterValue) ||
          user.localisation.adresse.toLowerCase().includes(filterValue) ||
          user.telephone.toLowerCase().includes(filterValue)
        }
      />
    </>
  );
};

const userColumns = [
  {
    title: 'Nom & Prénom',
    key: 'nom',
    render: (cell: any, row: any) => (
      <span>
        {row.nom} {row.prenom}{' '}
      </span>
    ),
  },
  {
    title: 'Adresse',
    dataIndex: 'localisation',
    key: 'adresse',
    render: (cell: any, row: any) => <span>{cell.adresse} </span>,
  },
  {
    title: 'Téléphone',
    dataIndex: 'telephone',
    key: 'telephone',
  },
  {
    title: 'Email',
    dataIndex: 'compte',
    key: 'email',
    render: (cell: any, row: any) => <span>{cell.email} </span>,
  },
  {
    title: 'Roles',
    dataIndex: 'roles',
    key: 'roles',
    render: (cell: string[], row: any) => (
      <Space>
        {cell.map((item) => (
          <Tag key={item} color='purple'>
            {item}
          </Tag>
        ))}
      </Space>
    ),
  },
  {
    title: 'Total dépensé',
    dataIndex: 'totalArgentDepense',
    key: 'totalArgentDepense',
    render: (cell: any, row: any) => <span>{cell || 0} FCFA </span>,
  },
  {
    title: 'Etat du compte',
    dataIndex: 'compte',
    key: 'isActivated',
    render: (cell: any, row: any) => (
      <span>
        {cell.isActivated ? (
          <Tag
            icon={<FaCheckCircle size={10} style={{ marginRight: 5 }} />}
            color='success'
          >
            activé{' '}
          </Tag>
        ) : (
          <Tag color='error'>Non activé</Tag>
        )}{' '}
      </span>
    ),
  },
  {
    title: "Date d'inscription",
    dataIndex: 'dateAjout',
    key: 'dateAjout',
    render: dateFormatter,
  },
  {
    title: 'Action',
    key: 'action',
    render: (cell: any, row: any) => (
      <Tooltip title="supprimer l'article">
        <ButtonWithModal
          buttonText={<FiTrash2 />}
          buttonProps={{ danger: true }}
          modalProps={{ title: 'Confirmation' }}
        >
          {(closeModal) => (
            <div>
              <h3>Voulez vous supprimer cet utilisateur ?</h3>
              <Space>
                <Button type='primary' onClick={() => closeModal()}>
                  Fermer
                </Button>
                <Button
                  danger
                  onClick={async () => {
                    // if (response.success) {
                    //   notification.success({
                    //     message: 'Succès',
                    //     description: response.message,
                    //   });
                    //   window.location.reload();
                    // } else {
                    //   notification.success({
                    //     message: 'Erreur',
                    //     description: response.message,
                    //   });
                    // }
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
    ),
  },
];
