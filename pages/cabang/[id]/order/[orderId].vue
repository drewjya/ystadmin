<script lang="ts" setup>
import type { OrderData, SResponse } from "~/types/s-response";
import { OrderStatus } from "~/composables/api-path";
import { ColumnType } from "~/types/t-table";

const runtime = useRuntimeConfig();

const app = useApp();

const status = ref<OrderStatus | undefined>();
const url = computed(() => apiPath().getHistoryOrder(status.value));
const { data, error, refresh, pending } = await useFetch(url, {
  baseURL: runtime.public.baseUrl,
  headers: {
    Authorization: `Bearer ${app.accessToken ?? "invalid_token"}`,
  },
  transform: (data: SResponse<OrderData[]>) => {
    return {
      value: (data.data ?? []).map((item) => {
        return {
          ...item,
          cabang: item.cabang ?? {},
          picture: item.picture
            ? runtime.public.imageUrl + item.picture.path
            : null,
        };
      }),
    };
  },
});
</script>

<template>
  <div class="flex flex-col gap-2">
    <u-form-group label="Pilih Order Status">
      <div class="flex gap-2">
        <u-select-menu
          v-model="status"
          :options="OrderStatus"
          class="grow"
          placeholder="Order Status"
        ></u-select-menu>
        <u-button @click="status = undefined">Reset</u-button>
        <u-button
          @click="refresh"
          icon="i-heroicons-arrow-path"
          class="bg-green-900"
        ></u-button>
      </div>
    </u-form-group>
    <v-table
      :to="(item) => `/order/${item.id}`"
      :loading="pending"
      :columns="[
        {
          key: 'orderId',
          label: 'ID',
          type: ColumnType.TEXT,
        },
        {
          key: 'totalPrice',
          label: 'Harga',
          type: ColumnType.CURRENCY,
        },
        {
          key: 'orderStatus',
          label: 'OrderStatus',
          type: ColumnType.TEXT,
        },
        {
          key: 'orderTime',
          label: 'Waktu Order',
          type: ColumnType.DATE,
        },
        {
          key: 'cabang',
          label: 'Cabang',
          type: ColumnType.OBJECTMAP,
          toString: (item) => item.nama,
        },
        {
          key: 'picture',
          label: 'Bukti Bayar',
          type: ColumnType.IMAGE,
        },

        {
          key: 'createdAt',
          label: 'Dibuat',
          type: ColumnType.DATE,
        },
      ]"
      :items="data?.value"
    />
  </div>
</template>

<style scoped></style>
