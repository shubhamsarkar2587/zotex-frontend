import axios from "axios";
import { create } from "zustand";

export const useProduct = create((set) => ({
  productList: [],
  totalCount: null,
  isLoading: false,
  isEditProduct: false,
  setIsEditProduct: (state) => {
    set(() => ({
      isEditProduct: state
    }))
  },
  selectedProduct: {},
  setSelectedProduct: (data) => {
    set(() => ({
      selectedProduct: data
    }))
  },
  clearSelectedProduct: () => {
    set(() => ({
      selectedProduct: {}
    }))
  },
  getAllProducts: async ({ search = "", page }) => {
    try {
      set(() => ({ isLoading: true }));
      const fetchData = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}product/all?search=${search}&page=${page}`
      );
      set(() => ({
        productList: fetchData?.data?.data || [],
        totalCount: fetchData?.data?.totalCount || [],
        isLoading: false,
      }));
    } catch {
      set(() => ({ isLoading: false }));
    }
  },
}));
