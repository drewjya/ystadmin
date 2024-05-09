import { defineStore } from "pinia";
import type { SResponse } from "~/types/s-response";
import { page } from "~/types/t-table";

export type User = {
  id: number;
  name: string;
  role: string;
  email: string;
  userId: number;
  cabang?: number;
};

export type AuthResponse = {
  user: User;
  token: Token;
};

export type Token = {
  accessToken: string;
  refreshToken: string;
};
export const useApp = defineStore("GlobalAppStore", () => {
  const isActive = ref(false);
  const accessToken = useCookie<string | undefined>("access_token_ystadmin", {
    maxAge: 3600 * 12,
  });
  const refreshToken = useCookie<string | undefined>("Refresh-Cookie", {
    maxAge: 30 * 3600 * 24,
  });

  const user = ref<User>();
  const pages = ref(page);

  const path = apiPath();
  const notif = useNotification();
  const runtime = useRuntimeConfig();
  const router = useRouter();

  async function login(param: { email: string; password: string }) {
    const data: SResponse<AuthResponse> = await $fetch(path.login(), {
      baseURL: runtime.public.baseUrl,
      method: "POST",
      body: JSON.stringify(param),
    });
    if (!data.data) {
      throw data;
    }

    const result = data.data;

    refreshToken.value = result.token.refreshToken;
    accessToken.value = result.token.accessToken;
    user.value = result.user;
    if (user.value.role.toUpperCase() === "SUPERADMIN" && !user.value.cabang) {
      pages.value = page;
    } else {
      pages.value = [
        {
          title: "Home",
          link: "/",
        },
      ];
    }

    router.push("/");
  }
  async function refresh() {
    try {
      const data: SResponse<AuthResponse> = await $fetch(path.refresh(), {
        method: "GET",
        baseURL: runtime.public.baseUrl,
        headers: {
          Authorization: `Bearer ${refreshToken.value ?? "invalid_token"}`,
        },
      });

      if (!data.data) {
        throw data;
      }

      const result = data.data;

      refreshToken.value = result.token.refreshToken;
      accessToken.value = result.token.accessToken;
      user.value = result.user;
      if (
        user.value.role.toUpperCase() === "SUPERADMIN" &&
        !user.value.cabang
      ) {
        pages.value = page;
      } else {
        pages.value = [
          {
            title: "Home",
            link: "/",
          },
        ];
      }
      return true;
    } catch (error) {
      notif.error({
        message: "Refresh token failed",
      });

      return false;
    }
  }

  async function logout() {
    refreshToken.value = undefined;
    accessToken.value = undefined;
    router.push("/category");
  }

  const pageForBanner = ["/gallery", "/products"];
  return {
    isActive,
    pages,
    pageForBanner,
    accessToken,
    clickSidebar() {
      isActive.value = !isActive.value;
    },
    refreshCookieSet(val: string) {
      refreshToken.value = val;
    },
    accessTokenSet(val: string) {
      accessToken.value = val;
    },
    turnOffSidebar() {
      isActive.value = false;
    },
    login,
    user,
    refresh,
    logout,
  };
});
