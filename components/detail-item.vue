<script lang="ts" setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="grid grid-cols-2">
    <p class="col-span-1">{{ title }}</p>
    <p class="col-span-1">{{ value }}</p>
  </div>
</template>

<style scoped></style>
