import { create } from "zustand";
import { apiKeyUrl, singleProfileUrl, venueBookingUrl } from "../api";
import { boolean } from "yup";

const useBookingStore = create((set, get) => ({
  isLoading: false,
  isError: false,
  createBookingSuccess: boolean,

  fetchCreateBooking: async (apiKey, accessToken) => {
    set({ isLoading: true, isError: false });

    try {
      const postOption = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
          "X-Noroff-API-Key": apiKey,
        },
      };
      const response = await fetch(venueBookingUrl, postOption);
      const json = await response.json();
      if (response.ok) {
        set((state) => ({ ...state, createBookingSuccess: true }));
      }
    } catch (error) {
      set((state) => ({ ...state, createBookingSuccess: false }));
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useBookingStore;
