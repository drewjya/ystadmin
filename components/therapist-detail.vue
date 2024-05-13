<script lang="ts" setup>
import type { TretmentData } from "~/types/s-response";

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

const apiUrl = apiPath();
const treatment = ref<TretmentData[]>([]);
const notify = useNotification();

const props = defineProps({
  therapistId: {
    type: Number,
    required: true,
  },
  canAction: {
    type: Boolean,
    default: false,
  },
  to: {
    type: String,
    required: false,
  },
});

onMounted(() => {
  initState();
});
const initState = async () => {
  therapistDetail.value = undefined;
  treatment.value = [];
  const res = await usePrivateApi<TherapistDetail>(
    apiUrl.getTherapistDetail(props.therapistId),
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
    treatment.value = json.data
      ?.filter(
        (i) =>
          !therapistDetail.value?.therapistTreatment
            .map((j) => j.id)
            .includes(i.id)
      )
      .map((e) => {
        return {
          ...e,
          nama: `${e.nama} (${e.category.nama})`,
        };
      });
    true;
  }
};
const router = useRouter();

const selectedTreatment = ref();

const addTreatment = async () => {
  if (!selectedTreatment.value) {
    notify.error({
      message: "Treatment Harus Dipilih",
    });
    return;
  }

  const res = await usePrivateApi<TherapistDetail>(
    apiUrl.addTreatmentTherapist(props.therapistId),
    {
      method: "POST",
      body: JSON.stringify({
        treatmentId: selectedTreatment.value,
      }),
    }
  );
  if (res.status < 400) {
    notify.ok({
      message: "Treatment Berhasil Ditambahkan",
    });
    initState();
  } else {
    notify.error({
      message: "Gagal Menambahkan Treatment",
    });
  }
};

const removeTreatment = async (treatmentId: number) => {
  const res = await usePrivateApi<TherapistDetail>(
    apiUrl.removeTreatmentTherapist(props.therapistId, treatmentId),
    {
      method: "POST",
    }
  );
  if (res.status < 400) {
    notify.ok({
      message: "Treatment Berhasil Dihapus",
    });
    initState();
  } else {
    notify.error({
      message: "Gagal Menghapus Treatment",
    });
  }
};

const checkIn = async () => {
  const res = await usePrivateApi<TherapistDetail>(
    apiUrl.postCheckIn(props.therapistId),
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
    apiUrl.postCheckOut(props.therapistId),
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
    <nuxt-link
      :to="props.to"
      class="bg-yellow-200 px-2 py-1 rounded-xl w-max hover:bg-orange-500"
      >Absensi Detail</nuxt-link
    >
    <p>Rating {{ therapistDetail.rating }}</p>
    <div class="flex gap-5 w-full" v-if="props.canAction">
      <u-select-menu
        placeholder="Tambah Treatment"
        v-if="treatment"
        v-model="selectedTreatment"
        class="w-full"
        value-attribute="id"
        option-attribute="nama"
        searchable
        searchable-placeholder="Cari Treatment"
        :options="treatment"
      ></u-select-menu>
      <u-button
        label="Kirim"
        class="bg-gray-800 text-white"
        size="xs"
        @click="addTreatment"
      />
    </div>

    <div class="grid grid-cols-2 text-sm gap-2 mt-4">
      <div
        v-for="i in therapistDetail.therapistTreatment"
        class="bg-gray-500 rounded-lg p-2 flex justify-between items-center"
      >
        <div>{{ i.nama }} ({{ i.category.nama }})</div>
        <u-button
          v-if="props.canAction"
          icon="i-heroicons-x-mark-16-solid"
          class="bg-gray-800 text-white"
          size="xs"
          @click="() => removeTreatment(i.id)"
        />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
