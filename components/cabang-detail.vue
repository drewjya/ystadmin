<script lang="ts" setup>
import type { Cabang } from "~/types/s-response";

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  toOrder: {
    type: String,
    required: true,
  },
  toTreatment: {
    type: String,
    required: true,
  },

  toTherapist: {
    type: String,
    required: true,
  },
  toHappyHourCreate: {
    type: String,
    required: true,
  },
  toHappyHourEdit: {
    type: String,
    required: true,
  },
});

const url = computed(() => apiPath().getCabangById(Number(props.id)));

const data = ref<Cabang | undefined>();

const initState = async () => {
  const res = await usePrivateApi<Cabang>(url.value, {
    method: "GET",
  });
  if (res.status < 400) {
    data.value = res.data;
  }
};

const day = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];
const getDay = (index: number) => {
  return day[index - 1];
};
onMounted(() => {
  initState();
});

const links = [
  {
    name: "Order",
    to: props.toOrder,
  },
  {
    name: "Treatment",
    to: props.toTreatment,
  },
  {
    name: "Therapist",
    to: props.toTherapist,
  },
];
</script>

<template>
  <div v-if="data" class="flex flex-col gap-2">
    <div class="flex justify-between">
      <div class="text-default font-bold text-xl uppercase">
        {{ data.nama }}
      </div>
      <div class="flex justify-end gap-2 items-center">
        <nuxt-link
          v-for="i in links"
          :to="i.to"
          class="bg-default text-gold hover:bg-gold hover:text-default text-sm p-1 px-4 rounded-md hover:bg-lbrown"
          >{{ i.name }}</nuxt-link
        >
      </div>
    </div>

    <div class="text-sm font-sans">{{ data.alamat }}</div>
    <div class="text-sm font-sans">{{ data.phoneNumber }}</div>
    <div class="text-sm font-sans">
      {{ data.openHour }} - {{ data.closeHour }}
    </div>

    <div class="bg-gold p-2 rounded-md text-default" v-if="data.happyHour">
      <div class="flex gap-5 items-center justify-between">
        <div>Happy Hour Detail</div>
        <nuxt-link
          class="bg-default px-4 py-1 rounded-lg text-sm text-gold hover:bg-lbrown hover:text-default border border-default"
          :to="props.toHappyHourEdit"
        >
          Edit
        </nuxt-link>
      </div>
      <div v-if="data.happyHour?.publicHoliday">
        Termasuk Libur Bersama atau Cuti Bersama
      </div>
      <div v-for="i in data.happyHour.happyHourDetail">
        {{ getDay(i.startDay) }} - {{ getDay(i.endDay) }} ({{ i.startHour }} -
        {{ i.endHour }})
      </div>
    </div>
    <nuxt-link
      v-else
      class="bg-green-500 p-1 px-3 rounded w-max justify-between items-center flex gap-4"
      :to="props.toHappyHourCreate"
    >
      <p>Tambah Happy Hour</p>
      <u-icon name="i-heroicons-plus"></u-icon>
    </nuxt-link>
  </div>
</template>

<style scoped></style>
