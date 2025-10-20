import {fetchWithAuth} from './base-service'

declare interface TripFormData {
  country: string;
  travelStyle: string;
  interest: string;
  budget: string;
  duration: number;
  groupType: string;
}

export const createTrip = (tripData: any) => {
  const { formData, userId } = tripData.data;  

  return fetchWithAuth("/trip/create-trip", {
    method: 'POST',
    data: { ...formData, userId },
  });
};

export const getUserTrips = async (userId: number) => {
  return fetchWithAuth(`/trip/my-trips/${userId}`, {
    method: 'GET',
  });
};

export const getAllTrips = async (queryParams?: { page?: number; limit?: number }) => {
  return fetchWithAuth(`/trip/all-trip`, {
    method: 'GET',
    queryParams,  
  });
};

export const getAllUsers = async () => {
  return fetchWithAuth(`/user/get-all-user`, {
    method: 'GET',
  });
};

export const getTripById = async (id: number) => {
  return fetchWithAuth(`/trip/${id}`, {
    method: 'GET',
  });
};