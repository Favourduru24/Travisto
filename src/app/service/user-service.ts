import { fetchWithAuth } from "./base-service";

export const updateUser = (userData: any, id: number) => {

  return fetchWithAuth(`/user/${id}`, {
    method: 'PATCH',
    data: userData, 
  });
};
