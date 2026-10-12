<template>
  <div class="rounded-3xl bg-slate-950 border border-slate-800 text-white p-6 sm:p-10 shadow-2xl relative overflow-hidden">
    <!-- Ambient glowing backdrop -->
    <div class="absolute -top-32 -right-32 size-96 bg-[#2D4E6F]/30 rounded-full blur-3xl pointer-events-none" />
    <div class="absolute -bottom-32 -left-32 size-96 bg-[#A7E629]/15 rounded-full blur-3xl pointer-events-none" />

    <div class="relative z-10 space-y-8">
      <!-- Section Header -->
      <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <span class="text-xs font-bold uppercase tracking-widest text-[#A7E629] block mb-1">
            Diagnostic Telemetry Station
          </span>
          <h3 class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Pusat Diagnostik Kesehatan Struktur SHMS
          </h3>
        </div>

        <p class="text-xs text-slate-400 max-w-md">
          Pilih jenis infrastruktur untuk memeriksa parameter sensor, instrumentasi fisik, dan kapabilitas pemantauan berkelanjutan.
        </p>
      </div>

      <!-- Infrastructure Selector Pills -->
      <div class="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          v-for="(item, idx) in structures"
          :key="idx"
          type="button"
          class="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold shrink-0 transition-all duration-200 flex items-center gap-2"
          :class="[
            selectedIdx === idx
              ? 'bg-[#A7E629] text-slate-950 shadow-md shadow-[#A7E629]/20 font-bold'
              : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
          ]"
          @click="selectedIdx = idx"
        >
          <UIcon
            :name="item.icon"
            class="size-4"
          />
          <span>{{ item.title }}</span>
        </button>
      </div>

      <!-- Main Showcase Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-900/80 rounded-2xl p-6 sm:p-8 border border-slate-800">
        <!-- Left: Image & Simulated Sensor Overlays -->
        <div class="lg:col-span-6 relative group">
          <div class="aspect-4/3 rounded-xl overflow-hidden bg-slate-950 border border-slate-700/80 shadow-2xl relative">
            <img
              :src="current.image"
              :alt="current.title"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            >
            <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-70" />

            <!-- Sensor Marker Pins on Image -->
            <div class="absolute top-1/4 left-1/3 flex items-center gap-1.5 px-2 py-1 rounded bg-slate-950/80 backdrop-blur-md border border-[#A7E629] text-[10px] text-[#A7E629] font-mono shadow-md animate-pulse">
              <span class="size-1.5 rounded-full bg-[#A7E629]" />
              <span>SENSOR NODE A</span>
            </div>

            <div class="absolute bottom-1/3 right-1/4 flex items-center gap-1.5 px-2 py-1 rounded bg-slate-950/80 backdrop-blur-md border border-cyan-400 text-[10px] text-cyan-300 font-mono shadow-md">
              <span class="size-1.5 rounded-full bg-cyan-400" />
              <span>TELEMETRY CH-02</span>
            </div>

            <div class="absolute bottom-3 left-3 text-white text-xs font-bold tracking-wide">
              {{ current.title }} MONITORING ARRAY
            </div>
          </div>
        </div>

        <!-- Right: Diagnostic Details & Metrics -->
        <div class="lg:col-span-6 space-y-5">
          <div class="space-y-1">
            <div class="text-[11px] font-mono uppercase tracking-wider text-[#A7E629] font-semibold">
              {{ current.tags }}
            </div>
            <h4 class="text-2xl font-bold text-white">
              {{ current.title }}
            </h4>
          </div>

          <p class="text-slate-300 text-sm leading-relaxed">
            {{ current.description }}
          </p>

          <!-- Engineering Telemetry Parameters -->
          <div class="space-y-3 pt-2">
            <div class="text-xs font-bold uppercase tracking-wider text-slate-400">
              Parameter Pengukuran Kritis:
            </div>
            <div class="grid grid-cols-2 gap-3 text-xs font-mono">
              <div
                v-for="(metric, mIdx) in current.metrics"
                :key="mIdx"
                class="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1"
              >
                <div class="text-slate-500 text-[10px]">
                  {{ metric.label }}
                </div>
                <div class="text-white font-bold text-sm flex items-center justify-between">
                  <span>{{ metric.value }}</span>
                  <span class="text-[10px] text-[#A7E629]">{{ metric.unit }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const selectedIdx = ref(0)
const current = computed(() => structures[selectedIdx.value] || structures[0]!)

const structures = [
  {
    title: 'BRIDGES',
    icon: 'i-lucide-git-commit',
    tags: 'BRIDGE MONITORING | STRUCTURAL HEALTH | STRESS ANALYSIS | SAFETY ALERTS | DYNAMIC DISPLACEMENT',
    image: '/amti/img/shms/bridge.webp',
    description: 'Our SHMS is designed to monitor the health of bridges in real time, providing critical insights into structural integrity and potential wear. Timely alerts enable preventive maintenance and ensure long-term safety, helping prevent catastrophic failures and prolonging infrastructure lifespan.',
    metrics: [
      { label: 'DYNAMIC STRAIN', value: '±145', unit: 'με' },
      { label: 'NATURAL FREQUENCY', value: '1.24', unit: 'Hz' },
      { label: 'EXPANSION GAP', value: '18.4', unit: 'mm' },
      { label: 'HEALTH INDEX', value: '99.4', unit: '%' }
    ]
  },
  {
    title: 'BUILDINGS',
    icon: 'i-lucide-building-2',
    tags: 'SKYSCRAPERS | HOSPITALS | OFFICES | MALLS | RESIDENTIAL BUILDINGS',
    image: '/amti/img/shms/building.webp',
    description: 'Our SHMS monitors critical infrastructures, from skyscrapers to hospitals, offering real-time data on structural health. This enables maintenance teams to make informed decisions to prevent costly repairs and improve safety for occupants.',
    metrics: [
      { label: 'INTER-STORY DRIFT', value: '0.08', unit: 'rad' },
      { label: 'BASE TILT ANGLE', value: '0.003', unit: 'deg' },
      { label: 'ACCELERATION PEAK', value: '0.015', unit: 'g' },
      { label: 'STABILITY SCORE', value: 'NORMAL', unit: 'OK' }
    ]
  },
  {
    title: 'DAM',
    icon: 'i-lucide-waves',
    tags: 'HIGHWAY MONITORING | PAVEMENT HEALTH | WEAR ANALYSIS | LOAD STRESS | SAFETY MEASURES',
    image: '/amti/img/shms/dam.webp',
    description: 'SHMS provides continuous monitoring of roads and highways, assessing wear and structural performance. By detecting early signs of stress or degradation, it enables timely maintenance, preventing accidents and reducing downtime.',
    metrics: [
      { label: 'PORE WATER PRESSURE', value: '124.5', unit: 'kPa' },
      { label: 'SEEPAGE RATE', value: '0.42', unit: 'L/min' },
      { label: 'CREST DISPLACEMENT', value: '2.1', unit: 'mm' },
      { label: 'STRUCTURAL STATUS', value: 'OPTIMAL', unit: 'OK' }
    ]
  },
  {
    title: 'LANDSLIDE',
    icon: 'i-lucide-mountain',
    tags: 'SLOPE STABILITY | GEOTECHNICAL SENSORS | SOIL DISPLACEMENT | RUNOFF MONITORING',
    image: '/amti/img/shms/landslide.webp',
    description: 'SHMS provides continuous monitoring of roads and highways, assessing wear and structural performance. By detecting early signs of stress or degradation, it enables timely maintenance, preventing accidents and reducing downtime.',
    metrics: [
      { label: 'SURFACE INCLINATION', value: '0.012', unit: 'deg/h' },
      { label: 'SUBSURFACE SHEAR', value: '0.8', unit: 'mm' },
      { label: 'SOIL MOISTURE', value: '38.2', unit: '%' },
      { label: 'RISK LEVEL', value: 'LOW', unit: 'STABLE' }
    ]
  },
  {
    title: 'PORT',
    icon: 'i-lucide-anchor',
    tags: 'DOCK MONITORING | GANTRY CRANE STRESS | WHARF PILES | SEAWALL INTEGRITY',
    image: '/amti/img/shms/port.webp',
    description: 'SHMS provides continuous monitoring of roads and highways, assessing wear and structural performance. By detecting early signs of stress or degradation, it enables timely maintenance, preventing accidents and reducing downtime.',
    metrics: [
      { label: 'WHARF PILE CORROSION', value: '0.02', unit: 'mm/y' },
      { label: 'CRANE RAIL DEFLECTION', value: '1.4', unit: 'mm' },
      { label: 'TIDAL WAVE IMPACT', value: '45.0', unit: 'kN' },
      { label: 'FACILITY INTEGRITY', value: '98.9', unit: '%' }
    ]
  },
  {
    title: 'RAILWAY',
    icon: 'i-lucide-train',
    tags: 'TRACK ALIGNMENT | SLEEPER DISPLACEMENT | EMBANKMENT STABILITY | HIGH SPEED SAFETY',
    image: '/amti/img/shms/railway.webp',
    description: 'SHMS provides continuous monitoring of roads and highways, assessing wear and structural performance. By detecting early signs of stress or degradation, it enables timely maintenance, preventing accidents and reducing downtime.',
    metrics: [
      { label: 'TRACK CANT TWIST', value: '0.4', unit: 'mm/m' },
      { label: 'SLEEPER VIBRATION', value: '18.2', unit: 'Hz' },
      { label: 'BALLAST SETTLEMENT', value: '0.9', unit: 'mm' },
      { label: 'LINE SAFETY', value: 'CLEAR', unit: '200+ km/h' }
    ]
  },
  {
    title: 'TUNNELS',
    icon: 'i-lucide-shield-alert',
    tags: 'UNDERGROUND STRUCTURES | STRESS MONITORING | SAFETY ALERTS | VIBRATION ANALYSIS | RISK MANAGEMENT',
    image: '/amti/img/shms/tunnel.png',
    description: 'With SHMS, tunnel safety is greatly enhanced through real-time monitoring of structural stress and vibration. This system allows for immediate responses to potential threats, safeguarding both infrastructure and people.',
    metrics: [
      { label: 'CONVERGENCE DEFLECTION', value: '0.6', unit: 'mm' },
      { label: 'ROCK BOLT LOAD', value: '85.4', unit: 'kN' },
      { label: 'VIBRATION LEVEL', value: '0.008', unit: 'g' },
      { label: 'TUNNEL HEALTH', value: 'NORMAL', unit: '100%' }
    ]
  }
]
</script>
