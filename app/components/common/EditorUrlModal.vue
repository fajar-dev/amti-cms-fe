<template>
  <UModal
    v-model:open="open"
    :title="isLink ? $t('components.editorUrlModal.linkTitle') : $t('components.editorUrlModal.imageTitle')"
    :description="isLink ? $t('components.editorUrlModal.linkDescription') : $t('components.editorUrlModal.imageDescription')"
    :ui="{
      content: 'sm:max-w-md',
      overlay: 'bg-black/40',
      footer: 'justify-end'
    }"
  >
    <template #body>
      <UForm
        id="editor-url-form"
        :schema="schema"
        :state="form"
        class="space-y-3"
        @submit="handleSubmit"
      >
        <UFormField
          :label="isLink ? $t('components.editorUrlModal.linkLabel') : $t('components.editorUrlModal.imageLabel')"
          name="url"
        >
          <UInput
            v-model="form.url"
            type="url"
            class="w-full"
            :placeholder="$t('components.editorUrlModal.placeholder')"
          />
        </UFormField>
      </UForm>
    </template>

    <template #footer>
      <div class="flex justify-end items-center gap-2 w-full">
        <UButton
          :label="$t('common.cancel')"
          color="neutral"
          variant="soft"
          @click="() => { open = false }"
        />
        <UButton
          type="submit"
          form="editor-url-form"
          color="primary"
        >
          {{ isLink ? $t('components.editorUrlModal.applyLink') : $t('components.editorUrlModal.insertImage') }}
        </UButton>
      </div>
    </template>
  </UModal>
</template>

<script setup lang="ts">
import { z } from 'zod'

/**
 * Modal input URL untuk editor: menggantikan `window.prompt` yang tidak bisa
 * memakai i18n dan tanpa validasi.
 *
 * URL boleh dikosongkan pada mode link — artinya tautan dilepas.
 */
const props = withDefaults(defineProps<{
  mode: 'link' | 'image'
  initialUrl?: string
}>(), {
  initialUrl: ''
})

const open = defineModel<boolean>({ default: false })
const emit = defineEmits<{ submit: [url: string] }>()

const { t } = useI18n()

const isLink = computed(() => props.mode === 'link')

const form = reactive({ url: props.initialUrl })

const schema = computed(() => z.object({
  url: z.string()
    .trim()
    .refine(
      value => value === '' || /^(https?:\/\/|\/)\S+$/i.test(value),
      t('components.editorUrlModal.invalidUrl')
    )
}))

watch(open, (isOpen) => {
  if (isOpen) form.url = props.initialUrl
})

function handleSubmit() {
  emit('submit', form.url.trim())
  open.value = false
}
</script>
