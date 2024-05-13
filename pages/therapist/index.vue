<script lang="ts" setup>
import type { SResponse, TherapistData } from "~/types/s-response";
import { ColumnType } from "~/types/t-table";

const runtime = useRuntimeConfig();
const columns = [
  {
    key: "no",
    label: "No",
    type: ColumnType.COUNT,
  },
  {
    key: "nama",
    label: "Nama",
    type: ColumnType.TEXT,
  },

  {
    key: "gender",
    label: "Gender",
    type: ColumnType.TEXT,
  },

  {
    key: "cabang",
    label: "Cabang",
    type: ColumnType.OBJECTMAP,
    toString: (item: any) => `${item?.nama ?? "-"}`,
  },
  {
    key: "checkIn",
    label: "Check In",
    type: ColumnType.DATE,
  },
  {
    key: "checkOut",
    label: "CHeck Out",
    type: ColumnType.DATE,
  },
  {
    key: "action",
    label: "ACTION",
    type: ColumnType.ACTION,
  },
];
const page = ref(1);
const limit = 10;
const url = computed(() => apiPath().getTherapist());
const { data, error, refresh, pending } = await useFetch(url, {
  baseURL: runtime.public.baseUrl,
  transform: (data: SResponse<TherapistData[]>) => {
    return {
      value: data.data?.map((item) => {
        return {
          ...item,
          cabang: item.cabang,
          checkIn: item.attendance?.checkIn,
          checkOut: item.attendance?.checkOut,
        };
      }),
    };
  },
});

const onDelete = async (itemId: number) => {
  const data = await usePrivateApi(
    runtime.public.baseUrl + apiPath().deleteTherapist(itemId),
    {
      method: "DELETE",
    }
  );

  refresh();
};
</script>

<template>
  <div class="flex flex-col gap-2">
    <n-link
      label="Add Therapist"
      to="/therapist/add"
      class="bg-default text-gold text-sm px-5 rounded-lg"
    />
    <v-table
      :to="(item) => `/therapist/detail/${item.id}`"
      :on-edit="(item) => $router.push(`/therapist/edit/${item.id}`)"
      :columns="columns"
      :items="data?.value"
      :on-delete="(item) => onDelete(item.id)"
    />
  </div>
</template>

<style scoped></style>
