import { CREATE_USER } from './actionTypes';

export type UserTypeAction = { type: string; data: any };

export const createUser = (user: any): UserTypeAction => ({
  type: CREATE_USER,
  data: {
    authentifie: user.authentifie,
    roles: user.roles,
    _id: user._id,
    nom: user.nom,
    prenom: user.prenom,
    token: user.token,
    nextAuthDate: user.nextAuthDate,
  },
});
