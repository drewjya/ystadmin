App.vue
<script setup lang="ts">
const app = useApp();
</script>

<template>
  <div v-if="app.user?.cabang">
    <cabang-detail
      :id="app.user.cabang"
      :to-order="`/detail/order`"
      :to-therapist="`/detail/therapist`"
      :to-happy-hour-edit="`/detail/happyHour/edit`"
      :to-happy-hour-create="`/detail/happyHour`"
      :to-treatment="`/detail/treatment`"
    />
  </div>
</template>
