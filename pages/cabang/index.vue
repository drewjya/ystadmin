<script lang="ts" setup>
import type { Cabang, SResponse } from "~/types/s-response";
import { ColumnType } from "~/types/t-table";

const runtime = useRuntimeConfig();
const page = ref(1);
const limit = 10;

const url = computed(() => apiPath().getCabang());
const { data, error, refresh, pending } = await useFetch(url, {
  baseURL: runtime.public.baseUrl,
  transform: (data: SResponse<Cabang[]>) => {
    return {
      value: data.data?.map((item) => {
        return {
          ...item,
          picture: item.picture ? runtime.public.imageUrl + item.picture : null,
        };
      }),
    };
  },
});

const onDelete = async (itemId: number) => {
  const data = await usePrivateApi(
    runtime.public.baseUrl + apiPath().deleteCabang(itemId),
    {
      method: "DELETE",
    }
  );

  refresh();
};
</script>

<template>
  <div class="flex flex-col gap-2">
    <n-link label="Add Cabang" to="/cabang/add" />
    <v-table
      :to="(item) => `/cabang/${item.id}`"
      :on-edit="(val) => $router.push(`/cabang/edit/${val.id}`)"
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
          key: 'picture',
          label: 'Gambar',
          type: ColumnType.IMAGE,
        },
        {
          key: 'phoneNumber',
          label: 'No Telepon',
          type: ColumnType.TEXT,
        },
        {
          key: 'alamat',
          label: 'Alamat',
          type: ColumnType.TEXT,
        },
        {
          key: 'admin',
          label: 'Admin',
          type: ColumnType.OBJECTMAP,
          toString: (item) => item?.name ?? '-',
        },
        {
          key: 'openHour',
          label: 'Jam Buka',
          type: ColumnType.TEXT,
        },
        {
          key: 'closeHour',
          label: 'Jam Tutup',
          type: ColumnType.TEXT,
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
