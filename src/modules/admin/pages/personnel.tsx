import { Space } from 'antd';
import { PRIMARY } from '../../../shared/colors';
import { ButtonWithModal } from '../../shared/ButtonWithModal';
import { AdminContainer } from '../components/AdminContainer';
import { CommissaireForm } from '../components/CommissaireForm';
import { GerantForm } from '../components/GerantForm';
import { PersonelsList } from '../components/PersonnelsList';

export const PersonnelPage = () => {
  return (
    <AdminContainer clicked='personnel'>
      <Space>
        <ButtonWithModal
          buttonText='Nouveau Gérant'
          buttonProps={{ style: { backgroundColor: PRIMARY, borderWidth: 0 } }}
          modalProps={{ title: 'Création du nouveau gérant' }}
        >
          {(closeModal) => <GerantForm closeModal={closeModal} />}
        </ButtonWithModal>

        <ButtonWithModal
          buttonText='Nouveau Commissaire'
          buttonProps={{ style: { backgroundColor: PRIMARY, borderWidth: 0 } }}
          modalProps={{ title: 'Création du nouveay Commissaire' }}
        >
          {(closeModal) => <CommissaireForm closeModal={closeModal} />}
        </ButtonWithModal>
      </Space>

      <PersonelsList />
    </AdminContainer>
  );
};
