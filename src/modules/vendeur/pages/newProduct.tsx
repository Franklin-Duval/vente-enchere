import { Button, Divider, Input, Modal, Space, Steps } from 'antd';
import { useState } from 'react';
import { FaRegSmileWink } from 'react-icons/fa';
import { useHistory } from 'react-router';
import { ROUTES } from '../../../routes';
import { PRIMARY } from '../../../shared/colors';
import { ProductForm } from '../components/ProductForm';
import { VendeurContainer } from '../components/VendeurContainer';

export const NewProductPage = () => {
  const [numProduit, setNumProduit] = useState(1);
  const [currentNum, setCurrentNum] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(true);
  const router = useHistory();

  return (
    <div>
      <VendeurContainer clicked='products'>
        <Modal
          visible={isModalVisible}
          title='Informations'
          onCancel={() => setIsModalVisible(!isModalVisible)}
          footer={null}
          maskClosable={false}
        >
          <h2 style={{ textAlign: 'center' }}>
            Combien de produit souhaitez vous avoir dans votre lot ?
          </h2>
          <Space
            direction='vertical'
            style={{ alignItems: 'center', width: '100%' }}
          >
            <Input
              placeholder='nombre de produit'
              onChange={(event) => setNumProduit(Number(event.target.value))}
            />
            <Button type='primary' onClick={() => setIsModalVisible(false)}>
              Continuer
            </Button>
          </Space>
        </Modal>

        {!isModalVisible && (
          <>
            <Steps current={currentNum} style={{ marginBottom: 30 }}>
              {[...Array(numProduit)].map((item, index) => (
                <Steps.Step title={<span>Produit N° {index + 1} </span>} />
              ))}
              <Steps.Step
                status='wait'
                title='Terminé'
                icon={<FaRegSmileWink />}
              />
            </Steps>
            {currentNum === numProduit ? (
              <div
                style={{
                  height: '50vh',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <h2 style={{ textAlign: 'center' }}>
                  Nous vous remercions. Vous produits ont tous été créé avec
                  succès. Ils seronts prochainement validés par le commissaire
                  priseur de Agric Auction
                </h2>
                <Button
                  type='primary'
                  size='large'
                  style={{
                    backgroundColor: PRIMARY,
                    borderWidth: 0,
                  }}
                  onClick={() => router.push(ROUTES.VENDEUR_PAGE.DASHBOARD)}
                >
                  Terminer
                </Button>
              </div>
            ) : (
              <>
                <h2>Creation du produit N° {currentNum + 1} </h2>
                <div style={{ maxWidth: '20%', marginBottom: 50 }}>
                  <Divider style={{ backgroundColor: '#777', height: 2 }} />
                </div>
                <ProductForm
                  currentNum={currentNum}
                  setCurrentNum={setCurrentNum}
                />
              </>
            )}
          </>
        )}
      </VendeurContainer>
    </div>
  );
};
