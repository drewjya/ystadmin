<script lang="ts" setup>
import { z } from "zod";

definePageMeta({
  layout: "form",
});
const route = useRoute();

const init = async () => {
  const res = await usePrivateApi<{
    publicHoliday: boolean;
    happyHourDetail: {
      startDay: number;
      endDay: number;
      startHour: string;
      endHour: string;
    }[];
  }>(apiPath().getHappyHour(Number(route.params.id)), {
    method: "GET",
  });
  if (res.status < 400 && res.data) {
    formD.state.publicHoliday = res.data.publicHoliday;
    formD.state.happyHourDetail = res.data.happyHourDetail.map((item) => ({
      id: `${new Date().toLocaleString()}`,
      startDay: item.startDay,
      endDay: item.endDay,
      startHour: extractHourMinutesDate(item.startHour),
      endHour: extractHourMinutesDate(item.endHour),
    }));
  }
};

onMounted(() => {
  init();
});

const formD = useFormd({
  schema: z.object({
    publicHoliday: z.boolean().default(false),
    happyHourDetail: z
      .array(
        z.object({
          id: z.string(),
          startDay: z.number().default(1),
          endDay: z.number().default(1),
          startHour: z.object({
            hours: z.number(),
            minutes: z.number(),
            seconds: z.number(),
          }),
          endHour: z.object({
            hours: z.number(),
            minutes: z.number(),
            seconds: z.number(),
          }),
        })
      )
      .min(1),
  }),
  onSubmit: async (ev, d) => {
    const cabangId = Number(route.params.id) ?? -1;
    const data = ev.data;
    const res = await usePrivateApi(apiPath().updateHappyHour(cabangId), {
      method: "PUT",
      body: {
        publicHoliday: data.publicHoliday == true,
        happyHourDetail: data.happyHourDetail.map((item) => ({
          startDay: item.startDay,
          endDay: item.endDay,
          startHour: toStringHour(item.startHour),
          endHour: toStringHour(item.endHour),
        })),
      },
    });

    useRouter().go(-1);
  },
  onError: async (ev, d) => {
    console.log(ev);
  },
  initial: {
    happyHourDetail: [
      {
        id: "Inital",
        startDay: 1,
        endDay: 1,
        startHour: {
          hours: 8,
          minutes: 0,
          id: z.string(),
          seconds: 0,
        },
        endHour: {
          hours: 22,
          minutes: 0,
          seconds: 0,
        },
      },
    ],
  },
});

const hari = [
  {
    id: 1,
    name: "Senin",
  },
  {
    id: 2,
    name: "Selasa",
  },
  {
    id: 3,
    name: "Rabu",
  },
  {
    id: 4,
    name: "Kamis",
  },
  {
    id: 5,
    name: "Jumat",
  },
  {
    id: 6,
    name: "Sabtu",
  },
  {
    id: 7,
    name: "Minggu",
  },
];
</script>

<template>
  <v-form :form="formD" class="flex flex-col gap-2">
    <UCheckbox label="Tanggal Merah" v-model="formD.state.publicHoliday" />

    <u-form-group label="Detail Happy Hour">
      <div
        class="flex gap-5 items-center"
        v-for="(item, index) in formD.state.happyHourDetail"
        :key="index"
      >
        <u-form-group label="Dari">
          <div class="flex flex-col gap-2">
            <USelectMenu
              v-model="formD.state.happyHourDetail[index].startDay"
              :options="hari"
              value-attribute="id"
              option-attribute="name"
              placeholder="Pilih Hari"
            />
            <time-picker
              v-model="formD.state.happyHourDetail[index].startHour"
              :key="`${JSON.stringify(
                formD.state.happyHourDetail[index].startHour
              )}_open_hour`"
            />
          </div>
        </u-form-group>
        <u-form-group label="Sampai">
          <div class="flex flex-col gap-2">
            <USelectMenu
              v-model="formD.state.happyHourDetail[index].endDay"
              :options="hari"
              value-attribute="id"
              option-attribute="name"
              placeholder="Pilih Hari"
            />
            <time-picker
              v-model="formD.state.happyHourDetail[index].endHour"
              :key="`${JSON.stringify(
                formD.state.happyHourDetail[index].endHour
              )}_end_hour`"
            />
          </div>
        </u-form-group>
        <u-button
          label="Kurangi"
          class="h-max"
          @click="
            () => {
              const old = formD.state.happyHourDetail.filter(
                (curr, i) => curr.id !== item.id
              );
              formD.state.happyHourDetail = [];
              formD.state.happyHourDetail = old;
            }
          "
        />
      </div>
      <u-button
        @click="
          formD.state.happyHourDetail.push({
            id: `${new Date().toLocaleString()}`,
            endDay: 1,
            startDay: 1,
            startHour: {
              hours: 8,
              minutes: 0,
              seconds: 0,
            },
            endHour: {
              hours: 22,
              minutes: 0,
              seconds: 0,
            },
          })
        "
        >Tambah</u-button
      >
    </u-form-group>
    <u-button
      label="Kirim"
      class="w-[50%] justify-center"
      @click="formD.submit.value"
    />
  </v-form>
</template>

<style scoped></style>
