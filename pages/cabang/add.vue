<script lang="ts" setup>
import "@vuepic/vue-datepicker/dist/main.css";
import { z } from "zod";
definePageMeta({
  layout: "form",
});
const app = useApp();
const runtime = useRuntimeConfig();
const route = useRoute();

const cabangId = Number(route.params.cabangId) ?? -1;

const extractHourMinutesDate = (param: string) => {
  const val = param.split(":");
  console.log(val, "VAL");

  if (val.length !== 3) {
    return {
      hours: 9,
      minutes: 0,
      seconds: 0,
    };
  } else {
    console.log(
      {
        hours: parseInt(val[0]),
        minutes: parseInt(val[1]),
        seconds: parseInt(val[2]),
      },
      "VAL"
    );

    return {
      hours: parseInt(val[0]),
      minutes: parseInt(val[1]),
      seconds: parseInt(val[2]),
    };
  }
};

const toStringHour = (param: {
  hours: number;
  minutes: number;
  seconds: number;
}) => {
  function convert(params: number) {
    return params < 10 ? `0${params}` : params;
  }
  return `${convert(param.hours)}:${convert(param.minutes)}:${convert(
    param.seconds
  )}`;
};

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
const router = useRouter();

const formD = useFormd({
  schema: z.object({
    name: z.string(),
    phoneNumber: z.string(),
    openHour: z.object({
      hours: z.number(),
      minutes: z.number(),
      seconds: z.number(),
    }),
    closeHour: z.object({
      hours: z.number(),
      minutes: z.number(),
      seconds: z.number(),
    }),
    alamat: z.string(),
    file: z
      .custom<File>((val) => val instanceof File, "Please upload a file")
      .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
        message: "Please choose .json format files only",
      }),
  }),
  onSubmit: async (event, d) => {
    const formData = new FormData();
    formData.append("file", event.data.file);
    formData.append("name", event.data.name);
    formData.append("phoneNumber", event.data.phoneNumber);
    formData.append("openHour", toStringHour(event.data.openHour));
    formData.append("closeHour", toStringHour(event.data.closeHour));
    formData.append("alamat", event.data.alamat);

    const data = await usePrivateApi(
      runtime.public.baseUrl + apiPath().postCabang(),
      {
        method: "POST",
        body: formData,
      }
    );
    router.go(-1);
    console.log(data);
  },
  onError: async (event, d) => {},
  initial: {
    closeHour: {
      hours: 9,
      minutes: 0,
      seconds: 0,
    },
    openHour: {
      hours: 9,
      minutes: 0,
      seconds: 0,
    },
  },
});

const url = ref();
const preview = ref(false);

const pageSelected = ref();
const uploadImage = (e: FileList) => {
  if (e.length === 0) return;

  formD.state.file = e[0];
  url.value = URL.createObjectURL(e[0]);
};
const isLoading = ref(false);
</script>

<template>
  <UModal
    v-model="isLoading"
    prevent-close
    :ui="{
      background: 'bg-transparent',
      shadow: 'shadow-none',
      overlay: {
        background: 'bg-gray-100/10',
      },
    }"
  >
    <div>
      <p>Loading</p>
    </div>
  </UModal>
  <v-form :form="formD" class="flex flex-col gap-4">
    <u-form-group label="Name" name="name">
      <u-input v-model="formD.state.name" />
    </u-form-group>
    <u-form-group label="Open Hour" name="openHour">
      <time-picker
        v-model="formD.state.openHour"
        :key="`${JSON.stringify(formD.state.openHour)}_open_hour`"
      />
    </u-form-group>
    <u-form-group label="Close Hour" name="closeHour">
      <time-picker
        v-model="formD.state.closeHour"
        :key="`${JSON.stringify(formD.state.closeHour)}_close_hour`"
      />
    </u-form-group>
    <u-form-group label="Alamat" name="alamat">
      <u-input v-model="formD.state.alamat" />
    </u-form-group>
    <u-form-group label="No Telepon" name="phoneNumber">
      <u-input v-model="formD.state.phoneNumber" />
    </u-form-group>
    <u-form-group label="Image" name="file">
      <button v-if="url" @click="preview = !preview" type="button">
        <img
          :src="url"
          alt="image"
          class="h-auto w-[40%] mb-2 rounded-md border"
        />
      </button>
      <UInput type="file" @change="uploadImage" />
    </u-form-group>
    <u-button
      @click="formD.submit.value"
      type="button"
      class="dark:bg-blue-600 bg-blue-900 text-white p-2 rounded hover:bg-blue-600 dark:hover:bg-blue-900 flex justify-center items-center text-base font-bold dark:text-white"
      >Submit</u-button
    >
  </v-form>
  <u-modal v-model="preview">
    <img :src="url" alt="image" class="h-auto w-full mb-4 rounded-md" />
  </u-modal>
</template>

<style scoped></style>
