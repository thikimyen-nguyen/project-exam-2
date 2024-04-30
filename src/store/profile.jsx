import { create } from "zustand";
import { singleProfileUrl } from "../api";



const useProfileStore = create((set, get) => ({
    currentProfile: {},
    isLoading: false,
    isError: false,
    
    
    fetchSingleProfile: async (userName, apiKey, accessToken) => {
      set({ isLoading: true, isError: false });
      try {
        const getOption = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
            "X-Noroff-API-Key": apiKey,
          }
        };
        const currentProfileUrl = `${singleProfileUrl}/${userName}`;
        const response = await fetch( currentProfileUrl, getOption);
        const json = await response.json();
        set((state) => ({ ...state, currentProfile: json.data }));
        localStorage.setItem("currentUser", JSON.stringify(json.data));

      } catch (error) {
        set((state) => ({ ...state, isError: true }));
      } finally {
        set({ isLoading: false });
      }
    },
  }));
  
  export default useProfileStore;
  
