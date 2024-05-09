<script lang="ts" setup>
import { OrderStatus } from "~/composables/api-path";
import type { OrderDetail } from "~/types/s-response";
import { ColumnType } from "~/types/t-table";
const runtime = useRuntimeConfig();
definePageMeta({
  layout: "form",
});

const route = useRoute();
const orderId = Number(route.params.id) ?? -1;
const loading = ref(false);
const error = ref();
const data = ref<OrderDetail | undefined>();
const notif = useNotification();

const selectedTherapist = ref();
const therapistData = ref<
  {
    id: number;
    nama: string;
  }[]
>([]);

const onSubmit = async (status: OrderStatus) => {
  if (!selectedTherapist.value) {
    notif.error({
      message: "Pilih Therapist terlebih dahulu",
    });
    return;
  }
  try {
    const req = await usePrivateApi(apiPath().postAdminUpdateStatu(orderId), {
      method: "POST",
      body: {
        status,
        therapistId: selectedTherapist.value,
      },
    });
    if (req.status < 400) {
      notif.ok({
        message: "Berhasil",
      });
      init();
    } else {
      notif.error({
        message: `${req.error}`,
      });
    }
  } catch (error) {
    notif.error({
      message: `${error}`,
    });
  }
};

const init = async () => {
  loading.value = true;
  try {
    const req = await usePrivateApi<OrderDetail>(
      apiPath().getOrderDetail(orderId),
      {
        method: "GET",
      }
    );
    if (req.status < 400) {
      data.value = req.data;
      selectedTherapist.value = req.data?.therapistId;
    } else {
      error.value = req.error;
    }
    loading.value = false;
  } catch (er) {
    error.value = er;
    loading.value = false;
  }

  if (data.value) {
    const req = await usePrivateApi<
      {
        id: number;
        nama: string;
      }[]
    >(apiPath().getTherapistByCabang(data.value.cabangId), {
      method: "GET",
    });
    if (req.status < 400) {
      therapistData.value = req.data ?? [];
    } else {
      error.value = req.error;
    }
  }
};

onMounted(() => {
  init();
});
</script>

<template>
  <div class="flex flex-col" v-if="data">
    <p class="text-xl font-bold">{{ data?.orderId }}</p>

    <div class="grid grid-cols-3">
      <div class="col-span-2">
        <detail-item title="Cabang" :value="data.cabang" />
        <detail-item
          title="Tanggal Dibuat"
          :value="formatDateString('DD MMM YYYY, HH:mm', data.createdAt)"
        />
        <detail-item title="Status" :value="data.orderStatus" />
        <detail-item
          title="Therapist"
          :value="`${data.therapist} (${data.therapistGender})`"
        />
        <detail-item title="Tamu" :value="data.guestGender" />
        <detail-item title="Email User" :value="data.user.email" />
        <detail-item
          title="No Telepon User"
          :value="data.user.phoneNumber ?? ''"
        />
        <detail-item
          title="Total Harga"
          :value="formatPrice(`${data.totalPrice}`)"
        />
      </div>
      <div class="flex flex-col gap-4" v-if="data.picture">
        <u-button
          @click="onSubmit(OrderStatus.CONFIRMED)"
          v-if="
            data.orderStatus === OrderStatus.PENDING ||
            data.orderStatus === OrderStatus.RESCHEDULE
          "
          size="sm"
          class="px-1 py-2 h-max justify-center"
          label="Konfirmasi Order"
        />
        <u-button
          size="sm"
          @click="onSubmit(OrderStatus.CANCELLED)"
          v-if="data.orderStatus === OrderStatus.PENDING"
          class="px-1 py-2 h-max justify-center"
          label="Batalkan Order"
        />
        <u-button
          size="sm"
          @click="onSubmit(OrderStatus.RESCHEDULE)"
          v-if="data.orderStatus === OrderStatus.CONFIRMED"
          class="px-1 py-2 h-max justify-center"
          label="Reschedule Order"
        />
        <u-button
          size="sm"
          @click="onSubmit(OrderStatus.ONGOING)"
          v-if="data.orderStatus === OrderStatus.CONFIRMED"
          class="px-1 py-2 h-max justify-center"
          label="Jalankan Order"
        />
        <u-button
          @click="onSubmit(OrderStatus.COMPLETE)"
          size="sm"
          v-if="data.orderStatus === OrderStatus.ONGOING"
          class="px-1 py-2 h-max justify-center"
          label="Selesaikan Order"
        />
        <u-select-menu
          placeholder="Pilih Therapist"
          v-if="!data.therapistId"
          v-model="selectedTherapist"
          value-attribute="id"
          option-attribute="nama"
          :options="therapistData"
        ></u-select-menu>
      </div>
    </div>
    <p class="text-xl font-bold">DETAIL</p>
    <v-table
      :height-max="false"
      :columns="[
        { key: 'nama', label: 'Nama', type: ColumnType.TEXT },

        { key: 'price', label: 'Harga', type: ColumnType.CURRENCY },
      ]"
      :items="data.orderDetail"
    />

    <div>
      <p>Bukti Bayar</p>
      <img
        :src="runtime.public.imageUrl + data.picture"
        v-if="data.picture"
        alt=""
        class="h-48 rounded-md cursor-pointer"
      />
      <p v-else class="text-sm">Belum Di upload</p>
    </div>
  </div>
</template>

<style scoped></style>
