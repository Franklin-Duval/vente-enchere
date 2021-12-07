import { Button, Space } from 'antd';
import Title from 'antd/lib/typography/Title';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import slide1 from '../../../assets/images/slide1.jpg';
import { VendeurEntity } from '../../../entities/GestionCompte/vendeur.entity';
import { ProduitEntity } from '../../../entities/Gestionproduit/produit.entity';
import { GerantContainer } from '../components/GerantContainer';
import { ProductGroup } from '../components/ProductGroup';
import { RatedAvatar } from '../components/RatedAvatar';
import { fetchProduitsVendeur } from '../network/gerant.network';

export const GerantVendorDetail = () => {
  const router = useHistory();
  const [loading, setLoading] = useState<boolean>(false);
  const [produits, setProduits] = useState<ProduitEntity[]>([]);
  const vendeur: VendeurEntity = router.location.state as VendeurEntity;

  useEffect(() => {
    setLoading(true);
    fetchProduitsVendeur(vendeur._id).then((data) => {
      if (data.success) {
        setProduits(data.result);
      }
    });
    setLoading(false);
  }, [vendeur]);

  return (
    <GerantContainer clicked='details'>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '60px',
          padding: '0 50px',
        }}
      >
        <Space
          style={{ borderBottom: '1px solid gray' }}
          size={50}
          align='baseline'
        >
          <Title level={2}>
            {vendeur.user.prenom}, {vendeur.user.nom}
          </Title>

          {vendeur.accredidation ? (
            <Button type='primary' danger size='large'>
              Désactiver
            </Button>
          ) : (
            <Button type='primary' size='large'>
              Activer
            </Button>
          )}
        </Space>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'row',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '[first] 225px [line2] 225px [end]',
              }}
            >
              <Title level={3} italic>
                Numéro CNI :
              </Title>
              <p style={{ fontSize: '1.8em' }}>{vendeur.numeroCNI}</p>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '[first] 225px [line2] 225px [end]',
              }}
            >
              <Title level={3} italic>
                Spécialité :
              </Title>
              <p style={{ fontSize: '1.8em' }}>{vendeur.specialite}</p>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '[first] 225px [line2] 225px [end]',
              }}
            >
              <Title level={3} italic>
                Chiffre d'affaire :
              </Title>
              <p style={{ fontSize: '1.8em' }}>{vendeur.chiffreAffaire}</p>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '[first] 225px [line2] 225px [end]',
              }}
            >
              <Title level={3} italic>
                Lots vendus :
              </Title>
              <p style={{ fontSize: '1.8em' }}>{vendeur.nombreLotsVendu}</p>
            </div>
          </div>

          {/* <Typography
            style={{ maxWidth: '500px', flex: '1', paddingLeft: '30px' }}
          >
            <Title level={3} italic>
              Description
            </Title>
            <Paragraph style={{ fontSize: '1.2em' }}>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos
              ipsa, quaerat temporibus sit quam reprehenderit voluptatibus
              perspiciatis modi expedita molestiae perferendis, corrupti ratione
              nesciunt vel laudantium totam quidem maiores possimus.
            </Paragraph>
            <Title level={3} italic>
              Spécialités
            </Title>
            <Paragraph style={{ fontSize: '1.2em' }}>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos
              ipsa, quaerat temporibus sit quam reprehenderit voluptatibus
              perspiciatis modi expedita molestiae perferendis, corrupti ratione
              nesciunt vel laudantium totam quidem maiores possimus.
            </Paragraph>
          </Typography> */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              flex: 1,
            }}
          >
            <RatedAvatar image={slide1} rate={4} />
          </div>
        </div>
        {loading ? <p>Chargement...</p> : <ProductGroup products={produits} />}
      </div>
    </GerantContainer>
  );
};
