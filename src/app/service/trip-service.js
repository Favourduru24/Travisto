import {fetchWithAuth} from './base-service'

export const createTrip = (tripData) => {
    return fetchWithAuth("/v1/design/save-design", {
        method: 'POST',
        data: {  ...tripData},
    });
};