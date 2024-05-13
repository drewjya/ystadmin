<script lang="ts" setup>
definePageMeta({
  layout: "form",
});

const route = useRoute();
const id = route.params.id;
</script>

<template>
  <cabang-detail
    :id="Number(id) ?? -1"
    :to-order="`/cabang/${id}/order`"
    :to-therapist="`/cabang/${id}/therapist`"
    :to-happy-hour-edit="`/cabang/${id}/happyHour/edit`"
    :to-happy-hour-create="`/cabang/${id}/happyHour`"
    :to-treatment="`/cabang/${id}/treatment`"
  />
</template>

<style scoped></style>
