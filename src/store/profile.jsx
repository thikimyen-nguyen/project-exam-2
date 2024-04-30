import { create } from "zustand";
import { apiKeyUrl, singleProfileUrl } from "../api";
export  const accessToken = JSON.parse(localStorage.getItem('accessToken'));
export   const currentUserName = JSON.parse(localStorage.getItem("currentUserName"));



const useProfileStore = create((set, get) => ({
    currentProfile: {},
    isLoading: false,
    isError: false,
    updateSuccess: false,
    apiKey: "",
    fetchApiKey: async () => {
      try {
        const postOption = {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        };
        const response = await fetch(apiKeyUrl, postOption);
        if (response.ok) {
          const json = await response.json();
          set((state) => ({ ...state, apiKey: json.data.key }));
        } 
      } catch (error) {
        set((state) => ({ ...state, isError: true }));

      }
    },
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
        localStorage.setItem("currentProfile", JSON.stringify(json.data));

      } catch (error) {
        set((state) => ({ ...state, isError: true }));
      } finally {
        set({ isLoading: false });
      }
    },
    fetchUpdateProfile: async (userName, apiKey, accessToken, data) => {
      set({ isLoading: true, isError: false });
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
        const currentProfileUrl = `${singleProfileUrl}/${userName}`;
        const response = await fetch( currentProfileUrl, putOption);
        const json = await response.json();
        set((state) => ({ ...state, currentProfile: json.data }));
        if (response.ok) {
          set({ updateSuccess: true });
        } else {
          set({ isError: true });
        }
        localStorage.removeItem("currentUser");

        localStorage.setItem("currentUser", JSON.stringify(json.data));

      } catch (error) {
        set((state) => ({ ...state, isError: true }));
      } finally {
        set({ isLoading: false });
      }
    },
  }));
  
  export default useProfileStore;
  
