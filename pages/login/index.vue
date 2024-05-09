<script lang="ts" setup>
import z from "zod";

const app = useApp();
const path = apiPath();

const formD = useFormd({
  schema: z.object({
    email: z
      .string({
        required_error: "Email is required",
        invalid_type_error: "Email must be a string",
      })
      .email({
        message: "Please enter a valid email",
      })
      .trim(),
    password: z
      .string({
        required_error: "Password is required",
        invalid_type_error: "Password must be a string",
      })
      .min(6)
      .trim(),
  }),
  onSubmit: async (event, d) => {
    app.login({
      email: event.data.email,
      password: event.data.password,
    });
  },
  onError: async (ev, d) => {},
});

definePageMeta({
  layout: "auth",
});
</script>

<template>
  <v-form :form="formD" class="flex flex-col gap-3">
    <u-form-group label="Email" name="email">
      <u-input v-model="formD.state.email" />
    </u-form-group>
    <u-form-group label="Password" name="password">
      <u-input v-model="formD.state.password" type="password" />
    </u-form-group>
    <u-button
      label="Submit"
      type="button"
      class="justify-center"
      @click="formD.submit.value"
    />
  </v-form>
</template>

<style scoped></style>
