<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const router = useRouter()

const email = ref<string>('')
const password1 = ref<string>('')
const password2 = ref<string>('')
const errors = ref<string[]>([])

async function submitForm(): Promise<void> {
    console.log('submitForm')

    errors.value = []

    if (password1.value !== password2.value) {
        errors.value.push('Passwords do not match')
        return
    }
    
    await $fetch('http://127.0.0.1:8000/api/v1/users/', {
        method: 'POST',
        body: {
            username: email.value,
            password: password1.value
        }
    }).then(response => {
        console.log('response', response)
        router.push({ path: '/login' })
    }).catch(error => {
        if (error.response) {
            for (const property in error.response._data) {
                errors.value.push(`${property}: ${error.response._data[property]}`)
            }
            console.log(JSON.stringify(error.response))
        } else {
            errors.value.push('Something went wrong. Please try again')
            console.log(JSON.stringify(error))
        }
    })
}
</script>

<template>
    <div class="py-10 px-6">
        <div class="max-w-sm mx-auto py-10 px-6 bg-gray-100 rounded-xl">
            <h1 class="mb-6 text-2xl">Sign in</h1>

            <form v-on:submit.prevent="submitForm">
                <input v-model="email" type="email" placeholder="Your email address..." class="w-full mb-4 py-4 px-6 rounded-xl"></input>
                <input v-model="password1" type="password" placeholder="Your password..." class="w-full mb-4 py-4 px-6 rounded-xl"></input>
                <input v-model="password2" type="password" placeholder="Repeat password..." class="w-full mb-4 py-4 px-6 rounded-xl"></input>
                
                <div
                    v-if="errors.length"
                    class="mb-6 py-4 px-6 bg-rose-400 text-white rounded-xl"
                >
                    <p
                        v-for="error in errors"
                        v-bind:key="error">
                        {{ error }}
                    </p>
                </div>

                <button class="py-4 px-6 bg-teal-700 text-white rounded-xl">Submit</button>
            </form>
    
        </div>
    </div>
</template>