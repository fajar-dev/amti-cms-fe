<template>
  <div class="space-y-4 max-w-3xl mx-auto">
    <div
      v-for="(item, idx) in faqItems"
      :key="idx"
      class="rounded-2xl border transition-all duration-200 overflow-hidden"
      :class="[
        openIndex === idx
          ? 'bg-white border-[#2D4E6F]/30 shadow-lg shadow-slate-200/60 ring-1 ring-[#2D4E6F]/10'
          : 'bg-white/80 border-slate-200/80 hover:border-slate-300 hover:bg-white'
      ]"
    >
      <button
        type="button"
        class="w-full px-6 py-5 text-left flex items-center justify-between gap-4 focus:outline-none"
        :aria-expanded="openIndex === idx"
        @click="toggle(idx)"
      >
        <span class="text-base sm:text-lg font-semibold text-slate-900 leading-snug">
          {{ item.question }}
        </span>
        <div
          class="size-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-200"
          :class="[
            openIndex === idx
              ? 'bg-[#2D4E6F] text-white rotate-180'
              : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
          ]"
        >
          <UIcon
            name="i-lucide-chevron-down"
            class="size-4.5"
          />
        </div>
      </button>

      <transition
        enter-active-class="transition-all duration-200 ease-out"
        enter-from-class="max-h-0 opacity-0"
        enter-to-class="max-h-96 opacity-100"
        leave-active-class="transition-all duration-150 ease-in"
        leave-from-class="max-h-96 opacity-100"
        leave-to-class="max-h-0 opacity-0"
      >
        <div
          v-if="openIndex === idx"
          class="px-6 pb-6 pt-1 text-slate-600 text-sm sm:text-base leading-relaxed border-t border-slate-100"
        >
          {{ item.answer }}
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
const openIndex = ref<number | null>(0)

const toggle = (idx: number) => {
  openIndex.value = openIndex.value === idx ? null : idx
}

const faqItems = [
  {
    question: 'What is Asset Monitoring?',
    answer: 'Asset monitoring refers to the use of technology to continuously track and manage assets in real-time to ensure their proper functioning and timely maintenance.'
  },
  {
    question: 'How does the monitoring system work?',
    answer: 'The monitoring system uses sensors and data collection tools to gather information about asset conditions. This data is then transmitted to a central system where it is analyzed and used to trigger alerts or maintenance actions.'
  },
  {
    question: 'What are the benefits of asset monitoring?',
    answer: 'Asset monitoring provides real-time insights into asset performance, helps in early detection of potential issues, reduces maintenance costs, and enhances the overall efficiency and lifespan of assets.'
  },
  {
    question: 'Can the system be customized for specific needs?',
    answer: 'Yes, our asset monitoring solutions can be customized to meet specific requirements and adapt to various types of assets and industries. We work with you to tailor the system according to your needs.'
  },
  {
    question: 'What kind of support is available?',
    answer: 'We offer comprehensive support including technical assistance, training, and maintenance services to ensure that your monitoring system operates smoothly and effectively.'
  }
]
</script>
