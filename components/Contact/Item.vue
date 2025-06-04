<template>
    <div class="flex flex-col gap-1 justify-center items-center text-center bg-black bg-opacity-20 rounded-md p-1">
        <p class="text-xl font-semibold" v-text="contact.full_name" />
        <p class="text-sm" v-text="contact.post" />
        <a :href="`mailto:${contact.email}`" v-text="`Почта: ${contact.email}`" />
        <div>
            <p v-text="`Телефон${ contact.phones.length > 1 ? 'ы' : '' }:`" />
            <p 
                v-for="(phone, idx) in contact.phones" 
                :key="idx" 
                v-text="phone"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
interface TContact {
    address: string;
    email: string;
    full_name: string;
    phones: string[];
    post: string;
}

defineProps<{
    contact: TContact
}>()
</script>

<style scoped>

</style>