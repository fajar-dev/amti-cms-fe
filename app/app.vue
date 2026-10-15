<template>
  <UApp
    :locale="uiLocale"
    :toaster="{ position: 'top-right', progress: false }"
  >
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <Lightbox />
  </UApp>
</template>

<script setup lang="ts">
import { en, id } from '@nuxt/ui/locale'

const { locale } = useI18n()

const uiLocale = computed(() => (locale.value === 'id' ? id : en))

useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ],
  htmlAttrs: {
    lang: locale.value
  }
})

const title = 'Content Management System'
const description = 'Content Management System platform'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description
})
</script>
