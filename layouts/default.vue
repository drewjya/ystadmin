<script lang="ts" setup></script>

<template>
  <div class="flex flex-col h-screen">
    <v-navbar />
    <div class="flex h-[calc(100vh-80px)]">
      <v-sidebar />

      <div class="p-4 grow overflow-auto">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
