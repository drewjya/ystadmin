<script lang="ts" setup>
import { ColumnType } from "~/types/t-table";

const props = defineProps({
  therapistId: {
    type: Number,
    required: true,
  },
});

const data = ref<
  {
    checkIn: string;
    checkOut: string;
  }[]
>([]);

const initState = async () => {
  console.log("Therapist ID: ", props.therapistId);

  // Fetch data from API
  const response = await usePrivateApi<
    {
      checkIn: string;
      checkOut: string;
    }[]
  >(apiPath().getAbsensiTherapist(props.therapistId), {
    method: "GET",
  });
  if (response.data) {
    data.value = response.data;
  }
};

onMounted(() => {
  initState();
});
</script>

<template>
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
</template>

<style scoped></style>
