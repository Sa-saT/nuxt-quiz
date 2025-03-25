// ストアの状態管理のみを担う
// 必要な分の/lib/account.ts からかんすうを利用する。

import { defineStore } from 'pinia'
import { loginApi, fetchUserApi, signupApi, refreshTokenApi } from '@/lib/account'
import { navigateTo } from "nuxt/app"

interface User {
    id: number;
    email: string;
    name: string;
}

interface UserState {
    accessToken: string | null;
    refreshToken: string | null;
    user: User | null;
}

export const useUserStore = defineStore('user', {
    state: (): UserState => ({
        accessToken: null,
        refreshToken: null,
        user: null,
    }),

    actions: {
        async initialize(): Promise<void> {
            const accessToken = localStorage.getItem('accessToken');
            const refreshToken = localStorage.getItem('refreshToken');
            if (accessToken && refreshToken) {
                this.accessToken = accessToken;
                this.refreshToken = refreshToken;
                try {
                    this.user = await this.fetchUser();
                    console.log('Session restored');
                } catch {
                    console.log('Session restoration failed. Logging out.');
                    this.logout();
                }
            }
        },

        async login(email: string, password: string): Promise<void> {
            try {
                const { access, refresh } = await loginApi(email, password);
                this.accessToken = access;
                this.refreshToken = refresh;

                localStorage.setItem('accessToken', this.accessToken);
                localStorage.setItem('refreshToken', this.refreshToken);

                this.user = await this.fetchUser();
                console.log('Login successful');
                navigateTo('/top');
            } catch (error) {
                console.error('Login error:', error);
                throw error;
            }
        },

        async fetchUser(): Promise<User | null> {
            if (!this.accessToken) return null;

            try {
                const user = await fetchUserApi(this.accessToken);
                this.user = user;
                console.log('User fetched:', user);
                return user;
            } catch (error) {
                console.error('Fetch user error:', error);
                await this.refreshAccessToken();
                return null;
            }
        },

        async refreshAccessToken(): Promise<void> {
            if (!this.refreshToken) return;

            try {
                const { access } = await refreshTokenApi(this.refreshToken);
                this.accessToken = access;
                localStorage.setItem('accessToken', this.accessToken);
                console.log('Access token refreshed');
            } catch (error) {
                console.error('Failed to refresh access token:', error);
                this.logout();
            }
        },

        async signup(email: string, password: string, password2: string, name: string): Promise<void> {
            if (password !== password2) {
                throw new Error('Passwords do not match');
            }

            try {
                await signupApi(email, password, name);
                console.log('User registered successfully');
                await this.login(email, password);
            } catch (error) {
                console.error('Signup error:', error);
                throw error;
            }
        },

        logout(): void {
            this.accessToken = null;
            this.refreshToken = null;
            this.user = null;
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            console.log('User logged out');
        },
    },
});
