<script setup>
import { useUserStore } from '../stores/userStore';
import Card from 'primevue/card'
import Button from 'primevue/button'
import Divider from 'primevue/divider'

const user = useUserStore();

</script>

<template>
    <div class='w-full flex justify-center'>
        <Card v-if="!user.session" class="mt-3 w-1/3">
            <template #header>
                <p class="text-center font-medium w-full p-4 pb-0">
                    You are not authorized to view this page
                </p>
                <Divider />
            </template>
            <template #content>
                <div class="flex items-center gap-8 flex-col">
                    <Button as="router-link"  label="To Login" icon="pi pi-sign-in" rounded class="text-center w-48" type="submit" :to="{name: 'login'}" />
                    <Button as="router-link" severity="secondary" label="Home" icon="pi pi-home" rounded class="text-center w-48" type="submit" :to="{name: 'home'}" />
                </div>
            </template>
        </Card>
        <div v-else>
            You are authorized to view this page
        </div>
    </div>
</template>
