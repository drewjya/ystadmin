<script lang="ts" setup>
import { ColumnType, type Column } from "../types/t-table";

const props = defineProps({
  columns: {
    type: Array<Column>,
    required: true,
  },
  items: {
    type: Object as PropType<any[]>,
    required: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  error: {
    type: String,
    required: false,
  },
  onEdit: {
    type: Function as PropType<(item: any) => void>,
    required: false,
  },
  onDelete: {
    type: Function as PropType<(item: any) => void>,
    required: false,
  },
  to: {
    type: Function as PropType<(item: any) => string>,
    required: false,
  },
  heightMax: {
    type: Boolean,
    default: true,
  },
});
const columnLength = computed(() => props.columns.length);
const getItem = (val: any, key: string) => {
  return val[key];
};
</script>

<template>
  <div
    class="w-full overflow-x-auto border dark:border-gray-400 overflow-y-auto max-height"
  >
    <div class="w-full">
      <div class="grid-row">
        <div
          v-for="(column, index) in columns"
          class="dark:bg-slate-900 text-black dark:text-white py-2 text-center border dark:border-gray-400 bg-slate-300"
        >
          {{ column.label }}
        </div>
      </div>

      <div v-if="!loading && error === undefined">
        <div v-for="(item, count) in items" class="grid-row">
          <nuxt-link
            :to="to ? to(item) : undefined"
            v-for="(column, index) in columns.filter(
              (col) => col.type !== ColumnType.ACTION
            )"
            class="dark:bg-slate-700 text-black dark:text-white py-2 text-center border dark:border-gray-400"
          >
            <img
              v-if="
                column.type === ColumnType.IMAGE && getItem(item, column.key)
              "
              :src="getItem(item, column.key)"
              class="h-40"
            />
            <p v-else-if="column.type === ColumnType.IMAGE">Belum Diupload</p>
            <p v-else-if="column.type === ColumnType.COUNT">{{ count + 1 }}</p>
            <p v-else-if="column.type === ColumnType.CURRENCY">
              {{ formatPrice(getItem(item, column.key)) }}
            </p>
            <p v-else-if="column.type === ColumnType.ARRAY">
              {{ getItem(item, column.key) }}
            </p>
            <p v-else-if="column.type === ColumnType.OBJECTMAP">
              {{ column.toString!(getItem(item, column.key)) }}
            </p>
            <p v-else-if="column.type === ColumnType.DATE">
              {{
                getItem(item, column.key)
                  ? formatDateString(
                      "DD MMM YYYY,  HH:mm",
                      getItem(item, column.key)
                    )
                  : "-"
              }}
            </p>
            <p v-else>{{ getItem(item, column.key) ?? "-" }}</p>
          </nuxt-link>
          <div
            v-if="columns.map((e) => e.type).includes(ColumnType.ACTION)"
            class="dark:bg-slate-700 text-black dark:text-white py-2 text-center border dark:border-gray-400"
          >
            <p class="flex justify-center gap-5">
              <u-button
                v-if="onEdit"
                @click="onEdit(item)"
                icon="i-heroicons-pencil-square"
                class="!bg-green-600"
              />

              <u-button
                icon="i-heroicons-trash-solid"
                class="!bg-red-500"
                v-if="onDelete"
                @click="onDelete(item)"
              />
            </p>
          </div>
        </div>
      </div>
      <div
        v-if="loading"
        class="h-52 grid place-items-center border dark:border-gray-400"
      >
        <div>Loading...</div>
      </div>
      <div
        v-if="error"
        class="h-52 grid place-items-center border dark:border-gray-400"
      >
        <div>{{ error }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.max-height {
  max-height: 65vh;
}
.grid-row {
  display: grid;

  grid-template-columns: repeat(
    v-bind(columnLength),
    minmax(200px, 1fr)
  ); /* Adjust minmax values as needed */
}
::-webkit-scrollbar {
  height: 5px;
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
