<template>
  <div class="space-y-6">
    <Header
      :title="$t('pages.article.editTitle')"
      :description="$t('pages.article.editDescription')"
    />

    <ContentArticleForm :article-id="articleId" />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'dashboard'
})

const route = useRoute()
const articleId = Number(route.params.id)
</script>
