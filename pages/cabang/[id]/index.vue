<script lang="ts" setup>
import type { OrderStatus } from "#imports";
import type { Cabang } from "~/types/s-response";

definePageMeta({
  layout: "form",
});

const route = useRoute();
const id = route.params.id;

const status = ref<OrderStatus | undefined>();

const url = computed(() => apiPath().getCabangById(Number(id)));

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
</script>

<template>
  <div v-if="data" class="flex flex-col gap-2">
    <div>Nama {{ data.nama }}</div>
    <div>Alamat {{ data.alamat }}</div>
    <div>No Telp {{ data.phoneNumber }}</div>
    <div>Jam Buka {{ data.openHour }}</div>
    <div>Jam Tutup {{ data.closeHour }}</div>
    <nuxt-link
      class="bg-blue-500 p-1 px-3 rounded w-40 justify-between items-center flex"
      :to="`/cabang/${id}/order`"
    >
      <p>Order</p>
      <u-icon name="i-heroicons-arrow-right"></u-icon>
    </nuxt-link>
    <nuxt-link
      class="bg-blue-500 p-1 px-3 rounded w-40 justify-between items-center flex"
      :to="`/cabang/${id}/treatment`"
    >
      <p>Treatment</p>
      <u-icon name="i-heroicons-arrow-right"></u-icon>
    </nuxt-link>
    <nuxt-link
      class="bg-blue-500 p-1 px-3 rounded w-40 justify-between items-center flex"
      :to="`/cabang/${id}/therapist`"
    >
      <p>Therapist</p>
      <u-icon name="i-heroicons-arrow-right"></u-icon>
    </nuxt-link>
    <div class="bg-blue-900 p-2 rounded-md" v-if="data.happyHour">
      <div>Happy Hour Detail</div>
      <div v-if="data.happyHour?.publicHoliday">
        Termasuk Libur Bersama atau Cuti Bersama
      </div>
      <div v-for="i in data.happyHour.happyHourDetail">
        {{ getDay(i.startDay) }} - {{ getDay(i.endDay) }} ({{ i.startHour }} -
        {{ i.endHour }})
      </div>
    </div>
  </div>
</template>

<style scoped></style>
