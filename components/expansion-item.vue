<script lang="ts" setup>
const props = defineProps<{
  onDelete: () => void;
  label: string;
  items: string[];
}>();
</script>

<template>
  <div class="text-white rounded">
    <button
      class="bg-[#462722] px-2 py-1 flex justify-between w-full items-center"
    >
      <div class="font-bold">{{ label }}</div>
      <UButton
        label="Remove"
        class="!text-white hover:!text-red-900"
        :size="'xs'"
        :variant="'ghost'"
        @click="onDelete"
      />
    </button>
    <div class="flex flex-col text-sm bg-[#513732df] px-2 py-1 gap-0.5">
      <div v-for="i in items">{{ i }}</div>
    </div>
  </div>
</template>

<style scoped></style>
