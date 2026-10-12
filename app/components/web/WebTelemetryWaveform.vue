<template>
  <div class="relative w-full rounded-2xl bg-slate-950/90 border border-slate-800/90 p-4 sm:p-5 shadow-2xl backdrop-blur-xl overflow-hidden font-mono text-xs">
    <!-- Ambient glowing corner -->
    <div class="absolute -top-12 -right-12 size-36 bg-[#A7E629]/15 rounded-full blur-2xl pointer-events-none" />
    <div class="absolute -bottom-12 -left-12 size-36 bg-[#2D4E6F]/30 rounded-full blur-2xl pointer-events-none" />

    <!-- Terminal Header Bar -->
    <div class="flex items-center justify-between pb-3 mb-3 border-b border-slate-800/80">
      <div class="flex items-center gap-2">
        <span class="size-2 rounded-full bg-[#A7E629] animate-ping" />
        <span class="size-2 rounded-full bg-[#A7E629]" />
        <span class="text-white font-semibold tracking-wider text-[11px] uppercase">
          AMTI Telemetry Stream
        </span>
      </div>

      <div class="flex items-center gap-3 text-[10px] text-slate-400">
        <span class="hidden sm:inline-flex items-center gap-1.5">
          <span class="text-slate-500">SAMPLING:</span>
          <span class="text-[#A7E629] font-bold">200 Hz</span>
        </span>
        <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#2D4E6F]/40 border border-[#2D4E6F]/60 text-cyan-300 font-semibold">
          LIVE FEED
        </span>
      </div>
    </div>

    <!-- Mode Selector Tabs -->
    <div class="flex items-center gap-2 mb-3">
      <button
        type="button"
        class="px-2.5 py-1 rounded text-[11px] font-semibold transition-all duration-200"
        :class="mode === 'pwave' ? 'bg-[#A7E629] text-slate-950 shadow-sm' : 'bg-slate-900 text-slate-400 hover:text-white'"
        @click="mode = 'pwave'"
      >
        Seismic P-Wave Trigger
      </button>

      <button
        type="button"
        class="px-2.5 py-1 rounded text-[11px] font-semibold transition-all duration-200"
        :class="mode === 'shms' ? 'bg-[#2D4E6F] text-white shadow-sm' : 'bg-slate-900 text-slate-400 hover:text-white'"
        @click="mode = 'shms'"
      >
        Structural Vibration (SHMS)
      </button>

      <button
        type="button"
        class="px-2.5 py-1 rounded text-[11px] font-semibold transition-all duration-200"
        :class="mode === 'baseline' ? 'bg-slate-800 text-slate-200 shadow-sm' : 'bg-slate-900 text-slate-400 hover:text-white'"
        @click="mode = 'baseline'"
      >
        Ambient Baseline
      </button>
    </div>

    <!-- Oscilloscope Screen Grid -->
    <div class="relative h-28 sm:h-32 w-full rounded-xl bg-slate-900/90 border border-slate-800 p-2 overflow-hidden flex items-center justify-center">
      <!-- Background Grid Lines -->
      <div class="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:16px_16px]" />
      <div class="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] bg-cyan-500/20" />

      <!-- Animated SVG Waveform -->
      <svg
        class="w-full h-full relative z-10 overflow-visible"
        viewBox="0 0 600 120"
        preserveAspectRatio="none"
      >
        <!-- Glow Shadow Path -->
        <path
          :d="waveformPath"
          fill="none"
          :stroke="modeColor"
          stroke-width="4"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="opacity-40 blur-xs transition-all duration-300"
        />

        <!-- Core Waveform Line -->
        <path
          :d="waveformPath"
          fill="none"
          :stroke="modeColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="transition-all duration-300"
        />
      </svg>

      <!-- Watermark / Coordinates Overlay -->
      <div class="absolute bottom-1.5 left-2.5 text-[9px] text-slate-500 z-20">
        CH-01: {{ mode === 'pwave' ? 'TRI-AXIAL SEISMIC ACCELEROMETER' : mode === 'shms' ? 'DYNAMIC STRAIN GAUGE [C-04]' : 'STATIC BACKGROUND NOISE' }}
      </div>
      <div class="absolute top-1.5 right-2.5 text-[9px] text-slate-400 z-20 flex items-center gap-1.5">
        <span class="text-slate-500">PGA:</span>
        <span :class="mode === 'pwave' ? 'text-[#A7E629] font-bold' : 'text-slate-300'">{{ pgaValue }}</span>
      </div>
    </div>

    <!-- Real-Time Metrics Row -->
    <div class="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-slate-800/80 text-[10px]">
      <div class="bg-slate-900/60 p-2 rounded-lg border border-slate-800/60">
        <span class="text-slate-500 block">RESPONSE LATENCY</span>
        <span class="text-white font-bold text-xs">{{ mode === 'pwave' ? '0.12 s' : '0.04 s' }}</span>
      </div>

      <div class="bg-slate-900/60 p-2 rounded-lg border border-slate-800/60">
        <span class="text-slate-500 block">FREQUENCY PEAK</span>
        <span class="text-white font-bold text-xs">{{ mode === 'shms' ? '3.45 Hz' : mode === 'pwave' ? '8.20 Hz' : '0.05 Hz' }}</span>
      </div>

      <div class="bg-slate-900/60 p-2 rounded-lg border border-slate-800/60">
        <span class="text-slate-500 block">SYSTEM INTEGRITY</span>
        <span class="text-[#A7E629] font-bold text-xs">NORMAL 100%</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const mode = ref<'pwave' | 'shms' | 'baseline'>('pwave')

const modeColor = computed(() => {
  if (mode.value === 'pwave') return '#A7E629'
  if (mode.value === 'shms') return '#06B6D4'
  return '#64748B'
})

const pgaValue = computed(() => {
  if (mode.value === 'pwave') return '0.048 g (WARNING TRIGGER)'
  if (mode.value === 'shms') return '0.012 g (VIBRATION STABLE)'
  return '0.001 g (NOMINAL)'
})

// Waveform dynamic calculation
const timeStep = ref(0)
let timer: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  timer = setInterval(() => {
    timeStep.value = (timeStep.value + 1) % 1000
  }, 60)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})

const waveformPath = computed(() => {
  const t = timeStep.value * 0.2
  const points: string[] = []
  const count = 60
  const width = 600
  const midY = 60

  for (let i = 0; i <= count; i++) {
    const x = (i / count) * width
    let y = midY

    if (mode.value === 'pwave') {
      // P-wave burst followed by high amplitude
      const envelope = Math.sin((i / count) * Math.PI)
      const wave = Math.sin(i * 0.8 + t) * Math.cos(i * 0.3 + t * 0.5)
      y = midY + wave * envelope * 45
    } else if (mode.value === 'shms') {
      // Structural resonance frequency
      const wave = Math.sin(i * 0.5 + t * 0.8) * Math.sin(i * 0.15 + t * 0.3)
      y = midY + wave * 30
    } else {
      // Small ambient noise
      const noise = (Math.sin(i * 1.7 + t * 0.5) + Math.cos(i * 2.3 + t * 0.3)) * 0.5
      y = midY + noise * 5
    }

    points.push(`${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`)
  }

  return points.join(' ')
})
</script>
