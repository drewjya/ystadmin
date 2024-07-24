<script lang="ts" setup>
const emit = defineEmits<{
  failed: [];
  success: [];
}>();

const api = usePrivateApi;
const file = ref<File | null>();
const notif = useNotification();
const submit = async () => {
  const formData = new FormData();
  console.log(file.value);

  if (file.value === undefined || file.value === null) {
    notif.error({
      message: "Harap upload gambar",
    });
    return;
  }
  formData.append("file", file.value);

  try {
    const data = await api(apiPath().uploadTherapistSkillTags(), {
      method: "POST",
      body: formData,
    });
    emit("success");
  } catch (error) {
    emit("failed");
  }
};

const onChange = (e: FileList) => {
  if (e.length === 0) {
    file.value = null;
    return;
  }

  file.value = e.item(0);
};
</script>

<template>
  <UModal>
    <UCard>
      <div class="space-y-2">
        <h1>Upload Therapist Data (.xlsx)</h1>
        <UInput
          class="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#462722] file:text-[#ffe195] hover:file:bg-[#6e5450] border rounded-md"
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          type="file"
          @change="onChange"
        />

        <UButton @click="submit">Submit</UButton>
      </div>
    </UCard>
  </UModal>
</template>

<style scoped></style>
