<script lang="ts" setup>
import type { CabangTreatment } from "~/types/s-response";
import { ColumnType } from "~/types/t-table";

definePageMeta({
  layout: "form",
});

const id = useApp().user?.cabang;
const url = computed(() => apiPath().getCabangTreatment(id ?? 0));
const data = ref<CabangTreatment[] | undefined>();
const initState = async () => {
  const req = await usePrivateApi<CabangTreatment[]>(url.value, {
    method: "GET",
  });
  if (req.status === 200) {
    data.value = req.data?.map((item) => {
      return {
        ...item,
        nama: item.treatment.nama + ` (${item.treatment.nama})`,
        happyHourPrice: item.treatment.category.happyHourPrice
          ? item.happyHourPrice
          : undefined,
      };
    });
  }
};

const onDelete = async (treatmentId: number) => {
  const res = await usePrivateApi(
    apiPath().deleteCabangTreatment(Number(id) ?? 0, treatmentId),
    {
      method: "DELETE",
    }
  );
  if (res.status < 400) {
    initState();
  }
};
onMounted(() => {
  initState();
});
</script>

<template>
  <!-- :on-delete="(item) => onDelete(item.treatment.id)"
  :on-edit="
    (item) => $router.push(`/detail/treatment/${item.treatment.id}`)
  " -->
  <div class="flex flex-col gap-2">
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
          key: 'price',
          label: 'Harga',
          type: ColumnType.NUMBER,
        },
        {
          key: 'happyHourPrice',
          label: 'Harga Happy Hour',
          type: ColumnType.NUMBER,
        },
      ]"
      :items="data"
    />
  </div>
</template>

<style scoped></style>
