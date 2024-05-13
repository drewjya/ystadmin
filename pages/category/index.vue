<script lang="ts" setup>
import type { CategoryProduct, SResponse } from "~/types/s-response";
import { ColumnType } from "~/types/t-table";

const runtime = useRuntimeConfig();
const page = ref(1);
const limit = 10;
const url = computed(() => apiPath().getCategory());
const { data, error, refresh, pending } = await useFetch(url, {
  baseURL: runtime.public.baseUrl,
  transform: (data: SResponse<CategoryProduct[]>) => {
    return {
      value: data.data,
    };
  },
});

const onDelete = async (itemId: number) => {
  const data = await usePrivateApi(
    runtime.public.baseUrl + apiPath().deleteCategory(itemId),
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
      label="Add Category"
      to="/category/add"
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
