
// import { defineStore } from 'pinia'
// import { onMounted } from 'vue'

// // const router = useRouter();  // Vue Routerインスタンスを取得

// interface User {
//     id: number;
//     email: string;
//     username: string;
// }

// interface UserState {
//     token: string | null,
//     user: User | null,
// }

// export const useUserStore = defineStore('auth', {
//     state: (): UserState => ({
//         token: null,
//         user: null,   // ユーザー情報
//     }),

//     actions: {

//         // async initializeUser() {
//         //     onMounted(() => {  // onMountedを使用してクライアントサイドでのみ実行
//         //         const token = localStorage.getItem('authToken')
//         //         if (token) {
//         //             this.token = token
//         //             this.fetchUser()
//         //         }
//         //     })
//         // },
//         // ログイン処理
//         async login(email: string, password: string): Promise<void> {
            
//             try {
//                 // JWTトークンを取得
//                 const response = await $fetch<{ access: string }>('http://localhost:8000/auth/login/', {
//                     method: 'POST',
//                     body: { email, password },
//                 })
//                 console.log('response: ', response)
//                 // トークンとユーザー情報をPiniaストアに保存
//                 this.token = response.access
//                 this.user = await this.fetchUser()

//                 // トークンをLocalStorageに保存して、リロード後もセッション維持
//                 localStorage.setItem('authToken', this.token)

//                 console.log("login ok")
//             } catch (error) {
//                 console.error('Login error:', error)
//             }
//         },

//         // ユーザー情報を取得
//         async fetchUser(): Promise<User | null> {
//             if (!this.token) return null
//             // トークンを使って認証されたユーザー情報を取得
//             try {
//                 const user = await $fetch<User>('http://localhost:8000/auth/v1/users/me/', {
//                     headers: {
//                         Authorization: `Bearer ${this.token}`,
//                     },
//                 })
//                 console.log("fetch token")
//                 return user
//             } catch (error) {
//                 console.error('Fetch user error:', error)
//                 return null
//             }
//         },

//         // サインイン処理 (新規ユーザー登録)
//         async signup(email: string, password: string, password2: string): Promise<void> {

//             if (password !== password2) {
//             throw new Error("Passwords do not match");
//             }

//             try {
//             // ユーザーを作成
//             await $fetch('http://localhost:8000/auth/user/create/', {
//                 method: 'POST',
//                 body: { email, password },

//             })
//             console.log("Create user")
//             // ユーザー登録成功後に自動的にログイン
//             await this.login(email, password)
//             console.log("Signup&Login user")
//             // サインイン後にダッシュボードにリダイレクト
//             // router.push('/dashboard')
//             } catch (error) {
//             console.error('Signup error:', error)
//             }
//         },

//         // ログアウト処理
//         logout(): void {
//             this.token = null
//             this.user = null
//             // トークンを削除してセッションをクリア
//             localStorage.removeItem('authToken')
//             console.log("token:", this.token)
//             console.log("user:", this.user)
//             console.log("Logout")
//             // router.push('/')  // ログアウト後にログインページにリダイレクト
//         }
//   },
// })
// // make sure to pass the right store definition, `useUserStore` in this case.
// // if (import.meta.hot) {
// //     import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
// //   }
// // storesは関数(action)を定義して、state管理するとこ。画面遷移は関数(state)を呼び出すとこで組み合わせる。
// // https://reffect.co.jp/vue/vue-pinia
// // 書き直し！