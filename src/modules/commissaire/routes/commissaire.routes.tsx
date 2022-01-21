import { Route } from 'react-router-dom';
import { CommissaireDashboard } from '../pages/dashboard';
import { DetailLot } from '../pages/detailslot';

export const CommissaireRoutes = () => {
  return (
    <>
      <Route
        exact
        path='/commissaire/dashboard'
        component={CommissaireDashboard}
      />
      <Route path='/commissaire/lot-details' component={DetailLot} />
    </>
  );
};
