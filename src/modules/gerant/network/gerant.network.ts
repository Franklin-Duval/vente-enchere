import { VendeurEntity } from '../../../entities/GestionCompte/vendeur.entity';
import { ProduitEntity } from '../../../entities/Gestionproduit/produit.entity';
import { ResponseType } from '../../../entities/Response.entity';
import { customFetch } from '../../../shared/customFetch';
import { API_ROUTES } from '../../shared/ApiRoutes';

export const fetchVendeurs = (): Promise<ResponseType<VendeurEntity>> => {
  return customFetch.get(API_ROUTES.VENDEURS.BASE);
};

export const fetchOneVendeur = (
  id: string,
): Promise<ResponseType<VendeurEntity>> => {
  return customFetch.get(API_ROUTES.VENDEURS.BASEID(id));
};

export const fetchProduitsVendeur = (
  id: string,
): Promise<ResponseType<ProduitEntity>> => {
  return customFetch.get(API_ROUTES.PRODUITS_VENDEUR.BASEID(id));
};

export const activateVendeur = (
  id: string,
): Promise<ResponseType<VendeurEntity>> => {
  return customFetch.put(API_ROUTES.VENDEURS.BASEID(id), {
    accreditation: true,
  });
};

export const desactivateVendeur = (
  id: string,
): Promise<ResponseType<VendeurEntity>> => {
  return customFetch.put(API_ROUTES.VENDEURS.BASEID(id), {
    accreditation: false,
  });
};
