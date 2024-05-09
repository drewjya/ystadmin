<script lang="ts" setup>
import type { TretmentData } from "~/types/s-response";

definePageMeta({
  layout: "form",
});

type TherapistDetail = {
  id: number;
  nama: string;
  gender: string;
  attendance?: {
    checkIn?: string;
    checkOut?: string;
  };
  rating: number;
  therapistTreatment: TretmentData[];
};
const therapistDetail = ref<TherapistDetail | undefined>();
const route = useRoute();
const therapistId = Number(route.params.id) ?? -1;
const apiUrl = apiPath();
const treatment = ref<TretmentData[]>([]);
const notify = useNotification();

onMounted(() => {
  initState();
});
const initState = async () => {
  therapistDetail.value = undefined;
  treatment.value = [];
  const res = await usePrivateApi<TherapistDetail>(
    apiUrl.getTherapistDetail(therapistId),
    {
      method: "GET",
    }
  );
  console.log(res);
  if (res.status < 400) {
    if (!res.data) {
      notify.info({
        message:
          "Therapist Tidak Ditemukan, Silahkan Tambahkan Cabang Terlebih Dahulu",
      });
      return;
    }

    therapistDetail.value = res.data;
  }
};

const checkIn = async () => {
  const res = await usePrivateApi<TherapistDetail>(
    apiUrl.postCheckIn(therapistId),
    {
      method: "POST",
    }
  );
  if (res.status < 400) {
    notify.ok({
      message: "Check In Berhasil",
    });
    initState();
  } else {
    notify.error({
      message: "Gagal Check In",
    });
  }
};

const checkOut = async () => {
  const res = await usePrivateApi<TherapistDetail>(
    apiUrl.postCheckOut(therapistId),
    {
      method: "POST",
    }
  );
  if (res.status < 400) {
    notify.ok({
      message: "Check Out Berhasil",
    });
    initState();
  } else {
    notify.error({
      message: "Gagal Check Out",
    });
  }
};
</script>

<template>
  <u-button label="Reload" @click="() => initState()" />
  <div v-if="therapistDetail" class="flex flex-col gap-1">
    <p>{{ therapistDetail.nama }}</p>
    <p>{{ therapistDetail.gender }}</p>
    <div class="grid grid-cols-2">
      <p>
        Check In :
        {{
          formatDateString(
            "DD MMM YYYY,  HH:mm",
            therapistDetail.attendance?.checkIn
          )
        }}
      </p>
      <p>
        Check Out :
        {{
          formatDateString(
            "DD MMM YYYY,  HH:mm",
            therapistDetail.attendance?.checkOut
          )
        }}
      </p>
      <u-button
        label="Check In"
        v-if="!therapistDetail.attendance?.checkIn"
        @click="checkIn"
      />
      <u-button
        label="Check Out"
        v-if="
          therapistDetail.attendance?.checkIn &&
          !therapistDetail.attendance?.checkOut
        "
        @click="checkOut"
      />
    </div>
    <p>Rating {{ therapistDetail.rating }}</p>

    <div class="grid grid-cols-2 text-sm gap-2 mt-4">
      <div
        v-for="i in therapistDetail.therapistTreatment"
        class="bg-gray-500 rounded-lg p-2 flex justify-between items-center"
      >
        <div>{{ i.nama }} ({{ i.category.nama }})</div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
