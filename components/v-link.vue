<script lang="ts" setup>
const app = useApp();
</script>

<template>
  <ul class="flex flex-col gap-1">
    <NuxtLink
      v-for="page in app.pages"
      :key="page.title"
      :to="page.link"
      class="text-center w-full px-7 py-[10px] text-[13px] font-sans relative h-max"
      :class="
        $route.path === page.link
          ? 'bg-gradient-to-r from-[#ffe197]/20 to-[#ffe197]/0 text-[#ffe197] font-bold cursor-no-drop before:absolute before:left-0 before:top-0 before:z-10 before:w-[5px] before:h-full before:bg-[#ffe195] before:rounded-tr-md before:rounded-br-md'
          : 'text-[#F1E7CE]/50 font-medium hover:bg-[#FFE195]/10 bg-transparent'
      "
      >{{ page.title }}</NuxtLink
    >
  </ul>
</template>

<style scoped></style>
