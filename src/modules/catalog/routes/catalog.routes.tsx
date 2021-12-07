import { Route } from 'react-router-dom';
import { CatalogPage } from '../pages/catalog';
import { ProductDetails } from '../pages/detailProduit';

export const CatalogRoutes = () => {
  return (
    <>
      <Route exact path='/catalog' component={CatalogPage} />
      <Route exact path='/catalog/product' component={ProductDetails} />
    </>
  );
};
