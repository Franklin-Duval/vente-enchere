import { Button, notification, Space, Tag } from 'antd';
import Title from 'antd/lib/typography/Title';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import personImage from '../../../assets/images/person.png';
import { VendeurEntity } from '../../../entities/GestionCompte/vendeur.entity';
import { ProduitEntity } from '../../../entities/Gestionproduit/produit.entity';
import { ROUTES } from '../../../routes';
import { PRIMARY } from '../../../shared/colors';
import { ButtonWithModal } from '../../shared/ButtonWithModal';
import { GerantContainer } from '../components/GerantContainer';
import { ProductGroup } from '../components/ProductGroup';
import { RatedAvatar } from '../components/RatedAvatar';
import {
  activateVendeur,
  desactivateVendeur,
  fetchProduitsVendeur,
} from '../network/gerant.network';

export const GerantVendorDetail = () => {
  const router = useHistory();
  const [loading, setLoading] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
          {vendeur.accreditation ? (
            <Tag color='blue'>Accrédité</Tag>
          ) : (
            <Tag color='red'>Non Accrédité</Tag>
          )}
          <ButtonWithModal
            buttonText={
              vendeur.accreditation
                ? "Retirer l'accréditation"
                : "Accorder l'accréditation"
            }
            buttonProps={{
              style: { backgroundColor: PRIMARY, borderWidth: 0 },
            }}
            modalProps={
              vendeur.accreditation
                ? { title: "Retirer l'accréditation à un un vendeur" }
                : { title: "Accorder l'accréditation à un un vendeur" }
            }
          >
            {(closeModal) => (
              <div>
                <h3 style={{ marginBottom: 20 }}>
                  Voulez vous{' '}
                  {vendeur.accreditation
                    ? "retirer l'accréditation"
                    : "accorder l'accréditation"}
                  le vendeur : {vendeur.user.nom + ' ' + vendeur.user.prenom}
                </h3>
                <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
                  <Button danger onClick={() => closeModal()}>
                    Fermer
                  </Button>
                  <Button
                    type='primary'
                    style={{ backgroundColor: PRIMARY, borderWidth: 0 }}
                    loading={isLoading}
                    onClick={async () => {
                      setIsLoading(true);
                      if (vendeur.accreditation) {
                        await desactivateVendeur(vendeur._id).then((data) => {
                          if (data.success) {
                            notification.success({
                              message: 'Succes',
                              description: data.message,
                            });
                            router.push(
                              ROUTES.GERANT_PAGE.VENDEURS,
                              data.result,
                            );
                          } else {
                            notification.error({
                              message: 'Erreur',
                              description: data.message,
                            });
                          }
                        });
                      } else {
                        await activateVendeur(vendeur._id).then((data) => {
                          if (data.success) {
                            notification.success({
                              message: 'Succes',
                              description: data.message,
                            });
                            router.push(
                              ROUTES.GERANT_PAGE.VENDEURS,
                              data.result,
                            );
                          } else {
                            notification.error({
                              message: 'Erreur',
                              description: data.message,
                            });
                          }
                        });
                      }
                      setIsLoading(false);
                      closeModal();
                    }}
                  >
                    {vendeur.accreditation
                      ? "Retirer l'accréditation"
                      : "Accorder l'accréditation"}
                  </Button>
                </Space>
              </div>
            )}
          </ButtonWithModal>
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
              <Title level={4}>Numéro CNI :</Title>
              <p style={{ fontSize: '1.2em' }}>{vendeur.numeroCNI}</p>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '[first] 225px [line2] 225px [end]',
              }}
            >
              <Title level={4}>Spécialité :</Title>
              <p style={{ fontSize: '1.2em' }}>{vendeur.specialite}</p>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '[first] 225px [line2] 225px [end]',
              }}
            >
              <Title level={4}>Chiffre d'affaire :</Title>
              <p style={{ fontSize: '1.2em' }}>{vendeur.chiffreAffaire}</p>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '[first] 225px [line2] 225px [end]',
              }}
            >
              <Title level={4}>Lots vendus :</Title>
              <p style={{ fontSize: '1.2em' }}>{vendeur.nombreLotsVendu}</p>
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              flex: 1,
            }}
          >
            <RatedAvatar image={personImage} rate={4} />
          </div>
        </div>
        {loading ? <p>Chargement...</p> : <ProductGroup products={produits} />}
      </div>
    </GerantContainer>
  );
};
