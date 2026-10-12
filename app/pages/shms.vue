<template>
  <div class="relative overflow-hidden">
    <!-- 1. SHMS HERO SECTION -->
    <section class="relative min-h-[85vh] flex items-center justify-center bg-slate-950 text-white overflow-hidden pt-24 pb-20">
      <!-- Ambient Lighting & Tech Grid Overlay -->
      <div class="absolute inset-0 z-0">
        <div class="absolute inset-0 bg-gradient-to-br from-[#121C28] via-[#1D334A] to-slate-950 opacity-90" />
        <div class="absolute top-1/4 left-1/4 w-[500px] h-[300px] bg-[#A7E629]/10 rounded-full blur-3xl pointer-events-none" />
        <div class="absolute bottom-10 right-10 w-[600px] h-[350px] bg-[#2D4E6F]/30 rounded-full blur-3xl pointer-events-none" />
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <!-- Text Column -->
          <div class="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold tracking-wider uppercase text-slate-200">
              <span class="size-2 rounded-full bg-[#A7E629] animate-pulse" />
              Infrastructure Health Telemetry
            </div>

            <h1 class="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Structure Health <br>
              <span class="text-[#A7E629]">Monitoring System (SHMS)</span>
            </h1>

            <p class="text-lg sm:text-xl text-slate-300 max-w-2xl leading-relaxed">
              A structure health monitoring (SHM) system is a system that continuously monitors structures like buildings and bridges to assess their integrity and detect damage.
            </p>

            <!-- Actions -->
            <div class="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <a
                href="#structures"
                class="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-slate-950 bg-[#A7E629] hover:bg-[#bbf33e] shadow-lg shadow-[#A7E629]/25 hover:-translate-y-0.5 transition-all duration-200"
              >
                <UIcon
                  name="i-lucide-grid"
                  class="size-5"
                />
                <span>7 Objek Infrastruktur</span>
              </a>

              <NuxtLink
                to="/#contact"
                class="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-medium text-white bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/20 transition-all duration-200"
              >
                <UIcon
                  name="i-lucide-phone-call"
                  class="size-5 text-[#A7E629]"
                />
                <span>Konsultasi Teknis</span>
              </NuxtLink>
            </div>
          </div>

          <!-- Hero Image Column (Authentic shms-title.png) -->
          <div class="lg:col-span-5 flex justify-center">
            <div class="relative group">
              <div class="absolute -inset-4 bg-gradient-to-r from-[#A7E629]/30 to-[#2D4E6F]/50 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-300" />
              <div class="relative rounded-2xl overflow-hidden border border-white/20 bg-slate-900/60 p-4 shadow-2xl backdrop-blur-sm max-w-md">
                <img
                  src="/amti/img/shms/shms-title.png"
                  alt="Structure Health Monitoring System"
                  class="w-full h-auto object-contain transform group-hover:scale-105 transition-transform duration-500"
                >
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Wave Divider -->
      <div class="absolute bottom-0 inset-x-0 z-10">
        <WebCurveDivider
          type="curve"
          fill="#ffffff"
          height="h-10 sm:h-14 md:h-16"
        />
      </div>
    </section>

    <!-- 2. SHMS WORKING PRINCIPLE (DEWESOFT STYLE PIPELINE) -->
    <section class="py-16 sm:py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span class="text-xs font-bold uppercase tracking-widest text-[#2D4E6F] block">
            Alur Kerja Sistem
          </span>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Bagaimana SHMS Melindungi Struktur Anda
          </h2>
          <p class="text-slate-600 text-sm sm:text-base">
            Integrasi sensor fisik, unit akuisisi data, dan sistem analitik otomatis untuk deteksi degradasi material sedini mungkin.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Step 1 -->
          <div class="p-8 rounded-3xl bg-slate-50 border border-slate-200/80 shadow-sm hover:shadow-lg transition-all duration-300">
            <div class="size-12 rounded-2xl bg-[#2D4E6F] text-white flex items-center justify-center font-extrabold text-lg mb-6 shadow-md">
              01
            </div>
            <h3 class="text-lg font-bold text-slate-900 mb-2">
              Sensor Deployment
            </h3>
            <p class="text-sm text-slate-600 leading-relaxed">
              Pemasangan sensor regangan (strain gauge), accelerometer, tiltmeter, sensor pergeseran, dan load cells pada titik tumpu kritis struktur.
            </p>
          </div>

          <!-- Step 2 -->
          <div class="p-8 rounded-3xl bg-slate-50 border border-slate-200/80 shadow-sm hover:shadow-lg transition-all duration-300">
            <div class="size-12 rounded-2xl bg-[#2D4E6F] text-white flex items-center justify-center font-extrabold text-lg mb-6 shadow-md">
              02
            </div>
            <h3 class="text-lg font-bold text-slate-900 mb-2">
              Continuous Telemetry
            </h3>
            <p class="text-sm text-slate-600 leading-relaxed">
              Pengumpulan data berkala berkecepatan tinggi tanpa jeda, mencatat respons beban lalu lintas, getaran angin, dan deformasi mikro.
            </p>
          </div>

          <!-- Step 3 -->
          <div class="p-8 rounded-3xl bg-slate-50 border border-slate-200/80 shadow-sm hover:shadow-lg transition-all duration-300">
            <div class="size-12 rounded-2xl bg-[#2D4E6F] text-white flex items-center justify-center font-extrabold text-lg mb-6 shadow-md">
              03
            </div>
            <h3 class="text-lg font-bold text-slate-900 mb-2">
              Diagnostic & Action Alerts
            </h3>
            <p class="text-sm text-slate-600 leading-relaxed">
              Analisis algoritma kecerdasan struktur membandingkan batas toleransi keselamatan dan memberikan rekomendasi pemeliharaan sebelum terjadi keruntuhan.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 3. 7 INFRASTRUCTURE APPLICATIONS (from shms.html) -->
    <section
      id="structures"
      class="py-20 bg-slate-50 border-t border-slate-200/70"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto mb-12">
          <span class="text-xs font-bold uppercase tracking-widest text-[#2D4E6F] block">
            Cakupan Infrastruktur
          </span>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-1">
            7 Objek Penerapan SHMS
          </h2>
          <p class="text-slate-600 text-sm sm:text-base mt-2">
            Dari jembatan bentang panjang hingga terowongan bawah tanah, SHMS memberikan kepastian integritas fisik aset jangka panjang.
          </p>

          <!-- Quick Filter Selector -->
          <div class="flex flex-wrap items-center justify-center gap-2 mt-8">
            <button
              v-for="(item, idx) in structures"
              :key="idx"
              type="button"
              class="px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200"
              :class="[
                activeStructureIndex === idx
                  ? 'bg-[#2D4E6F] text-white shadow-md shadow-[#2D4E6F]/20'
                  : 'bg-white text-slate-700 border border-slate-200/80 hover:bg-slate-100'
              ]"
              @click="activeStructureIndex = idx"
            >
              {{ item.title }}
            </button>
          </div>
        </div>

        <!-- Featured Active Structure Card -->
        <div class="bg-white rounded-3xl border border-slate-200/80 shadow-xl shadow-slate-200/50 p-6 sm:p-10 mb-16">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <!-- Left Info -->
            <div class="lg:col-span-6 space-y-4">
              <span class="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-md bg-[#2D4E6F]/10 text-[#2D4E6F] inline-block">
                Struktur 0{{ activeStructureIndex + 1 }}
              </span>

              <h3 class="text-3xl font-extrabold text-slate-900 tracking-tight">
                {{ currentStructure.title }}
              </h3>

              <div class="text-xs font-semibold text-[#2D4E6F] tracking-wide uppercase leading-relaxed">
                {{ currentStructure.tags }}
              </div>

              <p class="text-slate-600 text-sm sm:text-base leading-relaxed pt-2">
                {{ currentStructure.description }}
              </p>

              <!-- Parameter Indicators -->
              <div class="pt-4 border-t border-slate-100">
                <span class="text-xs font-bold uppercase tracking-wider text-slate-900 block mb-2">
                  Parameter Pemantauan Utama:
                </span>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="(tag, tIdx) in currentStructure.tagList"
                    :key="tIdx"
                    class="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-medium"
                  >
                    {{ tag }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Right Image -->
            <div class="lg:col-span-6">
              <div class="aspect-4/3 rounded-2xl overflow-hidden shadow-xl bg-slate-900 border border-slate-200 relative group">
                <img
                  :src="currentStructure.image"
                  :alt="currentStructure.title"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                >
                <div class="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent pointer-events-none" />
                <div class="absolute bottom-4 left-4 text-white text-xs font-bold uppercase">
                  {{ currentStructure.title }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Comprehensive 7 Cards Grid for Overview -->
        <div class="space-y-6">
          <div class="text-center">
            <h3 class="text-xl font-bold text-slate-900">
              Katalog Lengkap Seluruh Infrastruktur
            </h3>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              v-for="(item, idx) in structures"
              :key="idx"
              class="rounded-2xl p-6 bg-white border border-slate-200/80 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between cursor-pointer"
              :class="activeStructureIndex === idx ? 'ring-2 ring-[#2D4E6F]' : ''"
              @click="activeStructureIndex = idx"
            >
              <div class="space-y-3">
                <div class="aspect-16/10 rounded-xl overflow-hidden bg-slate-900 border border-slate-100">
                  <img
                    :src="item.image"
                    :alt="item.title"
                    class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  >
                </div>
                <span class="text-[11px] font-bold uppercase tracking-wider text-[#2D4E6F] block truncate">
                  {{ item.tags }}
                </span>
                <h4 class="text-lg font-bold text-slate-900">
                  {{ item.title }}
                </h4>
                <p class="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {{ item.description }}
                </p>
              </div>

              <div class="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between text-xs font-semibold text-[#2D4E6F]">
                <span>Tampilkan Detail</span>
                <UIcon
                  name="i-lucide-arrow-right"
                  class="size-4"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 4. CALL TO ACTION -->
    <WebContactCta />
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Structure Health Monitoring System (SHMS) | AMTI',
  description: 'Continuous monitoring of bridges, buildings, dams, landslides, ports, railways, and tunnels to assess structural integrity and detect wear.',
  ogTitle: 'Structure Health Monitoring System (SHMS) | AMTI',
  ogDescription: 'Real-time telemetry and stress analysis for critical infrastructure longevity and safety.'
})

interface StructureItem {
  title: string
  tags: string
  tagList: string[]
  image: string
  description: string
}

const structures: StructureItem[] = [
  {
    title: 'BRIDGES',
    tags: 'BRIDGE MONITORING | STRUCTURAL HEALTH | STRESS ANALYSIS | SAFETY ALERTS | DYNAMIC DISPLACEMENT',
    tagList: ['Bridge Monitoring', 'Structural Health', 'Stress Analysis', 'Safety Alerts', 'Dynamic Displacement'],
    image: '/amti/img/shms/bridge.webp',
    description: 'Our SHMS is designed to monitor the health of bridges in real time, providing critical insights into structural integrity and potential wear. Timely alerts enable preventive maintenance and ensure long-term safety, helping prevent catastrophic failures and prolonging infrastructure lifespan.'
  },
  {
    title: 'BUILDINGS',
    tags: 'SKYSCRAPERS | HOSPITALS | OFFICES | MALLS | RESIDENTIAL BUILDINGS',
    tagList: ['Skyscrapers', 'Hospitals', 'Offices', 'Malls', 'Residential Buildings', 'Tilt & Vibration Telemetry'],
    image: '/amti/img/shms/building.webp',
    description: 'Our SHMS monitors critical infrastructures, from skyscrapers to hospitals, offering real-time data on structural health. This enables maintenance teams to make informed decisions to prevent costly repairs and improve safety for occupants.'
  },
  {
    title: 'DAM',
    tags: 'HIGHWAY MONITORING | PAVEMENT HEALTH | WEAR ANALYSIS | LOAD STRESS | SAFETY MEASURES',
    tagList: ['Highway Monitoring', 'Pavement Health', 'Wear Analysis', 'Load Stress', 'Safety Measures'],
    image: '/amti/img/shms/dam.webp',
    description: 'SHMS provides continuous monitoring of roads and highways, assessing wear and structural performance. By detecting early signs of stress or degradation, it enables timely maintenance, preventing accidents and reducing downtime.'
  },
  {
    title: 'LANDSLIDE',
    tags: 'SLOPE STABILITY | GEOTECHNICAL SENSORS | SOIL DISPLACEMENT | RUNOFF MONITORING',
    tagList: ['Slope Stability', 'Geotechnical Sensors', 'Soil Displacement', 'Runoff Monitoring', 'Safety Alerts'],
    image: '/amti/img/shms/landslide.webp',
    description: 'SHMS provides continuous monitoring of roads and highways, assessing wear and structural performance. By detecting early signs of stress or degradation, it enables timely maintenance, preventing accidents and reducing downtime.'
  },
  {
    title: 'PORT',
    tags: 'DOCK MONITORING | GANTRY CRANE STRESS | WHARF PILES | SEAWALL INTEGRITY',
    tagList: ['Dock Monitoring', 'Gantry Crane Stress', 'Wharf Piles', 'Seawall Integrity', 'Safety Measures'],
    image: '/amti/img/shms/port.webp',
    description: 'SHMS provides continuous monitoring of roads and highways, assessing wear and structural performance. By detecting early signs of stress or degradation, it enables timely maintenance, preventing accidents and reducing downtime.'
  },
  {
    title: 'RAILWAY',
    tags: 'TRACK ALIGNMENT | SLEEPER DISPLACEMENT | EMBANKMENT STABILITY | HIGH SPEED SAFETY',
    tagList: ['Track Alignment', 'Sleeper Displacement', 'Embankment Stability', 'High Speed Safety', 'Wear Analysis'],
    image: '/amti/img/shms/railway.webp',
    description: 'SHMS provides continuous monitoring of roads and highways, assessing wear and structural performance. By detecting early signs of stress or degradation, it enables timely maintenance, preventing accidents and reducing downtime.'
  },
  {
    title: 'TUNNELS',
    tags: 'UNDERGROUND STRUCTURES | STRESS MONITORING | SAFETY ALERTS | VIBRATION ANALYSIS | RISK MANAGEMENT',
    tagList: ['Underground Structures', 'Stress Monitoring', 'Safety Alerts', 'Vibration Analysis', 'Risk Management'],
    image: '/amti/img/shms/tunnel.png',
    description: 'With SHMS, tunnel safety is greatly enhanced through real-time monitoring of structural stress and vibration. This system allows for immediate responses to potential threats, safeguarding both infrastructure and people.'
  }
]

const activeStructureIndex = ref(0)
const currentStructure = computed<StructureItem>(() => structures[activeStructureIndex.value] || structures[0]!)
</script>
