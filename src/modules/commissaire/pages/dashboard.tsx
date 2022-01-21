import { Button, Tag, Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import {
  FaExternalLinkAlt,
  FaProductHunt,
  FaShopify,
  FaShoppingCart,
} from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import { LotEntity } from '../../../entities/Gestionproduit/lot.entity';
import { ROUTES } from '../../../routes';
import { getColor } from '../../../shared/colors';
import { StatsCard } from '../../shared/StatsCard';
import { DataTable } from '../../shared/Table';
import { dateFormatter } from '../../shared/Table/cellFormatter';
import { fetchLot } from '../../vendeur/network';
import { CommissaireContainer } from '../components/CommissaireContainer';

export const CommissaireDashboard = () => {
  const router = useHistory();
  const [lots, setLots] = useState<LotEntity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchLot().then((data) => {
      if (data.success) {
        setLots(data.result);
        setIsLoading(false);
      }
    });
  }, []);

  const LotColumns = [
    {
      title: 'Lot N°',
      dataIndex: 'numeroLot',
      key: 'numeroLot',
      render: (cell: number, row: any) => {
        const val = String(cell);
        return <span>{`${val.slice(0, 3)}-${val.slice(3)}`} </span>;
      },
    },
    {
      title: 'Etat',
      dataIndex: 'statut',
      key: 'statut',
      render: (cell: string, row: any) => (
        <Tag color={getColor(cell)}>{cell}</Tag>
      ),
    },
    {
      title: 'Prix Minimum',
      dataIndex: 'prixMin',
      key: 'prixMin',
      render: (cell: number, row: any) => (
        <span>
          {cell} {'FCFA'}
        </span>
      ),
    },
    {
      title: 'Nombre de Produit',
      dataIndex: 'produits',
      key: 'produits',
      render: (cell: [], row: any) => <span>{cell.length}</span>,
    },
    {
      title: 'Date Reception',
      dataIndex: 'dateCreation',
      key: 'dateCreation',
      render: dateFormatter,
    },
    {
      title: 'Action',
      key: 'action',
      render: (cell: any, row: any) => (
        <Tooltip title='Détails du lot'>
          <Button
            type='primary'
            onClick={() =>
              router.push(ROUTES.COMMISSAIRE_PAGE.LOT_DETAIL(row._id), row)
            }
          >
            <FaExternalLinkAlt />
          </Button>
        </Tooltip>
      ),
    },
  ];

  return (
    <CommissaireContainer clicked='dashboard'>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {Stats.map((item) => (
          <StatsCard
            key={item.text}
            icon={item.icon}
            text={item.text}
            stat={item.stat}
            gradientColors={item.gradientColors}
          />
        ))}
      </div>

      <h2 style={{ marginTop: 50 }}>Liste des Lots</h2>
      <DataTable loading={isLoading} data={lots} columns={LotColumns} />
    </CommissaireContainer>
  );
};

const Stats = [
  {
    icon: <FaShoppingCart size={30} color='white' />,
    text: 'Lots',
    stat: 28,
    gradientColors: ['#E83E8C', '#FF7588'],
  },
  {
    icon: <FaProductHunt size={30} color='white' />,
    text: 'Produits',
    stat: 156,
    gradientColors: ['#FF425C', '#FFA8B4'],
  },
  {
    icon: <FaShopify size={30} color='white' />,
    text: 'Enchères',
    stat: 23,
    gradientColors: ['#2193b0', '#6dd5ed'],
  },
];
