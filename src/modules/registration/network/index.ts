import { customFetch } from '../../../shared/customFetch';
import { API_ROUTES } from '../../shared/ApiRoutes';

export const signUp = (role: string, userToCreate: string) => {
  return customFetch.post(API_ROUTES.SIGNUP(role), userToCreate);
};
