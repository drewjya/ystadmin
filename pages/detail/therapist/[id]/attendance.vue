<script lang="ts" setup>
definePageMeta({
  layout: "form",
});

const route = useRoute();
const therapistId = Number(route.params.id) ?? -1;
</script>

<template>
  <therapist-attendance :therapist-id="therapistId" />
</template>

<style scoped></style>
