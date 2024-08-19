import create, { StateCreator } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';
import { baseURL } from './apis';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface AuthState {
    user?: any | null;
    token?: string | null;
    loading?: boolean;
    error?: string | null;
    success?: boolean;
    register?: (full_name: string, email: string, password: string) => Promise<void>;
    login?: (email: string, password: string) => Promise<void>;
    logout?: () => void;
}

type MyPersist = (
    config: StateCreator<AuthState>,
    options: PersistOptions<AuthState>
) => StateCreator<AuthState>;

const useAuthStore = create<AuthState>(
    (persist as MyPersist)(
        (set) => ({
            user: null,
            token: null,
            loading: false,
            error: null,
            success: false,

            register: async (full_name, email, password) => {
                set({ loading: true, error: null, success: false });
                try {
                    const response = await fetch(`${baseURL}/register`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ full_name, email, password }),
                    });
                    if (!response.ok) {
                        throw new Error('Registration failed');
                    }
                    const data = await response.json();
                    console.log(data);
                    toast('you are already login');
                    // toast.info(data?.message);
                    set({ user: data?.user, loading: false, success: true });
                } catch (error) {
                    set({ error: (error as Error).message, loading: false });
                }
            },

            login: async (email, password) => {
                set({ loading: true, error: null, success: false });
                try {
                    const response = await fetch(`${baseURL}/login`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ email, password }),
                    });
                    if (!response.ok) {
                        throw new Error('Login failed');
                    }
                    const data = await response.json();
                    toast.info(data?.message);
                    set({ user: data?.user, token: data?.token, loading: false, success: true });
                } catch (error) {
                    set({ error: (error as Error).message, loading: false });
                }
            },

            logout: () => {
                set({ user: null, token: null, success: false });
            },
        }),
        {
            name: 'auth-storage',
            getStorage: () => localStorage,
        }
    )
);

export default useAuthStore;
