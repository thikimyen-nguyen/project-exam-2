import { create } from "zustand";
import { allVenuesUrl } from "../api";
import { boolean } from "yup";

export const currentVenue = JSON.parse(localStorage.getItem("currentVenue"));
const useVenuesStore = create((set, get) => ({
  venues: [],
  singleVenue: {},
  isLoading: false,
  isError: false,
  bookings: [],
  createVenueSuccess: boolean,
  errorVenueMessage: "",
  updateVenueSuccess: boolean,
  deleteVenueSuccess: boolean,
  searchVenues: {},

  fetchVenues: async (url) => {
    set({ isLoading: true, isError: false });
    try {
      const response = await fetch(url);
      const json = await response.json();
      set((state) => ({ ...state, venues: json.data }));
    } catch (error) {
      set({ isError: true });
    } finally {
      set({ isLoading: false });
    }
  },
  fetchSearchVenues: async (query) => {
    set({ isLoading: true, isError: false });
    const searchVenueUrl = `${allVenuesUrl}/search?q=${query}`;
    try {
      const response = await fetch(searchVenueUrl);
      const json = await response.json();
      set((state) => ({ ...state, searchVenues: json.data }));
    } catch (error) {
      set({ isError: true });
    } finally {
      set({ isLoading: false });
    }
  },
  fetchVenueById: async (id) => {
    const singleVenueUrl = `${allVenuesUrl}/${id}?_bookings=true&_owner=true`;
    set({ isLoading: true, isError: false });
    try {
      const response = await fetch(singleVenueUrl);
      const json = await response.json();
      set((state) => ({ ...state, singleVenue: json.data }));
      set((state) => ({ ...state, bookings: json.data.bookings }));
      localStorage.setItem("currentVenue", JSON.stringify(json.data));
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
        set((state) => ({ ...state, createVenueSuccess: true }));
      } else {
        set((state) => ({ ...state, createVenueSuccess: false }));
        set((state) => ({
          ...state,
          errorVenueMessage: json.errors[0].message,
        }));
      }
    } catch (error) {
      set((state) => ({ ...state, createVenueSuccess: false }));
    } finally {
      set({ isLoading: false });
    }
  },
  fetchUpdateVenue: async (apiKey, accessToken, data, id) => {
    set({ isLoading: true, isError: false });
    const singleVenueUrl = `${allVenuesUrl}/${id}`;

    try {
      const putOption = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
          "X-Noroff-API-Key": apiKey,
        },
        body: JSON.stringify(data),
      };
      const response = await fetch(singleVenueUrl, putOption);
      const json = await response.json();
      if (response.ok) {
        set((state) => ({ ...state, updateVenueSuccess: true }));
      } else {
        set((state) => ({ ...state, updateVenueSuccess: false }));
        set((state) => ({
          ...state,
          errorVenueMessage: json.errors[0].message,
        }));
      }
    } catch (error) {
      set((state) => ({ ...state, updateVenueSuccess: false }));
    } finally {
      set({ isLoading: false });
    }
  },
  fetchDeleteVenue: async (apiKey, accessToken, id) => {
    set({ isLoading: true, isError: false });
    const singleVenueUrl = `${allVenuesUrl}/${id}`;

    try {
      const deleteOption = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
          "X-Noroff-API-Key": apiKey,
        },
      };
      const response = await fetch(singleVenueUrl, deleteOption);
      if (response.ok) {
        set((state) => ({ ...state, deleteVenueSuccess: true }));
      } else {
        set((state) => ({ ...state, deleteVenueSuccess: false }));
      }
    } catch (error) {
      set((state) => ({ ...state, deleteVenueSuccess: false }));
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useVenuesStore;
