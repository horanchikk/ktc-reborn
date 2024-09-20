<template>
    here is profile page
</template>

<script setup lang="ts">
import { useUser } from '~/store/useUser';

definePageMeta({
    middleware: ["user-only"]
})
</script>