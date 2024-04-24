import { create } from "zustand";

const useProfileStore = create((set, get) => ({
  registerAccount: {},
  loginAccount: {},
  isLoading: false,
  isError: false,
  submitSuccess: false,
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
      console.log(json.data);
      set((state) => ({ ...state, registerAccount: json.data }));
      if (response.ok) {
        set({ submitSuccess: true });
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
      localStorage.setItem("token", JSON.stringify(json.data.accessToken));
    } catch (error) {
      set({ isError: true });
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useProfileStore;
