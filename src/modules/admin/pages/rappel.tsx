import { useEffect, useState } from 'react';
import { RappelEntity } from '../../../entities/GestionEnchere/rappel.entity';
import { DataTable } from '../../shared/Table';
import { dateFormatter } from '../../shared/Table/cellFormatter';
import { AdminContainer } from '../components/AdminContainer';
import { fetchListRappel } from '../network/admin.network';

export const AdminRappel = () => {
  const [isloading, setIsLoading] = useState(true);
  const [rappel, setRappel] = useState<RappelEntity[]>([]);

  useEffect(() => {
    fetchListRappel().then((data) => {
      if (data.success) {
        setRappel(data.result);
        setIsLoading(false);
      }
    });
  }, []);

  return (
    <AdminContainer clicked='rappel'>
      <h2>Liste des Rappels</h2>
      <DataTable loading={isloading} data={rappel} columns={rappelColumns} />
    </AdminContainer>
  );
};

const rappelColumns = [
  {
    title: "Date d'ajout",
    key: 'dateAjout',
    dataIndex: 'dateAjout',
    render: dateFormatter,
  },
  {
    title: 'Produit',
    key: 'produit',
    dataIndex: 'produit',
    render: (cell: any, row: any) => <span>{cell.nom}</span>,
  },
  {
    title: 'Utilisateur',
    key: 'user',
    dataIndex: 'user',
    render: (cell: any, row: any) => (
      <span>
        {cell.nom} {cell.prenom}
      </span>
    ),
  },
];
