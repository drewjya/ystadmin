<script lang="ts" setup>
type ThemeIcon = {
  icon: string;
  value: string;
};
const themeIcon: ThemeIcon[] = [
  {
    icon: "sun",
    value: "light",
  },
  {
    icon: "moon",
    value: "dark",
  },
  {
    icon: "cog-8-tooth",
    value: "system",
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
    <ClientOnly>
      <USelectMenu
        v-model="$colorMode.preference"
        value-attribute="value"
        option-attribute="value"
        :options="themeIcon"
      >
        <template #option="{ option }">
          <div class="flex gap-2">
            <UIcon
              :name="'i-heroicons-' + option.icon"
              class="text-black dark:text-white w-4 h-4"
              dynamic
            />
            <p>{{ option.value }}</p>
          </div>
        </template>
        <template #leading="{}">
          <UIcon
            :name="'i-heroicons-' + themeVa.icon"
            class="text-black dark:text-white w-4 h-4"
            dynamic
          />
        </template>
      </USelectMenu>
    </ClientOnly>
  </div>
</template>

<style scoped></style>
