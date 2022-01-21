import { Button, Image, notification, Space, Tag, Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import {
  FaDollarSign,
  FaExternalLinkAlt,
  FaProductHunt,
  FaShopify,
  FaShoppingCart,
} from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { ConnectedUserEntity } from '../../../entities/ConnectedUserEntity';
import { LotEntity } from '../../../entities/Gestionproduit/lot.entity';
import { ProduitEntity } from '../../../entities/Gestionproduit/produit.entity';
import { ROUTES } from '../../../routes';
import { getColor, PRIMARY } from '../../../shared/colors';
import { defaultImage } from '../../../shared/defaultImage';
import { API_ROUTES } from '../../shared/ApiRoutes';
import { ButtonWithModal } from '../../shared/ButtonWithModal';
import { StatsCard } from '../../shared/StatsCard';
import { DataTable } from '../../shared/Table';
import { dateFormatter } from '../../shared/Table/cellFormatter';
import { VendeurContainer } from '../components/VendeurContainer';
import { createLot, fetchLot, fetchProduit } from '../network';

export const VendeurDashboard = () => {
  const router = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading1, setIsLoading1] = useState(true);
  const [isLoading2, setIsLoading2] = useState(true);
  const [lots, setLots] = useState<LotEntity[]>([]);
  const [produits, setProduits] = useState<ProduitEntity[]>([]);
  const connectedUser: ConnectedUserEntity = useSelector(
    (state: any) => state.userReducer,
  ).user;

  useEffect(() => {
    fetchLot().then((data) => {
      if (data.success) {
        setLots(data.result);
        setIsLoading1(false);
      }
    });
    fetchProduit().then((data) => {
      if (data.success) {
        setProduits(data.result);
        setIsLoading2(false);
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
              router.push(ROUTES.VENDEUR_PAGE.LOT_DETAIL(row._id), row)
            }
          >
            <FaExternalLinkAlt />
          </Button>
        </Tooltip>
      ),
    },
  ];

  return (
    <VendeurContainer clicked='dashboard'>
      <div>
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

        <div style={{ marginTop: 100 }}>
          <h2>Vos différents lot</h2>
          <DataTable
            loading={isLoading1}
            data={lots}
            columns={LotColumns}
            buttons={
              <ButtonWithModal
                buttonText='Nouveau Lots'
                buttonProps={{
                  style: { backgroundColor: PRIMARY, borderWidth: 0 },
                }}
                modalProps={{ title: 'Création du lot' }}
              >
                {(closeModal) => (
                  <div>
                    <h3 style={{ marginBottom: 20 }}>
                      Voulez vous commencer la création du lot des produit(s) ?
                    </h3>
                    <Space
                      style={{ width: '100%', justifyContent: 'flex-end' }}
                    >
                      <Button danger onClick={() => closeModal()}>
                        Fermer
                      </Button>
                      <Button
                        type='primary'
                        style={{ backgroundColor: PRIMARY, borderWidth: 0 }}
                        loading={isLoading}
                        onClick={async () => {
                          setIsLoading(true);
                          await createLot(connectedUser._id).then((data) => {
                            if (data.success) {
                              notification.success({
                                message: 'Succes',
                                description: data.message,
                              });
                              router.push(
                                ROUTES.VENDEUR_PAGE.NEW_PRODUCT,
                                data.result,
                              );
                            } else {
                              notification.error({
                                message: 'Erreur',
                                description: data.message,
                              });
                            }
                          });
                          setIsLoading(false);
                        }}
                      >
                        Créer le lot
                      </Button>
                    </Space>
                  </div>
                )}
              </ButtonWithModal>
            }
          />
        </div>

        <div style={{ marginTop: 100 }}>
          <h2>Vos différents Produits</h2>
          <DataTable
            loading={isLoading2}
            data={produits}
            columns={ProductColumns}
          />
        </div>
      </div>
    </VendeurContainer>
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
  {
    icon: <FaDollarSign size={30} color='white' />,
    text: 'Compte bancaire',
    stat: 111850,
    gradientColors: ['#ff7e5f', '#feb47b'],
  },
];

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
    title: 'Catégorie',
    dataIndex: 'category',
    key: 'categorie',
    render: (cell: any, row: any) => <span>{cell.nom} </span>,
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
