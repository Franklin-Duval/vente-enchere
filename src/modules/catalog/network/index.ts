import { RappelEntity } from '../../../entities/GestionEnchere/rappel.entity';
import { LotEntity } from '../../../entities/Gestionproduit/lot.entity';
import { ResponseType } from '../../../entities/Response.entity';
import { customFetch } from '../../../shared/customFetch';
import { API_ROUTES } from '../../shared/ApiRoutes';

export const fetchLotProduit = (
  productId: string,
): Promise<ResponseType<LotEntity>> => {
  return customFetch.get(API_ROUTES.LOTS.GET_LOT_PRODUIT(productId));
};

export const addRappel = (
  productId: string,
  UserId: string,
): Promise<ResponseType<RappelEntity>> => {
  return customFetch.post(API_ROUTES.RAPPEL.BASE, {
    produit: productId,
    user: UserId,
  });
};
