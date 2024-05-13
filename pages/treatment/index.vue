<script lang="ts" setup>
import type { SResponse, TretmentData } from "~/types/s-response";
import { ColumnType } from "~/types/t-table";

const runtime = useRuntimeConfig();
const page = ref(1);
const limit = 10;
const url = computed(() => apiPath().getTreatment());
const { data, error, refresh, pending } = await useFetch(url, {
  baseURL: runtime.public.baseUrl,
  transform: (data: SResponse<TretmentData[]>) => {
    return {
      value: data.data,
    };
  },
});

const onDelete = async (itemId: number) => {
  const data = await usePrivateApi(
    runtime.public.baseUrl + apiPath().deleteTreatment(itemId),
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
      label="Add Treatment"
      to="/treatment/add"
      class="bg-default text-gold text-sm px-5 rounded-lg"
    />
    <v-table
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
          key: 'durasi',
          label: 'Durasi',
          type: ColumnType.TEXT,
        },

        {
          key: 'category',
          label: 'Category',
          type: ColumnType.OBJECTMAP,
          toString: (item) => item.nama,
        },
        {
          key: 'action',
          label: 'Action',
          type: ColumnType.ACTION,
        },
      ]"
      :items="data?.value"
      :on-delete="(item) => onDelete(item.id)"
    />
  </div>
</template>

<style scoped></style>
