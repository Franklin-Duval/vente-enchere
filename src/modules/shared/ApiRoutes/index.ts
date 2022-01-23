// export const BASE_URL = 'http://192.168.43.214:3001/';
export const BASE_URL = 'https://vente-enchere-api.herokuapp.com/';

export const API_ROUTES = {
  SIGNUP: (role: string) => `${BASE_URL}api/auth/signup/${role}`,
  SIGNIN: `${BASE_URL}api/auth/signin`,
  IMAGES: (id: string) => `${BASE_URL}api/images/${id}`,
  PRODUITS: {
    BASE: `${BASE_URL}api/produits`,
    BASEID: (id: string) => `${BASE_URL}api/produits/${id}`,
    ADD_IMAGES: (id: string) => `${BASE_URL}api/produits/images/${id}`,
  },
  LOTS: {
    BASE: `${BASE_URL}api/lots`,
    BASEID: (id: string) => `${BASE_URL}api/lots/${id}`,
    VENDEUR: (vendeurId: string) => `${BASE_URL}api/lots/vendeur/${vendeurId}`,
    GET_LOT_PRODUIT: (productId: string) =>
      `${BASE_URL}api/lots/produit/${productId}`,
  },
  CATEGORIES: {
    BASE: `${BASE_URL}api/categories`,
    BASEID: (id: string) => `${BASE_URL}api/categories/${id}`,
  },
  VENDEURS: {
    BASE: `${BASE_URL}api/vendeurs`,
    BASEID: (id: string) => `${BASE_URL}api/vendeurs/${id}`,
  },
  PRODUITS_VENDEUR: {
    BASEID: (vendeur_id: string) =>
      `${BASE_URL}api/produits/vendeur/${vendeur_id}`,
  },
  USERS: {
    BASE: `${BASE_URL}api/users`,
    BASEID: (id: string) => `${BASE_URL}api/users/${id}`,
  },
  GERANTS: {
    BASE: `${BASE_URL}api/gerants`,
    BASEID: (id: string) => `${BASE_URL}api/gerants/${id}`,
  },
  COMMISSAIRES: {
    BASE: `${BASE_URL}api/commissaires`,
    BASEID: (id: string) => `${BASE_URL}api/commissaires/${id}`,
  },
  SALLES_ENCHERE: {
    BASE: `${BASE_URL}api/salleEncheres/`,
    BASEID: (id: string) => `${BASE_URL}api/salleEncheres/${id}`,
    ALL_PRODUCTS: (salleId: string) =>
      `${BASE_URL}api/salleEncheres/allProduits/${salleId}`,
    PRODUCT_ENCHERE: (id: string) =>
      `${BASE_URL}api/salleEncheres/getSalle/${id}`,
  },
  EVENT: {
    BASE: `${BASE_URL}api/events/`,
    BASEID: (id: string) => `${BASE_URL}api/events/${id}`,
  },
  LOG: {
    BASE: `${BASE_URL}api/logs/`,
  },
  FEEDBACK: {
    BASE: `${BASE_URL}api/feedbacks/`,
  },
  RAPPEL: {
    BASE: `${BASE_URL}api/rappels/`,
  },
};
