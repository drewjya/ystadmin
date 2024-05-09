App.vue
<script setup lang="ts">
import { ref } from "vue";
import type { Cabang } from "~/types/s-response";
import { OrderStatus } from "../composables/api-path";
definePageMeta({});
const app = useApp();

const route = useRoute();

const status = ref<OrderStatus | undefined>();

const data = ref<Cabang | undefined>();
const router = useRouter();
const initState = async () => {
  const cabang = app.user?.cabang;
  console.log(cabang);
  if (!cabang) {
    router.push("/cabang");
    return;
  }

  const res = await usePrivateApi<Cabang>(apiPath().getCabangById(cabang), {
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
  if (app.user) {
    initState();
  }
});
</script>

<template>
  <div v-if="app.user?.cabang">
    <div v-if="data" class="flex flex-col gap-2">
      <div>Nama {{ data.nama }}</div>
      <div>Alamat {{ data.alamat }}</div>
      <div>No Telp {{ data.phoneNumber }}</div>
      <div>Jam Buka {{ data.openHour }}</div>
      <div>Jam Tutup {{ data.closeHour }}</div>
      <nuxt-link
        class="bg-blue-500 p-1 px-3 rounded w-40 justify-between items-center flex"
        :to="`/detail/order`"
      >
        <p>Order</p>
        <u-icon name="i-heroicons-arrow-right"></u-icon>
      </nuxt-link>
      <nuxt-link
        class="bg-blue-500 p-1 px-3 rounded w-40 justify-between items-center flex"
        :to="`/detail/treatment`"
      >
        <p>Treatment</p>
        <u-icon name="i-heroicons-arrow-right"></u-icon>
      </nuxt-link>
      <nuxt-link
        class="bg-blue-500 p-1 px-3 rounded w-40 justify-between items-center flex"
        :to="`/detail/therapist`"
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
  </div>
</template>
