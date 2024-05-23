export default function () {
  return {
    login() {
      return encodeURI("/auth/login");
    },
    refresh() {
      return encodeURI("/auth/refresh");
    },
    postCabang() {
      return encodeURI("/cabang");
    },
    updateCabang(cabangId: number) {
      return encodeURI(`/cabang/${cabangId}`);
    },
    getCabang() {
      return encodeURI("/cabang");
    },
    getCabangById(id: number) {
      return encodeURI(`/cabang/${id}`);
    },
    deleteCabang(id: number) {
      return encodeURI(`/cabang/${id}`);
    },
    postCategory() {
      return encodeURI("/category");
    },
    updateCategory(id: number) {
      return encodeURI("/category/" + id);
    },
    getCategory() {
      return encodeURI("/category");
    },
    deleteCategory(id: number) {
      return encodeURI(`/category/${id}`);
    },
    postTreatment() {
      return encodeURI("/treatment");
    },
    updateTreatment(id: number) {
      return encodeURI("/treatment/" + id);
    },
    getTreatment() {
      return encodeURI("/treatment");
    },
    getTreatmentDetail(id: number) {
      return encodeURI("/treatment"+`/${id}`);
    },
    deleteTreatment(id: number) {
      return encodeURI(`/treatment/${id}`);
    },
    postCabangTreatment() {
      return encodeURI("/cabang-treatment");
    },
    getCabangTreatment(id: number) {
      return encodeURI(`/cabang-treatment/${id}/treatment`);
    },
    getCabangTreatmentById(cabangId: number, treatmentId: number) {
      return encodeURI(
        `/cabang-treatment/${cabangId}/treatment/${treatmentId}`
      );
    },
    updateCabangTreatment(cabangId: number, treatmentId: number) {
      return encodeURI(
        `/cabang-treatment/${cabangId}/treatment/${treatmentId}`
      );
    },
    deleteCabangTreatment(cabangId: number, treatmentId: number) {
      return encodeURI(
        `/cabang-treatment/${cabangId}/treatment/${treatmentId}`
      );
    },
    getBanner() {
      return encodeURI("/banner");
    },
    postBanner() {
      return encodeURI("/banner");
    },
    deleteBanner(id: number) {
      return encodeURI(`/banner/${id}`);
    },

    createHappyHour(id: number) {
      return encodeURI(`/happy-hour/${id}`);
    },
    enableHappyHour(id: number) {
      return encodeURI(`/happy-hour/enable/${id}`);
    },
    disableHappyHour(id: number) {
      return encodeURI(`/happy-hour/disable/${id}`);
    },
    updateHappyHour(id: number) {
      return encodeURI(`/happy-hour/${id}`);
    },
    getHappyHour(id: number) {
      return encodeURI(`/happy-hour/${id}`);
    },

    postTherapist() {
      return encodeURI("/therapist");
    },
    getTherapist() {
      return encodeURI("/therapist");
    },
    getTherapistByCabang(id: number) {
      return encodeURI(`/therapist/cabang/${id}`);
    },
    getTherapistDetail(id: number) {
      return encodeURI(`/therapist/${id}`);
    },
    updateTherapist(id: number) {
      return encodeURI(`/therapist/${id}`);
    },
    deleteTherapist(id: number) {
      return encodeURI(`/therapist/${id}`);
    },

    addTreatmentTherapist(therapistId: number) {
      return encodeURI(`/therapist/${therapistId}/treatment`);
    },
    removeTreatmentTherapist(therapistId: number, treatmentId: number) {
      return encodeURI(
        `/therapist/${therapistId}/treatment/remove/${treatmentId}`
      );
    },
    getAbsensiTherapist(therapistId: number) {
      return encodeURI(`/therapist/${therapistId}/attendance`);
    },
    postCheckIn(therapistId: number) {
      return encodeURI(`/therapist/${therapistId}/checkin`);
    },
    postCheckOut(therapistId: number) {
      return encodeURI(`/therapist/${therapistId}/checkout`);
    },
    getRatingTherapist(therapistId: number) {
      return encodeURI(`/therapist/${therapistId}/rating`);
    },
    getHistoryOrder(status?: OrderStatus, cabangId?: number) {
      return encodeURI(
        `/order/admin${status ? `?status=${status}` : ""}${
          cabangId ? `${status ? "&" : "?"}cabangId=${cabangId}` : ""
        }`
      );
    },
    getOrderDetail(id: number) {
      return encodeURI(`/order/${id}`);
    },
    postAdminUpdateStatu(id: number) {
      return encodeURI(`/order/admin/${id}`);
    },
  };
}

export enum OrderStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  RESCHEDULE = "RESCHEDULE",
  ONGOING = "ONGOING",
  COMPLETE = "COMPLETE",
  CANCELLED = "CANCELLED",
}
