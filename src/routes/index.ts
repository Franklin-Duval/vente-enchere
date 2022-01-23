export const ROUTES = {
  HOME_PAGE: '/',
  SIGNIN: '/signin',
  SIGNUP: '/signup',
  UNAUTHORIZED: '/unauthorized',
  ACTIVATE_ACCOUNT: (userId: string) => `/activate-account/id=${userId}`,
  ADMIN_PAGE: {
    DASHBOARD: '/admin/dashboard',
    PERSONNEL: '/admin/personnel',
    LOGS: '/admin/logs',
    STATISTICS: '/admin/statistics',
  },
  VENDEUR_PAGE: {
    DASHBOARD: '/vendeur/dashboard',
    PRODUCTS: '/vendeur/products',
    ACCOUNT: '/vendeur/account',
    NEW_PRODUCT: '/vendeur/products/new',
    LOT_DETAIL: (id: string) => `/vendeur/lot-details/?id=${id}`,
    UPDATE: '/vendeur/account/update',
  },
  GERANT_PAGE: {
    DASHBOARD: '/gerant/dashboard',
    VENDEURS: '/gerant/vendors',
    DETAIL: `/gerant/details`,
    ACCOUNT: '/gerant/my-account',
  },
  CATALOG_PAGE: {
    CATALOG: '/catalog',
    PRODUCT: (productId: string) => `/catalog/product?id=${productId}`,
    LOT: (lotId: string) => `/catalog/lot?id=${lotId}`,
  },
  COMMISSAIRE_PAGE: {
    DASHBOARD: '/commissaire/dashboard',
    LOT_DETAIL: (id: string) => `/commissaire/lot-details/?id=${id}`,
    PRODUCT_DETAIL: (id: string) => `/commissaire/product-detail/?id=${id}`,
    AUCTION: '/commissaire/auction',
    AUCTION_DETAIL: (id: string) => `/commissaire/auction-detail/?id=${id}`,
  },
  AUCTION_ROOM: {
    ROOM: (id: string) => `/auction-room/?id=${id}`,
    ADMIN_ROOM: (id: string) => `/auction-room-admin/?id=${id}`,
  },
  ENCHERE_PAGE: {
    ENCHERE_DETAIL: (id: string) => `/enchere/enchere-details/?id=${id}`,
  },
  FAVORIS_PAGE: {
    FAVORIS: '/favoris',
  },
};
