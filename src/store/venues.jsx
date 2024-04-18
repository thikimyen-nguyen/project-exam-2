import { create } from "zustand";
import { allVenuesUrl } from "../api";


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
  
}));

export default useVenuesStore;
