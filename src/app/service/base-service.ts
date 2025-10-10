"use client"
import { useAuthStore } from "../store";
import axios from "axios"

const API_URL = process.env.API_URL || 'http://localhost:4000';

export async function fetchWithAuth(endpoint, options = {}) {

    const {token} = useAuthStore()

    // Destructure params and other config options separately
    const { queryParams, ...axiosConfig } = options;

    try {
        const response = await axios({
            url: `${API_URL}${endpoint}`,
            method: axiosConfig.method || 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                ...axiosConfig.headers,
            },
            data: axiosConfig.data,
            params: queryParams, // This is now clean: only the intended search/filter parameters
        });
        return response.data;
    } catch (error) {
        console.error("API Error:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'API request failed');
    }
}