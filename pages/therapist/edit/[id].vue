<script lang="ts" setup>
import { z } from "zod";
import type { Cabang } from "~/types/s-response";

definePageMeta({
  layout: "form",
});

const runtime = useRuntimeConfig();
const app = useApp();
const route = useRoute();
const therapistId = Number(route.params.id) ?? -1;

const path = apiPath();
const apiUrl = apiPath();
const cabangs = ref<Cabang[]>([]);
const notify = useNotification();
onMounted(() => {
  initState();
});
const initState = async () => {
  const res = await usePrivateApi<{
    id: number;
    nama: string;
  }>(apiUrl.getTherapistDetail(therapistId), {
    method: "GET",
  });
  console.log(res);
  if (res.status < 400) {
    if (!res.data) {
      notify.info({
        message:
          "Therapist Tidak Ditemukan, Silahkan Tambahkan Cabang Terlebih Dahulu",
      });
      return;
    }
    formD.state.name = res.data.nama;

    console.log(res.data);
  }

  const json = await usePrivateApi<Cabang[]>(apiUrl.getCabang(), {
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
    cabangs.value = json.data;
  }
};
const router = useRouter();
const formD = useFormd({
  schema: z.object({
    name: z
      .string({
        required_error: "Nama is required",
        invalid_type_error: "Nama must be a string",
      })
      .trim(),
    cabangId: z
      .number({
        required_error: "Cabang is required",
        invalid_type_error: "Cabang must be a number",
      })
      .int(),
  }),

  onSubmit: async (event, d) => {
    const data = await usePrivateApi(
      runtime.public.baseUrl + path.updateTherapist(therapistId),
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
    <u-form-group label="Name" name="name">
      <UInput v-model="formD.state.name" />
    </u-form-group>

    <u-form-group label="Cabang" name="cabangId">
      <u-select-menu
        v-model="formD.state.cabangId"
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
