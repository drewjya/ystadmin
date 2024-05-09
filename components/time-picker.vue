<script lang="ts" setup>
import VueDatePicker, { type TimeModel } from "@vuepic/vue-datepicker";
// import "@vuepic/vue-datepicker/dist/main.css";

const props = defineProps<{
  modelValue: TimeModel;
}>();
const emit = defineEmits<{
  (e: "update:modelValue", value: TimeModel): void;
}>();

onMounted(() => {
  inputValue.value = props.modelValue;
});

const inputValue = ref(props.modelValue);

watch(inputValue, (val) => {
  emit("update:modelValue", val);
});

watch(props.modelValue, (val) => {
  inputValue.value = val;
});
</script>

<template>
  <VueDatePicker
    v-model="inputValue"
    :time-picker="true"
    input-class-name="h-[1.95rem]"
    class="m-0"
  >
    <template #input-icon>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6 ml-2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>
    </template>
  </VueDatePicker>
</template>

<style scoped></style>
