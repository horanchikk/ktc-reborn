<template>
  <Form
    v-model:is-visible="debug.isVisible"
    :form-type="-1"
  >
    <h1 class="text-xl font-bold text-center">
      Debug
    </h1>
    <p class="text-sm font-mono font-semibold">
      User: {{ debug.user.data }} <br><br> Sidebar: {{ { isVisible: debug.sidebar.isVisible, isRendered: debug.sidebar.isRendered } }} <br><br> Route: {{ debug.route }}
    </p>
  </Form>
</template>

<script setup lang="ts">
import { useDebug } from '@/store/useDebug'

const debug = useDebug()
</script>
