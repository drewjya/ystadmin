<script lang="ts" setup>
import { z } from "zod";
import type { CategoryProduct, TretmentData } from "~/types/s-response";

definePageMeta({
  layout: "form",
});

const runtime = useRuntimeConfig();
const app = useApp();

const path = apiPath();
const apiUrl = apiPath();
const cabangs = ref<CategoryProduct[]>([]);
const notify = useNotification();
const route = useRoute();
const treatmentId = Number(route.params.id) ?? -1;
const treatmentUrl = computed(() => apiPath().getTreatmentDetail(treatmentId));
onMounted(() => {
  initState();
});
const initState = async () => {
  const json = await usePrivateApi<CategoryProduct[]>(
    runtime.public.baseUrl + apiUrl.getCategory(),
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${app.accessToken ?? "invalid_token"}`,
      },
    }
  );

  console.log(json);
  if (json.status < 400) {
    if (!json.data) {
      notify.info({
        message:
          "Cabang Tidak Ditemukan, Silahkan Tambahkan Cabang Terlebih Dahulu",
      });
      return;
    }
    cabangs.value = json.data;
  }
  const treatmentDetail = await usePrivateApi<TretmentData>(
    runtime.public.baseUrl + treatmentUrl.value,
    {
      method: "GET",
      
    }
  );
  console.log(treatmentDetail);
  if (treatmentDetail.status < 400) {
    if (!treatmentDetail.data) {
      notify.info({
        message:
          "Treatment Tidak Ditemukan",
      });
      router.go(-1);
      return;
    }
    formD.state.nama = treatmentDetail.data.nama;
    formD.state.durasi = treatmentDetail.data.durasi;
    formD.state.categoryId = treatmentDetail.data.category.id
    
  }
};
const router = useRouter();
const formD = useFormd({
  schema: z.object({
    nama: z
      .string({
        required_error: "Nama is required",
        invalid_type_error: "Nama must be a string",
      })
      .trim(),
    categoryId: z
      .number({
        required_error: "Cabang is required",
        invalid_type_error: "Cabang must be a number",
      })
      .int(),
    durasi: z
      .number({
        required_error: "Durasi is required",
        invalid_type_error: "Nama must be a string",
      })
      .int(),
  }),

  onSubmit: async (event, d) => {
    const data = await usePrivateApi(
      runtime.public.baseUrl + path.updateTreatment(treatmentId),
      {
        method: "PUT",
        body: event.data,
      }
    );
    if (data.status < 400) {
      notify.ok({
        message: "Therapist Berhasil",
      });
      router.go(-1);
    }
  },
  onError: async (event, d) => {
    console.log(event);
  },
});
</script>

<template>
  <v-form :form="formD" class="flex flex-col gap-4">
    <u-form-group label="Name" name="nama">
      <UInput v-model="formD.state.nama" />
    </u-form-group>
    <u-form-group label="Durasi" name="durasi">
      <UInput v-model.number="formD.state.durasi" />
    </u-form-group>

    <u-form-group label="Category" name="categoryId">
      <u-select-menu
        v-model="formD.state.categoryId"
        value-attribute="value"
        option-attribute="label"
        :options="
          cabangs.map((e) => ({
            label: e.nama,
            value: e.id,
          }))
        "
      ></u-select-menu>
    </u-form-group>

    <u-button
      @click="formD.submit.value"
      type="button"
      class="dark:bg-blue-600 bg-blue-900 text-white p-2 rounded hover:bg-blue-600 dark:hover:bg-blue-900 flex justify-center items-center text-base font-bold dark:text-white"
      >Submit</u-button
    >
  </v-form>
</template>

<style scoped></style>
