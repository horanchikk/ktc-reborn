<template>
    <div
      class="w-full h-full flex flex-col gap-5 p-2"
    >
      <div
        v-show="!contactsList"
        v-for="i of Array.from({ length: 5 }).map((i, idx) => idx)"
        :key="i"
        :class="i === 0 ? 'mt-0 mb-4' : 'my-4'"
        class="w-full h-[200px] loading rounded-md opacity-30"
      />
      <ContactItem
        v-for="(contact, idx) in contactsList" 
        :key="idx"
        :contact="contact"
      />
    </div>
</template>

<script setup lang="ts">
const { $api } = useNuxtApp()
const contactsList = ref()

definePageMeta({
  name: 'Контакты',
  middleware: ['user-only'],
})

onMounted(async () => {
  contactsList.value = await $api.contacts.getContacts()
})
</script>

<style scoped>

</style>