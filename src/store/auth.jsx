import { create } from "zustand";
import { apiKeyUrl } from "../api";
export const accessToken = JSON.parse(localStorage.getItem('accessToken'));
export   const currentUserName = JSON.parse(localStorage.getItem("currentUserName"));

const useAuthStore = create((set, get) => ({
  registerAccount: {},
  loginAccount: {},
  isLoading: false,
  isError: false,
  registerSuccess: false,
  logInSuccess: false,
  apiKey: "",
  fetchRegisterAccount: async (url, data) => {
    set({ isLoading: true, isError: false });

    try {
      const postOption = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };
      const response = await fetch(url, postOption);
      const json = await response.json();
      set((state) => ({ ...state, registerAccount: json.data }));
      console.log(json.data);

      if (response.ok) {
        set({ registerSuccess: true });
      } else {
        set({ isError: true });
      }
    } catch (error) {
      set({ isError: true });
    } finally {
      set({ isLoading: false });
    }
  },
  fetchSignIn: async (url, data) => {
    set({ isLoading: true, isError: false });
    try {
      const postOption = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };
      const response = await fetch(url, postOption);
      const json = await response.json();
      console.log(json.data);
      set((state) => ({ ...state, loginAccount: json.data }));
      if (response.ok) {
        set({ logInSuccess: true });
      } else {
        set({ isError: true });
      }
      localStorage.setItem("accessToken", JSON.stringify(json.data.accessToken));
      localStorage.setItem("currentUserName", JSON.stringify(json.data.name));

    } catch (error) {
      set({ isError: true });
    } finally {
      set({ isLoading: false });
    }
  },
  
  fetchApiKey: async () => {
    try {
        const postOption = {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        };
        const response = await fetch(apiKeyUrl, postOption);
        const json = await response.json();
        set((state) => ({ ...state, apiKey: json.data.key }));

    } catch (error) {
        console.error("Error fetching API key:", error);
    }
  },
}));


export default useAuthStore;
