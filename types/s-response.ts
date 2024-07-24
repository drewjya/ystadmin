export type SResponse<T> = {
  status: number;
  messages: Object;
  data: T | undefined;
  error: Object;
};

export type CategoryProduct = {
  id: number;
  nama: string;
};


export type TagsData = {
  id: number;
  name: string;
};



export type TretmentData = {
  id: number;
  nama: string;
  durasi: number;
  category: {
    id: number;
    nama: string;
    optional: boolean;
    happyHourPrice: boolean;
  };
};

export type TherapistData = {
  id: number;
  no: string;
  nama: string;
  gender: string;
  attendance?: {
    checkIn?: string;
    checkOut?: string;
  };
  cabang?: {
    id: number;
    nama: string;
    optional: boolean;
    happyHourPrice: boolean;
  };
};

export type OrderData = {
  id: number;
  orderId: string;
  totalPrice: number;
  orderStatus: string;
  createdAt: string;
  orderTime: string;
  cabang: CategoryProduct;
  picture?: {
    path: string;
  };
};

export type Cabang = {
  id: number;
  alamat: string;
  closeHour: string;
  nama: string;
  openHour: string;
  phoneNumber: string;
  picture?: string;
  admin?: {
    id: number;
    email: string;
    name: string;
    phoneNumber: string;
  };
  happyHour: {
    happyHourDetail: HappyHourDetail[];
    publicHoliday: boolean;
  };
};

export type HappyHourDetail = {
  id: number;
  startDay: number;
  endDay: number;
  startHour: string;
  endHour: string;
  happyHourId: number;
};

export type OrderDetail = {
  orderId: string;
  id: number;
  orderTime: string;
  therapistId?: number;
  orderStatus: string;
  guestGender: string;
  therapistGender: string;
  therapist?: string;
  cabang: string;
  cabangId: number;
  durasi: number;
  user: {
    name: string;
    email: string;
    id: number;
    phoneNumber?: string;
    gender: string;
  };
  createdAt: string;
  confirmationTime?: string;
  orderDetail: {
    duration: number;
    nama: string;
    price: number;
  }[];
  totalPrice: number;
  picture?: string;
};

export type CabangTreatment = {
  price: number;
  happyHourPrice?: number;
  treatment: {
    id: number;
    durasi: number;
    nama: string;
    category: {
      id: number;
      nama: string;
      optional: boolean;
      happyHourPrice: boolean;
    };
  };
  nama: string;
};
