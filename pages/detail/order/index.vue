<script lang="ts" setup>
definePageMeta({
  layout: "form",
});

const app = useApp();
</script>

<template>
  <v-order-table
    v-if="app.user?.cabang"
    :cabang-id="app.user?.cabang"
    :to="(item) => `/detail/order/${item.id}`"
  />
</template>

<style scoped></style>
