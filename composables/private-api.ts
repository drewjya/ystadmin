import type { SResponse } from "~/types/s-response";
export async function usePrivateApi<T>(
  url: string,
  param: {
    method: "GET" | "POST" | "PUT" | "DELETE";
    body?: any;
    headers?: Record<string, string>;
  }
) {
  const runtime = useRuntimeConfig();
  const app = useApp();
  try {
    const data: SResponse<T> = await $fetch(url, {
      baseURL: runtime.public.baseUrl,
      method: param.method,
      body: param.body,
      headers: param.headers ?? {
        Authorization: `Bearer ${app.accessToken ?? "invalid"}`,
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
}
