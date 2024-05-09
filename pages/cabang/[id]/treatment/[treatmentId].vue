<script lang="ts" setup>
import { z } from "zod";

definePageMeta({
  layout: "form",
});
const id = useRoute().params.id;
const treatmentId = useRoute().params.treatmentId;

const apiUrl = apiPath();

const notify = useNotification();

const router = useRouter();
onMounted(() => {
  initState();
});
const selectedTreatment = ref();
const initState = async () => {
  const treatmentDetail = await usePrivateApi<{
    happyHourPrice: number;
    price: number;
    treatment: {
      id: number;
      nama: string;
      category: {
        happyHourPrice: boolean;
        id: number;
        nama: string;
      };
    };
  }>(
    apiPath().getCabangTreatmentById(Number(id) ?? 0, Number(treatmentId) ?? 0),
    {
      method: "GET",
    }
  );
  if (treatmentDetail.status < 400) {
    selectedTreatment.value = treatmentDetail.data?.treatment;

    formD.state.harga = treatmentDetail.data?.price ?? 0;
    formD.state.happyHourPrice = treatmentDetail.data?.happyHourPrice ?? 0;
  }
};

const formD = useFormd({
  onSubmit: async (ev, d) => {
    const res = await usePrivateApi(
      apiUrl.updateCabangTreatment(Number(id) ?? 0, Number(treatmentId) ?? 0),
      {
        method: "PUT",
        body: {
          harga: ev.data.harga,
          happyHourPrice: ev.data.happyHourPrice,
        },
      }
    );
    if (res.status < 400) {
      notify.ok({
        message: "Treatment Berhasil Ditambahkan",
      });
      router.go(-1);
    }
  },
  onError: async (ev, d) => {},
  schema: z.object({
    harga: z.number(),
    happyHourPrice: z.number(),
  }),
  initial: {
    happyHourPrice: 0,
  },
});
</script>

<template>
  <v-form :form="formD" class="flex flex-col gap-2">
    <UFormGroup label="Treatment">
      <p v-if="selectedTreatment">
        {{ selectedTreatment.nama }} ({{ selectedTreatment.category.nama }})
      </p>
    </UFormGroup>
    <UFormGroup label="Harga" name="harga">
      <u-input v-model.number="formD.state.harga" type="number" />
    </UFormGroup>
    <UFormGroup
      label="Harga Happy Hour"
      name="happyHourPrice"
      v-if="selectedTreatment && selectedTreatment.category.happyHourPrice"
    >
      <u-input v-model.number="formD.state.happyHourPrice" type="number" />
    </UFormGroup>
    <UButton @click="formD.submit.value">Submit</UButton>
  </v-form>
</template>

<style scoped></style>
