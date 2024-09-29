
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'

interface User {
    id: number;
    email: string;
    username: string;
}

interface UserState {
    token: string | null,
    user: User | null,
}

export const useUserStore = defineStore('auth', {
    state: (): UserState => ({
        token: null,  // JWTトークン
        user: null,   // ユーザー情報
    }),

    actions: {

        // ログイン処理
        async login(email: string, password: string): Promise<void> {
            const router = useRouter();  // Vue Routerインスタンスを取得

            try {
            // JWTトークンを取得
            const response = await $fetch<{ access: string }>('http://localhost:8000/auth/login/', {
                method: 'POST',
                body: { email, password },
            })

            // トークンとユーザー情報をPiniaストアに保存
            this.token = response.access
            this.user = await this.fetchUser()

            // トークンをLocalStorageに保存して、リロード後もセッション維持
            localStorage.setItem('authToken', this.token)

            // ログイン成功後にダッシュボードにリダイレクト
            router.push('/dashboard')
            } catch (error) {
            console.error('Login error:', error)
            }
        },

        // ユーザー情報を取得
        async fetchUser(): Promise<User | null> {
            if (!this.token) return null

            try {
            // トークンを使って認証されたユーザー情報を取得
            const user = await $fetch<User>('http://localhost:8000/auth/v1/users/me/', {
                headers: {
                Authorization: `Bearer ${this.token}`,
                },
            })
            return user
            } catch (error) {
            console.error('Fetch user error:', error)
            return null
            }
        },

        // サインイン処理 (新規ユーザー登録)
        async signup(email: string, password: string, password2: string): Promise<void> {
            const router = useRouter();  // Vue Routerインスタンスを取得
            if (password !== password2) {
            throw new Error("Passwords do not match");
            }

            try {
            // ユーザーを作成
            await $fetch('http://localhost:8000/auth/user/create/', {
                method: 'POST',
                body: { email, password },
            })

            // ユーザー登録成功後に自動的にログイン
            await this.login(email, password)

            // サインイン後にダッシュボードにリダイレクト
            router.push('/dashboard')
            } catch (error) {
            console.error('Signup error:', error)
            }
        },

        // ログアウト処理
        logout(): void {
            this.token = null
            this.user = null
            // トークンを削除してセッションをクリア
            localStorage.removeItem('authToken')

            const router = useRouter()
            router.push('/login')  // ログアウト後にログインページにリダイレクト
        }
  },
})
