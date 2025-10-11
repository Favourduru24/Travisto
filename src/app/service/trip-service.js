import {fetchWithAuth} from './base-service'

// export const createTrip = (tripData) => {
//       console.log({tripData})
//     return fetchWithAuth("/trip/create-trip", {
//         method: 'POST',
//         data: {  ...tripData},
//     });
// };

export const createTrip = (tripData) => {
  const { formData, userId } = tripData.data; // ✅ unpack both levels
  console.log("Final trip data sent to backend:", { ...formData, userId });

  return fetchWithAuth("/trip/create-trip", {
    method: 'POST',
    data: { ...formData, userId }, // ✅ flatten everything here
  });
};

export const getUserTrips = async (userId) => {
  return fetchWithAuth(`/trip/my-trips/${userId}`, {
    method: 'GET',
  });
};

// ✅ Get one trip by ID
export const getTripById = async (id: number) => {
  return fetchWithAuth(`/trip/${id}`, {
    method: 'GET',
  });
};