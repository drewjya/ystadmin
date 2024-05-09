export const useBreakpoints = () => {
  let windowWidth = ref();

  const onWidthChange = () => (windowWidth.value = window.innerWidth);
  onMounted(() => window.addEventListener("resize", onWidthChange));
  onUnmounted(() => window.removeEventListener("resize", onWidthChange));

  const type = computed(() => {
    if (windowWidth.value === undefined) return "uf";
    if (windowWidth.value < 550) return "xs";
    if (windowWidth.value >= 550 && windowWidth.value < 1200) return "md";
    else return "lg"; // Fires when windowWidth.value >= 1200
  });

  const width = computed(() => windowWidth.value ?? 0);

  return { width, type };
};
