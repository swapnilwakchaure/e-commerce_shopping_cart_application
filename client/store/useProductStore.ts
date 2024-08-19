import { create } from 'zustand';
import { baseURL } from './apis';

interface ProductState {
    products?: any[];
    loading?: boolean;
    error?: string | null;
    success?: string | null;
    fetchProducts?: () => Promise<void>;
    addProduct?: (product: any) => Promise<void>;
}

export const useProductStore = create <ProductState> ((set) => ({
    products: [],
    loading: false,
    error: null,
    success: null,

    fetchProducts: async () => {
        set({ loading: true, error: null, success: null });
        try {
            const response = await fetch(`${baseURL}/products`);
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            const data = await response.json();
            set({ products: data, success: 'Products fetched successfully!', loading: false });
        } catch (error) {
            set({ error: (error as Error).message, loading: false });
        }
    },

    //   addProduct: async (product) => {
    //     set({ loading: true, error: null, success: null });
    //     try {
    //       const response = await fetch('http://localhost:8080/products', {
    //         method: 'POST',
    //         headers: {
    //           'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(product),
    //       });
    //       if (!response.ok) {
    //         throw new Error(`Error: ${response.statusText}`);
    //       }
    //       const data = await response.json();
    //       set((state) => ({
    //         products: [...state.products, data],
    //         success: 'Product added successfully!',
    //         loading: false,
    //       }));
    //     } catch (error) {
    //       set({ error: error.message, loading: false });
    //     }
    //   },
}));
