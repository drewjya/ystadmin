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

export const toStringHour = (param: {
  hours: number;
  minutes: number;
  seconds: number;
}) => {
  function convert(params: number) {
    return params < 10 ? `0${params}` : params;
  }
  return `${convert(param.hours)}:${convert(param.minutes)}:${convert(
    param.seconds
  )}`;
};

export const extractHourMinutesDate = (param: string) => {
  const val = param.split(":");
  console.log(val, "VAL");

  if (val.length !== 3) {
    return {
      hours: 9,
      minutes: 0,
      seconds: 0,
    };
  } else {
    console.log(
      {
        hours: parseInt(val[0]),
        minutes: parseInt(val[1]),
        seconds: parseInt(val[2]),
      },
      "VAL"
    );

    return {
      hours: parseInt(val[0]),
      minutes: parseInt(val[1]),
      seconds: parseInt(val[2]),
    };
  }
};
