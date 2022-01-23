import 'antd/dist/antd.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './assets/global-css/modal-styles.css';
import { AdminRoutes } from './modules/admin/routes/admin.routes';
import { AuctionRoom } from './modules/auction/pages/auctionRoom';
import { AuctionRoomAdmin } from './modules/auction/pages/auctionRoomAdmin';
import { FavorisPage } from './modules/catalog/pages/favorisPage';
import { CatalogRoutes } from './modules/catalog/routes/catalog.routes';
import { CommissaireRoutes } from './modules/commissaire/routes/commissaire.routes';
import { EnchereDetails } from './modules/enchere/page/detailenchere';
import { GerantRoutes } from './modules/gerant/routes/gerant.routes';
import { HomePage } from './modules/homePage';
import { LoginPage } from './modules/login';
import { RegistrationPage } from './modules/registration';
import { ActivateAccount } from './modules/registration/activateAcount';
import { SuccessActivateAccount } from './modules/registration/successActivateAccount';
import { Unauthorized } from './modules/shared/Unauthorized';
import { VendeurRoutes } from './modules/vendeur/routes/vendeur.routes';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/signin' component={LoginPage} />
        <Route path='/activate-account' component={ActivateAccount} />
        <Route path='/success-activation' component={SuccessActivateAccount} />
        <Route exact path='/signup' component={RegistrationPage} />
        <Route path='/auction-room' component={AuctionRoom} />
        <Route path='/auction-room-admin' component={AuctionRoomAdmin} />
        <Route path='/catalog' render={() => <CatalogRoutes />} />
        <Route path='/admin' render={() => <AdminRoutes />} />
        <Route path='/vendeur' render={() => <VendeurRoutes />} />
        <Route path='/gerant' render={() => <GerantRoutes />} />
        <Route path='/commissaire' render={() => <CommissaireRoutes />} />
        <Route path='/enchere' render={() => <EnchereDetails />} />
        <Route path='/favoris' render={() => <FavorisPage />} />
        <Route exact path='/unauthorized' component={Unauthorized} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
