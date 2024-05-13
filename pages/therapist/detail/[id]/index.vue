<script lang="ts" setup>
definePageMeta({
  layout: "form",
});

const route = useRoute();
const therapistId = Number(route.params.id) ?? -1;
</script>

<template>
  <therapist-detail
    :can-action="true"
    :therapist-id="therapistId"
    :to="`/therapist/detail/${therapistId}/attendance`"
  />
</template>

<style scoped></style>
