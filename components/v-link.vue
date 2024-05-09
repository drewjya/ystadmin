<script lang="ts" setup>
const app = useApp();
</script>

<template>
  <ul class="flex flex-col gap-1">
    <NuxtLink
      v-for="page in app.pages"
      :key="page.title"
      :to="page.link"
      class="text-center py-2 w-full"
      :class="
        $route.path === page.link
          ? 'dark:bg-blue-600  bg-blue-900 text-white '
          : 'hover:bg-blue-900 dark:hover:bg-blue-600 hover:text-white'
      "
      >{{ page.title }}</NuxtLink
    >
  </ul>
</template>

<style scoped></style>
