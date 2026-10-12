<template>
  <div class="relative overflow-hidden bg-slate-950">
    <!-- 1. SHMS HERO SECTION -->
    <section class="relative min-h-[85vh] flex items-center justify-center bg-slate-950 text-white overflow-hidden pt-28 pb-20">
      <!-- Ambient Lighting & Blueprint Grid -->
      <div class="absolute inset-0 z-0">
        <div class="absolute inset-0 bg-tech-grid opacity-30 pointer-events-none" />
        <div class="absolute inset-0 bg-gradient-to-br from-[#121C28] via-[#1D334A]/80 to-slate-950 opacity-95" />
        <div class="absolute top-1/4 left-1/4 w-[500px] h-[300px] bg-[#A7E629]/15 rounded-full blur-3xl pointer-events-none" />
        <div class="absolute bottom-10 right-10 w-[600px] h-[350px] bg-[#2D4E6F]/40 rounded-full blur-3xl pointer-events-none" />
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <!-- Text Column -->
          <div class="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div class="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 text-xs font-semibold tracking-wider uppercase text-slate-200 backdrop-blur-md shadow-lg">
              <span class="size-2 rounded-full bg-[#A7E629] animate-ping" />
              <span>Infrastructure Health Telemetry</span>
              <span class="text-slate-500">|</span>
              <span class="text-cyan-400 font-mono">REAL-TIME DIAGNOSTICS</span>
            </div>

            <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
              Structure Health <br>
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#A7E629] via-emerald-300 to-cyan-400">
                Monitoring System (SHMS)
              </span>
            </h1>

            <p class="text-lg sm:text-xl text-slate-300 max-w-2xl leading-relaxed">
              A structure health monitoring (SHM) system is a system that continuously monitors structures like buildings and bridges to assess their integrity and detect damage.
            </p>

            <!-- Actions -->
            <div class="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <a
                href="#diagnostics"
                class="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-slate-950 bg-[#A7E629] hover:bg-[#bbf33e] shadow-lg shadow-[#A7E629]/25 hover:-translate-y-0.5 transition-all duration-200"
              >
                <UIcon
                  name="i-lucide-activity"
                  class="size-5"
                />
                <span>Pusat Diagnostik Interaktif</span>
              </a>

              <a
                href="#structures"
                class="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-medium text-white bg-slate-900 hover:bg-slate-800 border border-slate-700 transition-all duration-200"
              >
                <UIcon
                  name="i-lucide-grid"
                  class="size-5 text-[#A7E629]"
                />
                <span>7 Objek Infrastruktur</span>
              </a>
            </div>
          </div>

          <!-- Hero Image Column -->
          <div class="lg:col-span-5 flex justify-center">
            <div class="relative group">
              <div class="absolute -inset-4 bg-gradient-to-r from-[#A7E629]/30 to-[#2D4E6F]/50 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-300" />
              <div class="relative rounded-2xl overflow-hidden border border-slate-700/80 bg-slate-900/80 p-4 shadow-2xl backdrop-blur-md max-w-md">
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
          fill="#0B1120"
          height="h-10 sm:h-14 md:h-16"
        />
      </div>
    </section>

    <!-- 2. SHMS WORKING PRINCIPLE PIPELINE -->
    <section class="py-20 bg-[#0B1120] text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span class="text-xs font-bold uppercase tracking-widest text-[#A7E629] block font-mono">
            Alur Instrumentasi
          </span>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Bagaimana SHMS Melindungi Struktur Anda
          </h2>
          <p class="text-slate-400 text-sm sm:text-base">
            Integrasi sensor fisik, unit akuisisi data, dan sistem analitik otomatis untuk deteksi degradasi material sedini mungkin.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="p-8 rounded-3xl bg-slate-900 border border-slate-800 hover:border-[#A7E629]/40 transition-all duration-300 shadow-xl">
            <div class="size-14 rounded-2xl bg-[#A7E629]/15 text-[#A7E629] flex items-center justify-center font-extrabold text-lg mb-6 border border-[#A7E629]/30 font-mono">
              01
            </div>
            <h3 class="text-xl font-bold text-white mb-2">
              Sensor Deployment
            </h3>
            <p class="text-sm text-slate-400 leading-relaxed">
              Pemasangan sensor regangan (*strain gauge*), akselerometer triaksial, tiltmeter, sensor pergeseran LVDT, dan load cells pada titik tumpu kritis struktur.
            </p>
          </div>

          <div class="p-8 rounded-3xl bg-slate-900 border border-slate-800 hover:border-cyan-400/40 transition-all duration-300 shadow-xl">
            <div class="size-14 rounded-2xl bg-cyan-500/15 text-cyan-400 flex items-center justify-center font-extrabold text-lg mb-6 border border-cyan-400/30 font-mono">
              02
            </div>
            <h3 class="text-xl font-bold text-white mb-2">
              Continuous Telemetry
            </h3>
            <p class="text-sm text-slate-400 leading-relaxed">
              Pengumpulan data berkala berkecepatan tinggi tanpa jeda, mencatat respons beban lalu lintas dinamis, getaran angin, dan deformasi termal mikroskopis.
            </p>
          </div>

          <div class="p-8 rounded-3xl bg-slate-900 border border-slate-800 hover:border-emerald-400/40 transition-all duration-300 shadow-xl">
            <div class="size-14 rounded-2xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center font-extrabold text-lg mb-6 border border-emerald-400/30 font-mono">
              03
            </div>
            <h3 class="text-xl font-bold text-white mb-2">
              Diagnostic & Action Alerts
            </h3>
            <p class="text-sm text-slate-400 leading-relaxed">
              Analisis algoritma kecerdasan struktur membandingkan batas toleransi keselamatan dan memberikan rekomendasi pemeliharaan sebelum terjadi keruntuhan katastropik.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 3. INTERACTIVE DIAGNOSTIC HUB COMPONENT -->
    <section
      id="diagnostics"
      class="py-20 bg-slate-950 border-t border-slate-800"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <WebShmsDiagnosticHub />
      </div>
    </section>

    <!-- 4. 7 INFRASTRUCTURE APPLICATIONS CATALOG -->
    <section
      id="structures"
      class="py-24 bg-slate-900 text-white border-t border-slate-800"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto mb-14">
          <span class="text-xs font-bold uppercase tracking-widest text-[#A7E629] block font-mono mb-1">
            Cakupan Infrastruktur
          </span>
          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Katalog 7 Objek Penerapan SHMS
          </h2>
          <p class="text-slate-400 text-sm sm:text-base mt-2">
            Dari jembatan bentang panjang hingga terowongan bawah tanah, SHMS memberikan kepastian integritas fisik aset jangka panjang.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="(item, idx) in structures"
            :key="idx"
            class="rounded-2xl p-6 bg-slate-950 border border-slate-800 hover:border-[#A7E629]/50 transition-all duration-300 flex flex-col justify-between"
          >
            <div class="space-y-3">
              <div class="aspect-16/10 rounded-xl overflow-hidden bg-slate-900 border border-slate-800">
                <img
                  :src="item.image"
                  :alt="item.title"
                  class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                >
              </div>
              <span class="text-[11px] font-bold uppercase tracking-wider text-[#A7E629] block font-mono truncate">
                {{ item.tags }}
              </span>
              <h4 class="text-lg font-bold text-white">
                {{ item.title }}
              </h4>
              <p class="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                {{ item.description }}
              </p>
            </div>

            <div class="pt-4 border-t border-slate-800 mt-4 flex items-center justify-between text-xs font-semibold text-[#A7E629]">
              <span>Sensor Telemetri Aktif</span>
              <UIcon
                name="i-lucide-activity"
                class="size-4"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 5. CALL TO ACTION -->
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
</script>
