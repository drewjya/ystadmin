<script lang="ts" setup>
definePageMeta({
  layout: "form",
});

const route = useRoute();
const therapistId = Number(route.params.therapistId) ?? -1;
const cabangId = Number(route.params.id) ?? -1;
</script>

<template>
  <therapist-detail
    :can-action="false"
    :therapist-id="therapistId"
    :to="`/cabang/${cabangId}/therapist/${therapistId}/attendance`"
  />
</template>

<style scoped></style>
