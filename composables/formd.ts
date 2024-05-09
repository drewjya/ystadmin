import type { UnwrapNestedRefs } from "vue";
import type { z, ZodType } from "zod";
import type { FormSubmitEvent, UFormApi } from "~/types/form";
import type { SResponse } from "~/types/s-response";

type FormInitialValue<T extends ZodType<any, any, any>> = Partial<{
  [k in keyof z.output<T>]: any;
}>;

export function useFormd<T extends z.ZodRawShape>(arg: {
  schema: z.ZodObject<T>;

  onSubmit: (
    formSubmitEvent: FormSubmitEvent<z.output<typeof arg.schema>>,
    formElementApi: Ref<UFormApi | undefined>
  ) => Promise<void>;

  onError?: (
    error: any,
    formElementApi: Ref<UFormApi | undefined>
  ) => Promise<void>;

  initial?: FormInitialValue<typeof arg.schema>;
}) {
  const notif = useNotification();
  const clientSubmitWrapperFunction = ref<() => void>();
  const isLoading = ref(false);
  const state = reactive(initialStates(arg.schema, arg.initial));
  const error = ref<string>();
  const formRef = ref<UFormApi>();

  function initialStates(schema: z.AnyZodObject, defaults?: any) {
    const initialState = {} as any;
    for (const key in schema.shape) {
      initialState[key] = undefined;
      if (defaults) initialState[key] = defaults[key];
    }
    return initialState;
  }

  async function submitEvent(
    formSubmitEvent: FormSubmitEvent<z.output<typeof arg.schema>>
  ) {
    isLoading.value = true;
    error.value = undefined;
    try {
      await arg.onSubmit(formSubmitEvent, formRef);
    } catch (e) {
      const response = e as SResponse<any>;

      // notify(response);
      error.value = mapError(formRef, response);

      if (error.value) {
        notify(response, error.value);
      }
      if (arg.onError) await arg.onError(error, formRef);
    }
    isLoading.value = false;
  }

  function reset() {
    const states = Object.entries(state);
    for (const [name] of states) {
      state[name] = undefined;
      if (arg.initial && arg.initial[name]) state[name] = arg.initial[name];
    }
  }

  function notify(response: SResponse<any>, message?: string) {
    if (message && response.status) {
      if (response.status >= 400 && response.status <= 499)
        notif.warn({ message: message });
      else if (response.status >= 500 && response.status <= 599)
        notif.error({ message: message });
      else if (response.status >= 200 && response.status <= 299)
        notif.ok({ message: message });
    }
  }

  function mapError(
    formApi: Ref<UFormApi | undefined>,
    response: SResponse<any>
  ) {
    let rootErrorMessage: string | undefined;

    if (response.status >= 400 && response.status <= 500 && response.messages) {
      const errorEntries = Object.entries(response.messages);

      formApi.value?.setErrors(
        errorEntries
          .filter(([key, validationCode]) => {
            if (key === "@root") rootErrorMessage = validationCode;
            return key !== "@root";
          })
          .map(([key, validationCode]) => {
            return {
              path: key,
              message: validationCode,
            };
          })
      );
      return rootErrorMessage;
    }
  }

  return {
    state: state as UnwrapNestedRefs<z.infer<typeof arg.schema>>,
    isLoading: isLoading as Ref<boolean>,
    schema: arg.schema,
    submitEvent,
    error,
    ref: formRef,
    reset,
    submit: clientSubmitWrapperFunction,
  };
}
