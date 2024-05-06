import { create } from "zustand";
import { apiKeyUrl, singleProfileUrl, venueBookingUrl } from "../api";
import { boolean } from "yup";

const useBookingStore = create((set, get) => ({
  isLoading: false,
  isError: false,
  createBookingSuccess: boolean,

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
        console.log(json.data)
        set((state) => ({ ...state, createBookingSuccess: true }));
      } else {
        set((state) => ({ ...state, createBookingSuccess: false }));

      }
    } catch (error) {
      set((state) => ({ ...state, createBookingSuccess: false }));
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useBookingStore;
