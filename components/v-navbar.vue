<script lang="ts" setup>
import { vOnClickOutside } from "@vueuse/components";
import type { OnClickOutsideOptions } from "../types/on-click-outside";
const app = useApp();

const breakPoints = useBreakpoints();

watch(breakPoints.width, (v) => {
  if (v > 768) {
    app.turnOffSidebar();
  }
});
const route = useRoute();
watch(
  () => route.fullPath,
  () => {
    app.turnOffSidebar();
  }
);
const ignoreRef = ref();
const ingnoreTheme = ref();
const onClickOutsideHandler: [(evt: any) => void, OnClickOutsideOptions] = [
  (ev: any) => {
    if (ev.target === ignoreRef.value) return;
    app.turnOffSidebar();
  },
  { ignore: [ignoreRef, ingnoreTheme] },
];

const props = defineProps({
  form: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div class="bg-default text-white p-4 pl-0 flex items-center h-20">
    <div class="md:hidden" v-if="!form">
      <button
        class="flex flex-col h-12 w-12 justify-center items-center group"
        @click="app.clickSidebar()"
        ref="ignoreRef"
      >
        <div
          class="h-0.5 w-6 my-0.5 rounded-full bg-gold dark:bg-white transition ease transform duration-300"
          :class="app.isActive ? 'rotate-45 translate-y-1.5' : ''"
        ></div>
        <div
          class="h-0.5 w-6 my-0.5 rounded-full bg-gold dark:bg-white transition ease transform duration-300"
          :class="app.isActive ? 'opacity-0' : ''"
        ></div>
        <div
          class="h-0.5 w-6 my-0.5 rounded-full bg-gold dark:bg-white transition ease transform duration-300"
          :class="app.isActive ? '-rotate-45 -translate-y-1.5' : ''"
        ></div>
        <div v-auto-animate>
          <div
            class="relative"
            v-if="app.isActive"
            v-on-click-outside="onClickOutsideHandler"
          >
            <div
              class="absolute bg-default h-[calc(100vh-80px)] w-40 z-50 flex flex-col justify-between pb-4 top-[31px] -left-[24px]"
            >
              <v-link />
            </div>
          </div>
        </div>
      </button>
    </div>
    <div v-else>
      <u-button
        icon="i-heroicons-arrow-left"
        dynamic
        solid
        @click="$router.go(-1)"
        square
        class="bg-default text-gold rounded-md ml-4 hover:bg-[#ffe195] hover:text-[#462722]"
        size="lg"
      />
    </div>
    <div class="flex items-center gap-4 w-full px-5">
      <img src="/logo.png" alt="logo" class="w-14" />
      <h1 class="text font-bold text-gold font-sans">YST Family</h1>
    </div>
  </div>
</template>

<style scoped></style>
