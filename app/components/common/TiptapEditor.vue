<template>
  <div class="border border-neutral-200 dark:border-neutral-800 rounded-lg overflow-hidden bg-white dark:bg-neutral-900 focus-within:ring-2 focus-within:ring-primary-500 focus-within:border-transparent transition-all">
    <!-- Toolbar -->
    <div
      v-if="editor"
      class="flex flex-wrap items-center gap-1 p-2 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950/50"
    >
      <!-- History -->
      <div class="flex items-center gap-0.5 border-r border-neutral-200 dark:border-neutral-800 pr-1.5 mr-1">
        <UButton
          size="xs"
          variant="ghost"
          color="neutral"
          icon="i-lucide-undo-2"
          :disabled="!editor.can().undo()"
          @click="editor.chain().focus().undo().run()"
        />
        <UButton
          size="xs"
          variant="ghost"
          color="neutral"
          icon="i-lucide-redo-2"
          :disabled="!editor.can().redo()"
          @click="editor.chain().focus().redo().run()"
        />
      </div>

      <!-- Headings -->
      <div class="flex items-center gap-0.5 border-r border-neutral-200 dark:border-neutral-800 pr-1.5 mr-1">
        <UButton
          size="xs"
          :variant="editor.isActive('heading', { level: 1 }) ? 'solid' : 'ghost'"
          :color="editor.isActive('heading', { level: 1 }) ? 'primary' : 'neutral'"
          icon="i-lucide-heading-1"
          @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
        />
        <UButton
          size="xs"
          :variant="editor.isActive('heading', { level: 2 }) ? 'solid' : 'ghost'"
          :color="editor.isActive('heading', { level: 2 }) ? 'primary' : 'neutral'"
          icon="i-lucide-heading-2"
          @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
        />
        <UButton
          size="xs"
          :variant="editor.isActive('heading', { level: 3 }) ? 'solid' : 'ghost'"
          :color="editor.isActive('heading', { level: 3 }) ? 'primary' : 'neutral'"
          icon="i-lucide-heading-3"
          @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
        />
      </div>

      <!-- Formatting -->
      <div class="flex items-center gap-0.5 border-r border-neutral-200 dark:border-neutral-800 pr-1.5 mr-1">
        <UButton
          size="xs"
          :variant="editor.isActive('bold') ? 'solid' : 'ghost'"
          :color="editor.isActive('bold') ? 'primary' : 'neutral'"
          icon="i-lucide-bold"
          @click="editor.chain().focus().toggleBold().run()"
        />
        <UButton
          size="xs"
          :variant="editor.isActive('italic') ? 'solid' : 'ghost'"
          :color="editor.isActive('italic') ? 'primary' : 'neutral'"
          icon="i-lucide-italic"
          @click="editor.chain().focus().toggleItalic().run()"
        />
        <UButton
          size="xs"
          :variant="editor.isActive('strike') ? 'solid' : 'ghost'"
          :color="editor.isActive('strike') ? 'primary' : 'neutral'"
          icon="i-lucide-strikethrough"
          @click="editor.chain().focus().toggleStrike().run()"
        />
        <UButton
          size="xs"
          :variant="editor.isActive('code') ? 'solid' : 'ghost'"
          :color="editor.isActive('code') ? 'primary' : 'neutral'"
          icon="i-lucide-code"
          @click="editor.chain().focus().toggleCode().run()"
        />
      </div>

      <!-- Lists -->
      <div class="flex items-center gap-0.5 border-r border-neutral-200 dark:border-neutral-800 pr-1.5 mr-1">
        <UButton
          size="xs"
          :variant="editor.isActive('bulletList') ? 'solid' : 'ghost'"
          :color="editor.isActive('bulletList') ? 'primary' : 'neutral'"
          icon="i-lucide-list"
          @click="editor.chain().focus().toggleBulletList().run()"
        />
        <UButton
          size="xs"
          :variant="editor.isActive('orderedList') ? 'solid' : 'ghost'"
          :color="editor.isActive('orderedList') ? 'primary' : 'neutral'"
          icon="i-lucide-list-ordered"
          @click="editor.chain().focus().toggleOrderedList().run()"
        />
        <UButton
          size="xs"
          :variant="editor.isActive('blockquote') ? 'solid' : 'ghost'"
          :color="editor.isActive('blockquote') ? 'primary' : 'neutral'"
          icon="i-lucide-quote"
          @click="editor.chain().focus().toggleBlockquote().run()"
        />
      </div>

      <!-- Insert Media / Link -->
      <div class="flex items-center gap-0.5 border-r border-neutral-200 dark:border-neutral-800 pr-1.5 mr-1">
        <UButton
          size="xs"
          :variant="editor.isActive('link') ? 'solid' : 'ghost'"
          :color="editor.isActive('link') ? 'primary' : 'neutral'"
          icon="i-lucide-link"
          @click="setLink"
        />
        <UButton
          v-if="editor.isActive('link')"
          size="xs"
          variant="ghost"
          color="neutral"
          icon="i-lucide-unlink"
          @click="editor.chain().focus().unsetLink().run()"
        />
        <UButton
          size="xs"
          variant="ghost"
          color="neutral"
          icon="i-lucide-image"
          @click="addImage"
        />
        <UButton
          size="xs"
          variant="ghost"
          color="neutral"
          icon="i-lucide-minus"
          @click="editor.chain().focus().setHorizontalRule().run()"
        />
      </div>

      <!-- Clear Formatting -->
      <UButton
        size="xs"
        variant="ghost"
        color="neutral"
        icon="i-lucide-remove-formatting"
        @click="editor.chain().focus().clearNodes().unsetAllMarks().run()"
      />
    </div>

    <!-- Editor Content Area -->
    <EditorContent
      :editor="editor"
      class="tiptap-content p-4 min-h-[320px] max-h-[600px] overflow-y-auto outline-none focus:outline-none"
    />
  </div>
</template>

<script setup lang="ts">
import { useEditor, EditorContent, type Extensions } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import Placeholder from '@tiptap/extension-placeholder'

const props = withDefaults(
  defineProps<{
    modelValue?: string
    placeholder?: string
  }>(),
  {
    modelValue: '',
    placeholder: 'Start writing your article content...'
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const editor = useEditor({
  content: props.modelValue,
  extensions: [
    StarterKit.configure({
      heading: {
        levels: [1, 2, 3]
      }
    }),
    Link.configure({
      openOnClick: false,
      HTMLAttributes: {
        class: 'text-primary-600 underline font-medium'
      }
    }),
    Image.configure({
      HTMLAttributes: {
        class: 'rounded-lg max-w-full my-4'
      }
    }),
    Placeholder.configure({
      placeholder: props.placeholder
    })
  ] as unknown as Extensions,
  editorProps: {
    attributes: {
      class: 'prose dark:prose-invert max-w-none focus:outline-none'
    }
  },
  onUpdate: () => {
    emit('update:modelValue', editor.value?.getHTML() || '')
  }
})

// Watch modelValue from outside (e.g. when data is loaded from API)
watch(
  () => props.modelValue,
  (newValue) => {
    const isSame = editor.value?.getHTML() === newValue
    if (!isSame && editor.value) {
      editor.value.commands.setContent(newValue || '', { emitUpdate: false })
    }
  }
)

onBeforeUnmount(() => {
  editor.value?.destroy()
})

const setLink = () => {
  const previousUrl = editor.value?.getAttributes('link').href
  const url = window.prompt('Enter URL:', previousUrl)

  // cancelled
  if (url === null) {
    return
  }

  // empty
  if (url === '') {
    editor.value?.chain().focus().extendMarkRange('link').unsetLink().run()
    return
  }

  // update link
  editor.value?.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
}

const addImage = () => {
  const url = window.prompt('Enter image URL:')
  if (url) {
    editor.value?.chain().focus().insertContent({ type: 'image', attrs: { src: url } }).run()
  }
}
</script>

<style>
/* Tiptap Typography styles */
.tiptap-content .ProseMirror {
  outline: none;
  min-height: 280px;
}

.tiptap-content .ProseMirror p.is-editor-empty:first-child::before {
  content: attr(data-placeholder);
  float: left;
  color: #9ca3af;
  pointer-events: none;
  height: 0;
}

.tiptap-content .ProseMirror h1 {
  font-size: 1.875rem;
  font-weight: 700;
  line-height: 2.25rem;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
}

.tiptap-content .ProseMirror h2 {
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 2rem;
  margin-top: 0.75rem;
  margin-bottom: 0.5rem;
}

.tiptap-content .ProseMirror h3 {
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.75rem;
  margin-top: 0.5rem;
  margin-bottom: 0.25rem;
}

.tiptap-content .ProseMirror p {
  margin-bottom: 0.75rem;
  line-height: 1.625;
}

.tiptap-content .ProseMirror ul {
  list-style-type: disc;
  padding-left: 1.5rem;
  margin-bottom: 0.75rem;
}

.tiptap-content .ProseMirror ol {
  list-style-type: decimal;
  padding-left: 1.5rem;
  margin-bottom: 0.75rem;
}

.tiptap-content .ProseMirror blockquote {
  border-left: 4px solid var(--color-primary-500, #3b82f6);
  padding-left: 1rem;
  font-style: italic;
  margin: 1rem 0;
  color: #6b7280;
}

.tiptap-content .ProseMirror code {
  background-color: rgba(156, 163, 175, 0.2);
  padding: 0.2rem 0.4rem;
  border-radius: 0.25rem;
  font-size: 0.875em;
  font-family: monospace;
}

.tiptap-content .ProseMirror hr {
  border: none;
  border-top: 1px solid #e5e7eb;
  margin: 1.5rem 0;
}
</style>
