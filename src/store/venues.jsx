import { create } from "zustand";
import { allVenuesUrl } from "../api";

export const currentVenue = JSON.parse(localStorage.getItem('currentVenue'));
const useVenuesStore = create((set, get) => ({
  venues: [],
  singleVenue: {},
  isLoading: false,
  isError: false,
  bookings: [],
  fetchVenues: async (url) => {
    set({ isLoading: true, isError: false });
    try {
      const response = await fetch(url);
      const json = await response.json();
      console.log(json.data)
      set((state) => ({ ...state, venues: json.data }));
    } catch (error) {
      set({ isError: true });
    } finally {
      set({ isLoading: false });
    }
  },
  fetchVenueById: async (id) => {
    const singleVenueUrl = `${allVenuesUrl}/${id}?_bookings=true`;
    set({ isLoading: true, isError: false });
    try {
      const response = await fetch(singleVenueUrl);
      const json = await response.json();
      set((state) => ({ ...state, singleVenue: json.data }));
      set((state) => ({ ...state, bookings: json.data.bookings }));
      localStorage.setItem("currentVenue", JSON.stringify(json.data));
      console.log(json.data)
    } catch (error) {
      set({ isError: true });
    } finally {
      set({ isLoading: false });
    }
  },
  fetchCreateVenue: async (apiKey, accessToken, data) => {
    set({ isLoading: true, isError: false });

    try {
      const postOption = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
          "X-Noroff-API-Key": apiKey,
        },
        body: JSON.stringify(data),
      };
      const response = await fetch(allVenuesUrl, postOption);
      const json = await response.json();
      if (response.ok) {
        console.log(json.data);
        set((state) => ({ ...state, createBookingSuccess: true }));
      } else {
        set((state) => ({ ...state, createBookingSuccess: false }));
        console.log(json.errors[0].message);
        set((state) => ({
          ...state,
          errorBookingMessage: json.errors[0].message,
        }));
      }
    } catch (error) {
      set((state) => ({ ...state, createBookingSuccess: false }));
      console.log(error);
    } finally {
      set({ isLoading: false });
    }
  },

  
}));

export default useVenuesStore;
