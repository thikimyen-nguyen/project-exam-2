import { create } from "zustand";
import { venueBookingUrl } from "../api";
import { boolean } from "yup";

const useBookingStore = create((set) => ({
  isLoading: false,
  isError: false,
  createBookingSuccess: boolean,
  errorBookingMessage: "",
  fetchCreateBooking: async (apiKey, accessToken, data) => {
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
      const response = await fetch(venueBookingUrl, postOption);
      const json = await response.json();
      if (response.ok) {
        set((state) => ({ ...state, createBookingSuccess: true }));
      } else {
        set((state) => ({ ...state, createBookingSuccess: false }));
        set((state) => ({
          ...state,
          errorBookingMessage: json.errors[0].message,
        }));
      }
    } catch (error) {
      set((state) => ({ ...state, createBookingSuccess: false }));
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useBookingStore;
