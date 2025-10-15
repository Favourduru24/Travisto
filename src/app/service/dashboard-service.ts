import {fetchWithAuth} from './base-service'

export const getDashboardStats = async () => {
  return fetchWithAuth(`/dashboard/stats` {
    method: 'GET',
  });
};

export const getUserGrowth = async () => {
  return fetchWithAuth(`/dashboard/user-growth` {
    method: 'GET',
  });
};

export const getTripsGrowth = async () => {
  return fetchWithAuth(`/dashboard/trips-growth` {
    method: 'GET',
  });
};

export const getTripsByTravelStyle = async () => {
  return fetchWithAuth(`/dashboard/travel-style` {
    method: 'GET',
  });
};