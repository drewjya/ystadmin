<script lang="ts" setup>
import { z } from "zod";
import type { CabangTreatment, TretmentData } from "~/types/s-response";

definePageMeta({
  layout: "form",
});
const id = useRoute().params.id;

const treatment = ref<
  {
    id: number;
    nama: string;
    category: {
      id: number;
      nama: string;
      optional: boolean;
      happyHourPrice: boolean;
    };
  }[]
>();
const route = useRoute();
const therapistId = Number(route.params.id) ?? -1;

const apiUrl = apiPath();
const url = computed(() => apiUrl.getCabangTreatment(Number(id) ?? 0));
const notify = useNotification();

const router = useRouter();
onMounted(() => {
  initState();
});
const initState = async () => {
  const req = await usePrivateApi<CabangTreatment[]>(url.value, {
    method: "GET",
  });
  let treatmentCabang: CabangTreatment[] = [];
  if (req.status === 200) {
    treatmentCabang = req.data ?? [];
  }
  const json = await usePrivateApi<TretmentData[]>(apiUrl.getTreatment(), {
    method: "GET",
  });

  console.log(json);
  if (json.status < 400) {
    if (!json.data) {
      notify.info({
        message:
          "Cabang Tidak Ditemukan, Silahkan Tambahkan Cabang Terlebih Dahulu",
      });
      return;
    }
    if (json.data.length === treatmentCabang.length) {
      notify.info({
        message: "Semua Treatment Sudah Ditambahkan",
      });
      router.go(-1);
      return;
    }
    console.log(json.data?.length, treatmentCabang.length);

    treatment.value = json.data
      .filter((e) => {
        return !treatmentCabang.map((e) => e.treatment.id).includes(e.id);
      })
      .map((e) => {
        return {
          id: e.id,
          nama: (e.nama ?? "") + ` (${e.category.nama})`,
          category: e.category,
        };
      });
  }
};

const selectedTreatment = computed(() => {
  return treatment.value?.find((i) => i.id === formD.state.treatmentId);
});
const formD = useFormd({
  onSubmit: async (ev, d) => {
    const res = await usePrivateApi(apiUrl.postCabangTreatment(), {
      method: "POST",
      body: ev.data,
    });
    if (res.status < 400) {
      notify.ok({
        message: "Treatment Berhasil Ditambahkan",
      });
      router.go(-1);
    }
  },
  onError: async (ev, d) => {},
  schema: z.object({
    cabangId: z.number(),
    treatmentId: z.number(),
    harga: z.number(),
    happyHourPrice: z.number(),
  }),
  initial: {
    cabangId: Number(id) ?? -1,
    happyHourPrice: 0,
  },
});
</script>

<template>
  <v-form :form="formD" class="flex flex-col gap-2">
    <UFormGroup label="Treatment" name="treatmentId" v-if="treatment">
      <u-select-menu
        placeholder="Tambah Treatment"
        v-if="treatment"
        v-model="formD.state.treatmentId"
        class="w-full"
        value-attribute="id"
        option-attribute="nama"
        searchable
        searchable-placeholder="Cari Treatment"
        :options="treatment"
      ></u-select-menu>
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
