<template>
    123{{ useUser().data }}
</template>

<script setup lang="ts">
import { useUser } from '~/store/useUser';

definePageMeta({
    middleware: ["user-only"]
})
</script>