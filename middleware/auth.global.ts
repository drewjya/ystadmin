export default defineNuxtRouteMiddleware(async (to, from) => {
  const auth = useApp();
  const router = useRouter();
  const excludeRoutes = ["/login"];
  const routeIsPublic = excludeRoutes.includes(to.path);
  if (routeIsPublic) return;
  const superAdminRoute = [
    "/banner",
    "/cabang",
    "/treatment",
    "/category",
    "/therapist",
    "/order",
  ];
  const isSuccess = await auth.refresh();
  console.log(to.path, "MIDDLEWARE");

  console.log(auth.user, "MIDDLEWARE SUCCESS");

  if (!isSuccess) {
    return navigateTo("/login");
  }
  const superAdminRouteRegex = new RegExp(`^(${superAdminRoute.join("|")})`);

  function startsWithSuperAdminRouteRegex(str: string) {
    return superAdminRouteRegex.test(str);
  }

  const path = to.path;
  if (auth.user?.role === "SUPERADMIN") {
    if (!startsWithSuperAdminRouteRegex(path)) {
      return navigateTo("/banner");
    }
  } else {
    if (startsWithSuperAdminRouteRegex(path)) {
      return navigateTo("/");
    }
  }

  return;
});
