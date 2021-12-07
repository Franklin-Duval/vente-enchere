import { AccountForm } from '../components/AccountForm';
import { VendeurContainer } from '../components/VendeurContainer';
export const VendeurAccountPage = () => {
  return (
    <VendeurContainer clicked='account'>
      <div>
        <h2>Vendeur Account page</h2>
        <p>Formulaire pour mettre a jour les info d'un vendeur</p>

        <AccountForm />
      </div>
    </VendeurContainer>
  );
};
