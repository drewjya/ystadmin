<script lang="ts" setup>
const props = defineProps({
  to: {
    type: String,
    required: false,
  },
  label: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <nuxt-link
    :to="to"
    class="dark:bg-blue-600 bg-blue-900 text-white p-2 rounded w-max hover:bg-blue-600 dark:hover:bg-blue-900"
    >{{ label }}</nuxt-link
  >
</template>

<style scoped></style>
