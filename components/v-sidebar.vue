<script lang="ts" setup>
const auth = useApp();
</script>

<template>
  <div class="hidden md:block">
    <div
      class="h-full flex flex-col bg-default text-white pb-8 justify-between items-center"
    >
      <div class="pb-4 flex flex-col justify-between w-40">
        <v-link />
      </div>
      <div class="px-4 w-full">
        <u-button
          class="w-full justify-center bg-gold text-default hover:bg-default border border-default hover:border-gold hover:text-gold"
          dynamic
          icon="i-solar-logout-2-bold"
          @click="auth.logout()"
          >Logout</u-button
        >
      </div>
    </div>
  </div>
</template>

<style scoped></style>
