<script lang="ts" setup>
import { z } from "zod";

definePageMeta({
  layout: "form",
});
const runtime = useRuntimeConfig();
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
    file: z
      .custom<File>((val) => val instanceof File, "Please upload a file")
      .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
        message: "Please choose image format files only",
      }),
  }),

  onSubmit: async (event, d) => {
    const formData = new FormData();
    formData.append("file", event.data.file);
    const data = await fetch(runtime.public.baseUrl + apiPath().postBanner(), {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${app.accessToken ?? "invalid_token"}`,
      },
    });
    router.go(-1);
  },
  onError: async (event, d) => {},
});
const formMulti = useFormd({
  schema: z.object({
    images: z.array(
      z.object({
        file: z
          .custom<File>((val) => val instanceof File, "Please upload a file")
          .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
            message: "Please choose image format files only",
          }),
      })
    ),
  }),
  initial: {
    images: [],
  },
  onSubmit: async (event, d) => {
    for (const iterator of event.data.images) {
      const formData = new FormData();
      formData.append("file", iterator.file);
      const data = await fetch(
        runtime.public.baseUrl + apiPath().postBanner(),
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${app.accessToken ?? "invalid_token"}`,
          },
        }
      );
    }
    router.go(-1);
  },
  onError: async (event, d) => {},
});

const url = ref();
const urls = ref(<string[]>[]);

const app = useApp();
const pageSelected = ref();
const uploadImage = (e: FileList) => {
  if (e.length === 0) return;

  formD.state.file = e[0];
  url.value = URL.createObjectURL(e[0]);
};
const uploadImages = (e: FileList) => {
  if (e.length === 0) return;

  formMulti.state.images[formMulti.state.images.length] = {
    file: e[0],
  };
  urls.value = [...urls.value, URL.createObjectURL(e[0])];
};

const isMultiple = ref(false);

const removeImage = (index: number) => {
  formMulti.state.images.splice(index, 1);
  urls.value.splice(index, 1);
};
</script>

<template>
  <UCheckbox
    label="Multiple"
    help="Please check this box"
    v-model="isMultiple"
  />

  <v-form :form="formD" class="flex flex-col gap-4" v-if="!isMultiple">
    <u-form-group label="Image" name="file">
      <img
        v-if="url"
        :src="url"
        alt="image"
        class="h-auto w-[40%] mb-2 rounded-md border"
      />

      <UInput type="file" @change="uploadImage" />
    </u-form-group>

    <u-button
      @click="formD.submit.value"
      type="button"
      class="dark:bg-blue-600 bg-blue-900 text-white p-2 rounded hover:bg-blue-600 dark:hover:bg-blue-900 flex justify-center items-center text-base font-bold dark:text-white"
      >Submit</u-button
    >
  </v-form>
  <v-form :form="formMulti" class="flex flex-col gap-4" v-else>
    <u-form-group label="Images" name="images">
      <div class="flex w-full overflow-auto">
        <button v-for="(url, index) in urls" @click="removeImage(index)">
          <img :src="url" alt="image" class="w-[40%] mb-2 rounded-md border" />
        </button>
      </div>

      <UInput type="file" @change="uploadImages" />
    </u-form-group>
    <u-button
      @click="formMulti.submit.value"
      type="button"
      class="dark:bg-blue-600 bg-blue-900 text-white p-2 rounded hover:bg-blue-600 dark:hover:bg-blue-900 flex justify-center items-center text-base font-bold dark:text-white"
      >Submit</u-button
    >
  </v-form>
</template>

<style scoped></style>
