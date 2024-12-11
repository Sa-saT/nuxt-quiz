interface LoginResponse {
    access: string;
    refresh: string;
}

interface RefreshResponse {
    access: string;
}

interface User {
    id: number;
    email: string;
    name: string;
}

// ログインAPIリクエスト
export async function loginApi(email: string, password: string): Promise<LoginResponse> {
    const response = await fetch('http://127.0.0.1:8000/auth/v1/jwt/create/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        throw new Error('Login failed');
    }

    return response.json();
}

// トークンリフレッシュAPIリクエスト
export async function refreshTokenApi(refreshToken: string): Promise<RefreshResponse> {
    const response = await fetch('http://127.0.0.1:8000/auth/v1/jwt/refresh/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh: refreshToken }),
    });

    if (!response.ok) {
        throw new Error('Failed to refresh token');
    }

    return response.json();
}

// ユーザー情報取得APIリクエスト
export async function fetchUserApi(token: string): Promise<User> {
    const response = await fetch('http://127.0.0.1:8000/auth/v1/users/me/', {
        headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch user data');
    }

    return response.json();
}

// 新規登録APIリクエスト
export async function signupApi(email: string, password: string, name: string): Promise<void> {
    const response = await fetch('http://127.0.0.1:8000/auth/v1/users/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Signup failed');
    }
}
