<template>
  <div class="space-y-6">
    <Header
      :title="$t('pages.article.createTitle')"
      :description="$t('pages.article.createDescription')"
    />

    <ContentArticleForm />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'dashboard'
})
</script>
