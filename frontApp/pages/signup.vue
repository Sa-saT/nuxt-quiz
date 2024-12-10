<template>
    <div class="py-10 px-6">
        <div class="max-w-sm mx-auto py-10 px-6 bg-gray-100 rounded-xl">
        <h1 class="mb-6 text-2xl">Sign Up</h1>

        <form v-on:submit.prevent="submitForm">
            <input
            v-model="name"
            type="text"
            placeholder="Your name..."
            class="w-full mb-4 py-4 px-6 rounded-xl"
            />
            <input
            v-model="email"
            type="email"
            placeholder="Your email address..."
            class="w-full mb-4 py-4 px-6 rounded-xl"
            />
            <input
            v-model="password1"
            type="password"
            placeholder="Your password..."
            class="w-full mb-4 py-4 px-6 rounded-xl"
            />
            <input
            v-model="password2"
            type="password"
            placeholder="Repeat password..."
            class="w-full mb-4 py-4 px-6 rounded-xl"
            />

            <div v-if="errors.length" class="mb-6 py-4 px-6 bg-rose-400 text-white rounded-xl">
            <p v-for="error in errors" :key="error">{{ error }}</p>
            </div>

            <button
            class="py-4 px-6 bg-teal-700 text-white rounded-xl flex items-center justify-center"
            :disabled="isSubmitting"
            >
            <span v-if="isSubmitting" class="flex items-center">
                <span>{{ text }}</span>
                <span
                v-if="showCursor"
                class="ml-1 animate-blink opacity-50"
                aria-hidden="true"
                >|</span>
            </span>
            <span v-else>Submit</span>
            </button>
        </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'
import { navigateTo } from 'nuxt/app'
// 点滅効果
import { useSubmittingEffect } from '@/lib/submitting'

const name = ref('')
const email = ref('')
const password1 = ref('')
const password2 = ref('')
const errors = ref<string[]>([])
const isSubmitting = ref(false)

const { text, showCursor, startEffect } = useSubmittingEffect()

const authStore = useUserStore()

// サインアップフォームの処理
const submitForm = async () => {
errors.value = []
if (!email.value || !password1.value || !password2.value || !name.value) {
    errors.value.push('All fields are required.')
    return
}
if (password1.value !== password2.value) {
    errors.value.push('Passwords do not match.')
    return
}

isSubmitting.value = true
startEffect()

try {
    await authStore.signup(
        email.value,
        password1.value,
        password2.value,
        name.value
    )
    navigateTo('/top')
} catch (error) {
    const errorMessage = (error as any).response?.data || (error as Error).message
    errors.value = Array.isArray(errorMessage) ? errorMessage : [errorMessage]
} finally {
    isSubmitting.value = false
}
}
</script>
