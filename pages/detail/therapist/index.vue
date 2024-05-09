<script lang="ts" setup>
import type { TherapistData } from "~/types/s-response";
import { ColumnType } from "~/types/t-table";

definePageMeta({
  layout: "form",
});

interface TherapistAbsensiCheck extends TherapistData {
  checkIn?: string;
  checkOut?: string;
}
const app = useApp();
const id = app.user?.cabang;
const url = computed(() => apiPath().getTherapistByCabang(id ?? 0));
const data = ref<TherapistAbsensiCheck[] | undefined>();
const therapist = ref<TherapistData[] | undefined>();
const initState = async () => {
  therapist.value = undefined;
  data.value = undefined;
  const req = await usePrivateApi<TherapistData[]>(url.value, {
    method: "GET",
  });
  if (req.status === 200) {
    data.value = req.data?.map((item) => {
      return {
        ...item,
        checkIn: item.attendance?.checkIn,
        checkOut: item.attendance?.checkOut,
      };
    });
  }
  const res = await usePrivateApi<TherapistData[]>(apiPath().getTherapist(), {
    method: "GET",
  });
  if (req.status === 200) {
    therapist.value = res.data?.filter((item) => {
      return !data.value?.find((item2) => item2.id === item.id);
    });
  }
};

onMounted(() => {
  initState();
});
</script>

<template>
  <div class="flex flex-col gap-2">
    <v-table
      :to="(item) => `/detail/therapist/${item.id}`"
      :columns="[
        {
          key: 'no',
          label: 'No',
          type: ColumnType.COUNT,
        },
        {
          key: 'nama',
          label: 'Name',
          type: ColumnType.TEXT,
        },

        {
          key: 'gender',
          label: 'Gender',
          type: ColumnType.TEXT,
        },
        {
          key: 'checkIn',
          label: 'Check In',
          type: ColumnType.DATE,
        },
        {
          key: 'checkOut',
          label: 'Check Out',
          type: ColumnType.DATE,
        },
      ]"
      :items="data"
    />
  </div>
</template>

<style scoped></style>
