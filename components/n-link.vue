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
  <nuxt-link :to="to" class="p-2 rounded w-max hover:bg-gold hover:text-default">{{
    label
  }}</nuxt-link>
</template>

<style scoped></style>
