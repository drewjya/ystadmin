import dayjs from "dayjs";

export function formatDateString(format: string, dateString?: string) {
  return dateString ? dayjs(new Date(dateString)).format(format) : "-";
}

export function formatPrice(price: string) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    maximumFractionDigits: 0,
    currency: "IDR",
  }).format(Number(price) ?? 0);
}
