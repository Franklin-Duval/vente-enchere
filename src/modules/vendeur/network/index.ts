import { VendeurEntity } from '../../../entities/GestionCompte/vendeur.entity';
import { FeedbackEntity } from '../../../entities/GestionEnchere/feedback.entity';
import { CategorieEntity } from '../../../entities/Gestionproduit/categorie.entity';
import { EventEntity } from '../../../entities/Gestionproduit/event.entity';
import { LotEntity } from '../../../entities/Gestionproduit/lot.entity';
import { ProduitEntity } from '../../../entities/Gestionproduit/produit.entity';
import {
  ResponseEntityType,
  ResponseType,
} from '../../../entities/Response.entity';
import { customFetch } from '../../../shared/customFetch';
import { API_ROUTES } from '../../shared/ApiRoutes';

export const createProduit = (
  produit: any,
): Promise<ResponseType<ProduitEntity>> => {
  return customFetch.post(API_ROUTES.PRODUITS.BASE, produit);
};

export const addImageProduit = (
  produitId: string,
  images: [],
): Promise<ResponseType<ProduitEntity>> => {
  let formData = new FormData();
  for (let image of images) {
    formData.append('image', image);
  }

  return fetch(API_ROUTES.PRODUITS.ADD_IMAGES(produitId), {
    method: 'put',
    body: formData,
  }).then((res) => res.json());
};

export const createLot = (
  vendeurId: string,
): Promise<ResponseType<LotEntity>> => {
  return customFetch.post(API_ROUTES.LOTS.BASE, { vendeur: vendeurId });
};

export const fetchCategories = (): Promise<ResponseType<CategorieEntity>> => {
  return customFetch.get(API_ROUTES.CATEGORIES.BASE);
};

export const fetchLot = (): Promise<ResponseType<LotEntity>> => {
  return customFetch.get(API_ROUTES.LOTS.BASE);
};

export const fetchVendeurLot = (
  vendeurId: string,
): Promise<ResponseType<LotEntity>> => {
  return customFetch.get(API_ROUTES.LOTS.VENDEUR(vendeurId));
};

export const fetchVendeurFeedback = (): Promise<
  ResponseType<FeedbackEntity>
> => {
  return customFetch.get(API_ROUTES.FEEDBACK.BASE);
};

export const fetchProduit = (): Promise<ResponseType<ProduitEntity>> => {
  return customFetch.get(API_ROUTES.PRODUITS.BASE);
};

export const update = (
  id: string,
  data: any,
): Promise<ResponseType<VendeurEntity>> => {
  return customFetch.put(API_ROUTES.USERS.BASEID(id), data);
};

export const fetchEvent = (): Promise<ResponseType<EventEntity>> => {
  return customFetch.get(API_ROUTES.EVENT.BASE);
};

export const fetchVendeurEvent = (
  vendeurId: string,
): Promise<ResponseType<EventEntity>> => {
  return customFetch.get(API_ROUTES.EVENT.VENDEUR(vendeurId));
};

export const createEvent = (
  event: EventEntity,
): Promise<ResponseEntityType<EventEntity>> => {
  return customFetch.post(API_ROUTES.EVENT.BASE, event);
};

export const addImageEvent = (
  eventId: string,
  images: [],
): Promise<ResponseType<EventEntity>> => {
  let formData = new FormData();
  for (let image of images) {
    formData.append('image', image);
  }

  return fetch(API_ROUTES.PRODUITS.ADD_IMAGES(eventId), {
    method: 'put',
    body: formData,
  }).then((res) => res.json());
};

export const addFavoris = (
  userId: string,
  productId: string,
): Promise<ResponseType<ProduitEntity>> => {
  return customFetch.put(
    API_ROUTES.PRODUITS.FAVORIS_ADD(productId, userId),
    null,
  );
};
export const subFavoris = (
  userId: string,
  productId: string,
): Promise<ResponseType<ProduitEntity>> => {
  return customFetch.put(
    API_ROUTES.PRODUITS.FAVORIS_SUB(productId, userId),
    null,
  );
};
