<script lang="ts" setup>
import { z } from "zod";
definePageMeta({
  layout: "form",
});

const path = apiPath();
const notify = useNotification();
const router = useRouter();

const formD = useFormd({
  schema: z.object({
    name: z
      .string({
        required_error: "Nama is required",
        invalid_type_error: "Nama must be a string",
      })
      .trim(),
    optional: z.boolean({
      required_error: "Optional is required",
      invalid_type_error: "Optional must be a boolean",
    }),
    happyHourPrice: z.boolean({
      required_error: "Happy Hour Price is required",
      invalid_type_error: "Happy Hour Price must be a boolean",
    }),
  }),
  initial: {
    happyHourPrice: false,
    optional: false,
  },

  onSubmit: async (event, d) => {
    const data = await usePrivateApi(path.postCategory(), {
      method: "POST",
      body: event.data,
    });
    if (data.status < 400) {
      notify.ok({
        message: "Category Berhasil",
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
    <u-form-group label="Opsional" name="optional">
      <u-checkbox v-model="formD.state.optional" label="Bisa opsional?" />
    </u-form-group>
    <u-form-group label="Happy Hour" name="happyHourPrice">
      <u-checkbox
        v-model="formD.state.happyHourPrice"
        label="Punya happy hour?"
      />
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
