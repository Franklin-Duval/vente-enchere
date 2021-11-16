export const BASE_URL = 'http://192.168.43.215:3001/';
// export const BASE_URL = 'https://vente-enchere-api.herokuapp.com/';

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
  },
  CATEGORIES: {
    BASE: `${BASE_URL}api/categories`,
    BASEID: (id: string) => `${BASE_URL}api/categories/${id}`,
  },
};
