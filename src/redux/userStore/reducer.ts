import { UserTypeAction } from './actions';
import { CREATE_USER } from './actionTypes';

export type UserStateType = {
  user: {
    authentifie: boolean;
    roles: [];
    id: string;
    nom: string;
    prenom: string;
    token: string;
    nextAuthDate: number;
  };
};
const INITIAL_STORE: UserStateType = {
  user: {
    authentifie: false,
    roles: [],
    id: '',
    nom: '',
    prenom: '',
    token: '',
    nextAuthDate: 0,
  },
};

export const userReducer = (state = INITIAL_STORE, action: UserTypeAction) => {
  switch (action.type) {
    case CREATE_USER:
      return {
        ...state,
        user: action.data,
      };
    default:
      return state;
  }
};
