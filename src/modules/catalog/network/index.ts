import { LotEntity } from '../../../entities/Gestionproduit/lot.entity';
import { ResponseType } from '../../../entities/Response.entity';
import { customFetch } from '../../../shared/customFetch';
import { API_ROUTES } from '../../shared/ApiRoutes';

export const fetchLotProduit = (
  productId: string,
): Promise<ResponseType<LotEntity>> => {
  return customFetch.get(API_ROUTES.LOTS.GET_LOT_PRODUIT(productId));
};
