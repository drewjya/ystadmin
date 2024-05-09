<script lang="ts" setup>
type ThemeIcon = {
  icon: string;
  value: string;
};
const themeIcon: ThemeIcon[] = [
  {
    icon: "i-heroicons-sun",
    value: "light",
  },
  {
    icon: "i-heroicons-moon",
    value: "dark",
  },
];
const themeVa = ref(themeIcon[0]);
const colorMode = useColorMode();
watch(
  () => colorMode.preference,
  (value) => {
    themeVa.value =
      themeIcon.find((item) => item.value === value) ?? themeIcon[0];
  }
);
</script>

<template>
  <div class="p-2">
    <UButton
      @click="
        () => {
          colorMode.preference =
            colorMode.preference === 'dark' ? 'light' : 'dark';
        }
      "
      class="flex gap-2 bg-white dark:bg-gray-800 text-black dark:text-white hover:text-white"
      square
      :icon="
        colorMode.preference !== 'dark' ? 'i-heroicons-sun' : 'i-heroicons-moon'
      "
      size="xl"
      variant="solid"
    />
  </div>
</template>

<style scoped></style>
