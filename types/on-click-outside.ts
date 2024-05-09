import type { ConfigurableWindow, MaybeElementRef } from "@vueuse/core"

export interface OnClickOutsideOptions extends ConfigurableWindow {
    /**
     * List of elements that should not trigger the event.
     */
    ignore?: (MaybeElementRef | string)[]
    /**
     * Use capturing phase for internal event listener.
     * @default true
     */
    capture?: boolean
    /**
     * Run handler function if focus moves to an iframe.
     * @default false
     */
    detectIframe?: boolean
  }
  export type OnClickOutsideHandler<
    T extends {
      detectIframe: OnClickOutsideOptions["detectIframe"]
    } = {
      detectIframe: false
    },
  > = (
    evt: T["detectIframe"] extends true
      ? PointerEvent | FocusEvent
      : PointerEvent,
  ) => void
  /**
   * Listen for clicks outside of an element.
   *
   * @see https://vueuse.org/onClickOutside
   * @param target
   * @param handler
   * @param options
   */
  export declare function onClickOutside<T extends OnClickOutsideOptions>(
    target: MaybeElementRef,
    handler: OnClickOutsideHandler<{
      detectIframe: T["detectIframe"]
    }>,
    options?: T,
  ): () => void