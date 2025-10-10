import {fetchWithAuth} from './base-service'

export const createTrip = (tripData) => {
      console.log({tripData})
    return fetchWithAuth("/trip/create-trip", {
        method: 'POST',
        data: {  ...tripData},
    });
};