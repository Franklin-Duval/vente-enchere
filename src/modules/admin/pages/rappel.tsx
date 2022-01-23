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
    title: 'Date',
    key: 'date_ajout',
    dataIndex: 'date_ajout',
    render: dateFormatter,
  },
  {
    title: 'Produit',
    key: 'produit',
    dataIndex: 'produit',
  },
  {
    title: 'Utilisateur',
    key: 'client',
    dataIndex: 'client',
  },
];
