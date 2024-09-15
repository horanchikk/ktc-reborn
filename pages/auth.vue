<template>
    <Form v-model:is-visible="formState" :form-type="1" />
    <button @click="formState = !formState">show {{ formState }}</button>
</template>

<script setup lang="ts">
const formState = ref(true)
</script>