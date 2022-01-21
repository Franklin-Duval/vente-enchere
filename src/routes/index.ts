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
  },
};
