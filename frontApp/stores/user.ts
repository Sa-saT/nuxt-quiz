// ストアの状態管理のみを担う
// 必要な分の/lib/account.ts からかんすうを利用する。

import { defineStore } from 'pinia'
import { loginApi, fetchUserApi, signupApi } from '@/lib/account'

interface User {
    id: number;
    email: string;
    name: string;
}

interface UserState {
    token: string | null;
    user: User | null;
}

export const useUserStore = defineStore('auth', {
    state: (): UserState => ({
        // token: localStorage.getItem('authToken'), // トークンをローカルストレージから復元
        token: null,
        user: null,
    }),

    actions: {
        // ログイン処理
        async login(email: string, password: string): Promise<void> {
            try {
                const { access } = await loginApi(email, password);
                this.token = access;

                // トークンをローカルストレージに保存
                localStorage.setItem('authToken', this.token);

                // ユーザー情報を取得
                this.user = await this.fetchUser();
                console.log('Login successful');
            } catch (error) {
                console.error('Login error:', error);
                throw error;
            }
        },

        // ユーザー情報を取得
        async fetchUser(): Promise<User | null> {
            if (!this.token) return null;

            try {
                const user = await fetchUserApi(this.token);
                this.user = user;
                console.log('User fetched:', user);
                return user;
            } catch (error) {
                console.error('Fetch user error:', error);
                this.logout(); // トークンが無効な場合にログアウト
                return null;
            }
        },

        // サインイン処理 (新規ユーザー登録)
        async signup(email: string, password: string, password2: string, name: string): Promise<void> {
            if (password !== password2) {
                throw new Error('Passwords do not match');
            }

            try {
                await signupApi(email, password, name);
                console.log('User registered successfully');
                await this.login(email, password); // 自動ログイン
            } catch (error) {
                console.error('Signup error:', error);
                throw error;
            }
        },

        // ログアウト処理
        logout(): void {
            this.token = null;
            this.user = null;
            localStorage.removeItem('authToken'); // トークンを削除
            console.log('User logged out');
        },

        // アプリ起動時にトークンがあれば自動ログインを試行
        async initialize(): Promise<void> {
            if (this.token) {
                try {
                    this.user = await this.fetchUser();
                    console.log('Session restored');
                } catch {
                    console.log('Session restoration failed. Logging out.');
                    this.logout();
                }
            }
        },
    },
});
