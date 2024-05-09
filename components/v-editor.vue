<script lang="ts" setup>
import Underline from "@tiptap/extension-underline";

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);
const edit = ref();

watch(
  () => props.modelValue,
  (value) => {
    edit.value = value;
    editor?.value?.commands?.setContent(value);
  }
);

const editor = useEditor({
  extensions: [TiptapStarterKit, Underline],
  injectCSS: true,
  content: props.modelValue,
  onBlur: (editor) => {
    emit("update:modelValue", editor.editor.getHTML());
  },
});
</script>

<template>
  <div
    class="flex flex-col gap-4"
    v-on:click.ctrl="
      (e) => {
        console.log(e);
      }
    "
  >
    <div v-if="editor" class="flex gap-2">
      <UTooltip text="Bold" :shortcuts="['Ctrl', 'B']">
        <UButton
          @click="editor.chain().focus().toggleBold().run()"
          :disabled="!editor.can().chain().focus().toggleBold().run()"
          :class="{ 'is-active': editor.isActive('bold') }"
          square
          solid
          icon="i-material-symbols-format-bold"
          size="sm"
          color="primary"
          dynamic
          class="font-extrabold w-8 h-8 flex justify-center"
        />
      </UTooltip>
      <UTooltip text="Italic" :shortcuts="['Ctrl', 'I']">
        <UButton
          @click="editor.chain().focus().toggleItalic().run()"
          :disabled="!editor.can().chain().focus().toggleItalic().run()"
          :class="{ 'is-active': editor.isActive('italic') }"
          square
          solid
          icon="i-ph-text-italic"
          class="italic w-8 h-8 flex justify-center"
        />
      </UTooltip>
      <UTooltip text="Underline" :shortcuts="['Ctrl', 'U']">
        <UButton
          @click="editor.chain().focus().toggleItalic().run()"
          :disabled="!editor.can().chain().focus().toggleUnderline().run()"
          :class="{ 'is-active': editor.isActive('underline') }"
          square
          solid
          icon="i-ph-text-underline"
          class="italic w-8 h-8 flex justify-center"
        />
      </UTooltip>
      <UTooltip text="Line Through" :shortcuts="['Ctrl', 'Shift', 'X']">
        <UButton
          @click="editor.chain().focus().toggleStrike().run()"
          square
          solid
          icon="i-ic-baseline-format-strikethrough"
          class="w-8 h-8 flex justify-center"
        />
      </UTooltip>
      <UTooltip text="Remove Format">
        <UButton
          @click="editor.chain().focus().unsetAllMarks().run()"
          square
          solid
          icon="i-material-symbols-light-format-clear"
          class="w-8 h-8 flex justify-center"
        />
      </UTooltip>
      <UTooltip text="Separator">
        <UButton
          @click="editor.chain().focus().setHorizontalRule().run()"
          square
          solid
          icon="i-material-symbols-horizontal-rule"
          class="line-through w-8 h-8 flex justify-center"
        />
      </UTooltip>
      <UTooltip text="New Line" :shortcuts="['Ctrl', 'Enter']">
        <UButton
          @click="editor.chain().focus().setHardBreak().run()"
          square
          solid
          icon="i-ooui-newline-ltr"
          class="line-through w-8 h-8 flex justify-center"
        />
      </UTooltip>
      <UTooltip text="Undo" :shortcuts="['Ctrl', 'Z']">
        <UButton
          @click="editor.chain().focus().undo().run()"
          square
          solid
          icon="i-material-symbols-undo"
          class="line-through w-8 h-8 flex justify-center"
        />
      </UTooltip>
      <UTooltip text="Redo" :shortcuts="['Ctrl', 'Shift', 'Z']">
        <UButton
          @click="editor.chain().focus().redo().run()"
          square
          solid
          icon="i-material-symbols-redo"
          class="line-through w-8 h-8 flex justify-center"
        />
      </UTooltip>
    </div>
    <TiptapEditorContent
      v-model="edit"
      :editor="editor"
      class="border focus:border-gray-500 editor-field bg-gray-50 p-2 rounded active:ring-0"
    />
  </div>
</template>

<style scoped>
div {
  box-shadow: none !important;
}
.editor-field::v-deep(.ProseMirror) {
  outline: none;
}

.is-active {
  background-color: red !important;
}
</style>
