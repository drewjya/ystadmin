<script lang="ts" setup>
import type { SResponse } from "~/types/s-response";
import { ColumnType } from "~/types/t-table";

const runtime = useRuntimeConfig();
const page = ref(1);
const app = useApp();
const limit = 10;
const url = computed(() => apiPath().getBanner());

const onDelete = async (itemId: number) => {
  const data = await fetch(
    runtime.public.baseUrl + apiPath().deleteBanner(itemId),
    {
      method: "DELETE",

      headers: {
        Authorization: `Bearer ${app.accessToken ?? "invalid_token"}`,
      },
    }
  );

  refresh();
};
const { data, error, refresh, pending } = await useFetch(url, {
  baseURL: runtime.public.baseUrl,
  transform: (
    data: SResponse<
      {
        picture: string;
        id: number;
      }[]
    >
  ) => {
    return {
      value: data.data?.map((e) => {
        return {
          path: runtime.public.imageUrl + e.picture,
          id: e.id,
        };
      }),
    };
  },
});
</script>

<template>
  <div class="flex flex-col gap-2">
    <n-link
      label="Add Banner"
      to="/banner/add"
      class="bg-default text-gold text-sm px-5 rounded-lg"
    />

    <v-table
      :columns="[
        {
          key: 'path',
          label: 'Image',
          type: ColumnType.IMAGE,
        },

        {
          key: 'action',
          label: 'Action',
          type: ColumnType.ACTION,
        },
      ]"
      :on-delete="(item) => onDelete(item.id)"
      :items="data?.value"
    />
  </div>
</template>

<style scoped></style>
