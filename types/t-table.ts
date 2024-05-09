export enum ColumnType {
  TEXT = "text",
  NUMBER = "number",
  CURRENCY = "currency",
  DATE = "date",
  IMAGE = "image",
  ARRAY = "array",
  ACTION = "action",
  OBJECTMAP = "objectmap",
  COUNT = "count",
}

export type Column = {
  key: string;
  label: string;
  type: ColumnType;
  toString?: (value: any) => string;
};

export const page: {
  title: string;
  link: string;
}[] = [
  {
    title: "Banner",
    link: "/banner",
  },
  {
    title: "Cabang",
    link: "/cabang",
  },
  {
    title: "Category",
    link: "/category",
  },
  {
    title: "Treatment",
    link: "/treatment",
  },

  {
    link: "/therapist",
    title: "Therapist",
  },
  {
    link: "/order",
    title: "Order",
  },
];
