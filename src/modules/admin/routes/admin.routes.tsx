import { Route } from 'react-router-dom';
import { CategoriePage } from '../pages/categorie';
import { AdminDashBoard } from '../pages/dashboard';
import { LogPage } from '../pages/logs';
import { PersonnelPage } from '../pages/personnel';
import { AdminRappel } from '../pages/rappel';
import { StatisticsPage } from '../pages/statistics';

export const AdminRoutes = () => {
  return (
    <>
      <Route exact path='/admin/dashboard' component={AdminDashBoard} />
      <Route exact path='/admin/personnel' component={PersonnelPage} />
      <Route exact path='/admin/rappel' component={AdminRappel} />
      <Route exact path='/admin/logs' component={LogPage} />
      <Route exact path='/admin/statistics' component={StatisticsPage} />
      <Route exact path='/admin/categories' component={CategoriePage} />
    </>
  );
};
