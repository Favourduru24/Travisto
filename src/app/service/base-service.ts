"use client"
import { useAuthStore } from "../store";
import axios from "axios"

const API_URL = process.env.API_URL || 'http://localhost:4000';

declare interface TripFormData {
  country: string;
  travelStyle: string;
  interest: string;
  budget: string;
  duration: number;
  groupType: string;
}

interface trip {
    method: string
    headers: string[]
    queryParams: string
    data: TripFormData
}

export async function fetchWithAuth(endpoint: string, options: trip = {}) {

    // Destructure params and other config options separately
    const { queryParams, ...axiosConfig } = options;

    try {
        const response = await axios({
            url: `${API_URL}${endpoint}`,
            method: axiosConfig.method || 'GET',
            // headers: {
            //     Authorization: `Bearer ${token}`,
            //     ...axiosConfig.headers,
            // },
            data: axiosConfig.data,
            params: queryParams, // This is now clean: only the intended search/filter parameters
        });
        return response.data;
    } catch (error: string[] | null | any | string) {
        console.error("API Error:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'API request failed');
    }
}