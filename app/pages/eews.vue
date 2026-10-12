<template>
  <div class="relative overflow-hidden bg-slate-950">
    <!-- 1. EEWS HERO WITH VIDEO BACKGROUND & AMBIENT GLOW -->
    <section class="relative min-h-[85vh] flex items-center justify-center bg-slate-950 text-white overflow-hidden pt-28 pb-20">
      <div class="absolute inset-0 z-0 overflow-hidden">
        <video
          autoplay
          muted
          loop
          playsinline
          class="w-full h-full object-cover opacity-35 scale-105 filter saturate-150"
        >
          <source
            src="/amti/videos/header_eews.mp4"
            type="video/mp4"
          >
        </video>
        <div class="absolute inset-0 bg-tech-grid opacity-30 pointer-events-none" />
        <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/40" />
        <div class="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/40 to-slate-950/90" />
        <div class="absolute top-1/4 left-1/3 w-[600px] h-[350px] bg-[#A7E629]/15 blur-3xl pointer-events-none rounded-full" />
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center">
        <div class="max-w-4xl mx-auto space-y-6">
          <div class="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 text-xs font-semibold tracking-wider uppercase text-slate-200 backdrop-blur-md shadow-lg">
            <span class="size-2 rounded-full bg-[#A7E629] animate-ping" />
            <span>Seismic Risk Mitigation Network</span>
            <span class="text-slate-500">|</span>
            <span class="text-[#A7E629] font-mono">P-WAVE INTERVENTION</span>
          </div>

          <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
            Earthquake Early Warning <br>
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#A7E629] via-emerald-300 to-cyan-400">
              System (EEWS)
            </span>
          </h1>

          <p class="text-xl sm:text-2xl text-slate-200 font-semibold max-w-2xl mx-auto">
            Earthquake Warning System to Save Lives, Assets and Communities
          </p>

          <p class="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            By identifying P-waves, the first waves to arrive in an earthquake, our system provides crucial alerts seconds to minutes before the stronger S-waves hit. This early notification allows users to take swift actions, such as moving to a safer location or halting critical operations, ultimately saving lives and minimizing damage.
          </p>

          <!-- Action Buttons -->
          <div class="pt-4 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#simulation"
              class="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-slate-950 bg-[#A7E629] hover:bg-[#bbf33e] shadow-lg shadow-[#A7E629]/25 hover:-translate-y-0.5 transition-all duration-200"
            >
              <UIcon
                name="i-lucide-play-circle"
                class="size-5"
              />
              <span>Simulasi Deteksi P-Wave</span>
            </a>

            <a
              href="#sectors"
              class="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-medium text-white bg-slate-900 hover:bg-slate-800 border border-slate-700 transition-all duration-200"
            >
              <UIcon
                name="i-lucide-layers"
                class="size-5 text-[#A7E629]"
              />
              <span>5 Sektor Penerapan</span>
            </a>
          </div>
        </div>
      </div>

      <!-- Bottom Curve -->
      <div class="absolute bottom-0 inset-x-0 z-10">
        <WebCurveDivider
          type="wave"
          fill="#0B1120"
          height="h-10 sm:h-14 md:h-16"
        />
      </div>
    </section>

    <!-- 2. INTERACTIVE EARTHQUAKE TIMELINE (P-WAVE VS S-WAVE SIMULATION) -->
    <section
      id="simulation"
      class="py-20 bg-[#0B1120] text-white relative"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <WebEewsTimeline />
      </div>
    </section>

    <!-- 3. SECTOR COCKPIT & CATALOG (5 CRITICAL SECTORS) -->
    <section
      id="sectors"
      class="py-24 bg-slate-950 text-white relative border-t border-slate-800"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="text-center max-w-3xl mx-auto mb-14">
          <span class="text-xs font-bold uppercase tracking-widest text-[#A7E629] block font-mono mb-1">
            Penerapan Lapangan
          </span>
          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Solusi EEWS untuk 5 Sektor Kritis
          </h2>
          <p class="text-slate-400 text-sm sm:text-base mt-2">
            Setiap sektor memiliki risiko spesifik. AMTI menghadirkan sistem mitigasi otomatis yang terintegrasi langsung dengan operasional fasilitas Anda.
          </p>

          <!-- Interactive Sector Pills -->
          <div class="flex flex-wrap items-center justify-center gap-2 mt-8">
            <button
              v-for="(sector, idx) in sectors"
              :key="idx"
              type="button"
              class="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200"
              :class="[
                activeSectorIndex === idx
                  ? 'bg-[#A7E629] text-slate-950 shadow-md shadow-[#A7E629]/25 font-bold'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              ]"
              @click="activeSectorIndex = idx"
            >
              {{ sector.title }}
            </button>
          </div>
        </div>

        <!-- Active Sector Deep Dive Card -->
        <div class="bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl p-6 sm:p-10 lg:p-12 mb-16 relative overflow-hidden">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            <!-- Left Info -->
            <div class="lg:col-span-6 space-y-5">
              <div class="flex items-center gap-3">
                <span class="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-md bg-[#A7E629]/20 text-[#A7E629] font-mono">
                  SEKTOR 0{{ activeSectorIndex + 1 }}
                </span>
                <span class="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  {{ currentSector.target }}
                </span>
              </div>

              <h3 class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {{ currentSector.title }}
              </h3>

              <p class="text-slate-300 text-sm sm:text-base leading-relaxed">
                {{ currentSector.description }}
              </p>

              <!-- Capability List -->
              <div class="pt-2">
                <h4 class="text-xs font-bold uppercase tracking-wider text-[#A7E629] mb-3 font-mono">
                  TINDAKAN MITIGASI OTOMATIS:
                </h4>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div
                    v-for="(action, aIdx) in currentSector.actions"
                    :key="aIdx"
                    class="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-slate-200 p-2.5 rounded-lg bg-slate-950 border border-slate-800"
                  >
                    <UIcon
                      name="i-lucide-shield-check"
                      class="size-4 text-[#A7E629] shrink-0"
                    />
                    <span>{{ action }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Right Image Showcase -->
            <div class="lg:col-span-6">
              <div class="relative rounded-2xl overflow-hidden shadow-2xl bg-slate-950 border border-slate-700/80 group aspect-4/3 flex items-center justify-center">
                <img
                  :src="currentSector.image"
                  :alt="currentSector.title"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                >
                <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent pointer-events-none" />
                <div class="absolute bottom-4 left-4 right-4 text-white text-xs font-bold font-mono">
                  {{ currentSector.target }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Grid of All 5 Sectors for Overview -->
        <div class="space-y-6">
          <div class="text-center">
            <h3 class="text-xl font-bold text-white">
              Ringkasan Seluruh 5 Sektor
            </h3>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              v-for="(sector, sIdx) in sectors"
              :key="sIdx"
              class="rounded-2xl p-6 bg-slate-900 border border-slate-800 hover:border-[#A7E629]/50 transition-all duration-300 flex flex-col justify-between cursor-pointer"
              :class="activeSectorIndex === sIdx ? 'ring-2 ring-[#A7E629]' : ''"
              @click="activeSectorIndex = sIdx"
            >
              <div class="space-y-3">
                <div class="aspect-16/10 rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
                  <img
                    :src="sector.image"
                    :alt="sector.title"
                    class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  >
                </div>
                <span class="text-[11px] font-bold uppercase tracking-wider text-[#A7E629] block font-mono truncate">
                  {{ sector.target }}
                </span>
                <h4 class="text-lg font-bold text-white">
                  {{ sector.title }}
                </h4>
                <p class="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                  {{ sector.description }}
                </p>
              </div>

              <div class="pt-4 border-t border-slate-800 mt-4 flex items-center justify-between text-xs font-semibold text-[#A7E629]">
                <span>Tampilkan Detail Sektor</span>
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
  title: 'Earthquake Early Warning System (EEWS) | AMTI',
  description: 'By identifying P-waves, AMTI EEWS provides crucial alerts seconds to minutes before stronger S-waves hit. Mitigate risks across Buildings, Transportation, Utilities, Oil & Gas, and Mines.',
  ogTitle: 'Earthquake Early Warning System (EEWS) | AMTI',
  ogDescription: 'Early warning seismic protection for public buildings, transportation, utilities, oil & gas, and mining infrastructure.'
})

interface SectorItem {
  title: string
  target: string
  image: string
  description: string
  actions: string[]
}

const sectors: SectorItem[] = [
  {
    title: 'BUILDINGS',
    target: 'HOSPITAL | APARTMENT | EDUCATIONAL FACILITY | OFFICE | MALL | HOTEL',
    image: '/amti/img/eews/buildings.webp',
    description: 'Earthquakes can cause severe damage, including the collapse of buildings, often on a large scale, and can result in casualties. These sudden events trigger widespread panic and chaos. Building damage may also disrupt electricity supply, cause gas pipe leaks, and even lead to explosions. Public services are disrupted, endangering critical surgical procedures and valuable equipment in hospitals, as well as putting the safety of children in schools at risk. The AMTI Earthquake Early Warning System (EEWS) can reduce the risk of damage and casualties by integrating with Building Management Systems. This EEWS can mitigate earthquake impacts by initiating preventive actions such as activating safe mode for equipment, elevators, and gates, reducing gas pressure, shutting off wastewater lines, cutting power, and issuing warnings via social media, SMS, WhatsApp, alarms, and audiovisual systems. Additionally, the system can automatically halt sensitive procedures to minimize further damage.',
    actions: [
      'Public Buildings Integration',
      'Audiovisual Emergency Alerts',
      'Equipment on Safe Mode',
      'Elevator Auto-Park & Door Opening',
      'Gas Pressure Cutoff',
      'Halting Sensitive Medical / School Procedures'
    ]
  },
  {
    title: 'TRANSPORTATION',
    target: 'AIRPORT | TRAIN | PORT | BUS',
    image: '/amti/img/eews/TRANSPORTATION.png',
    description: 'Earthquakes pose a serious threat to transportation systems such as airports, ports, railways, and vehicles, potentially disrupting operations and endangering passengers and operators. By providing early warnings, authorities can quickly implement safety protocols, protecting lives and critical infrastructure. The Earthquake Early Warning System (EEWS) from AMTI can intervene by activating automatic emergency braking mechanisms for trains, redirecting air traffic and triggering warnings on road signs to prevent accidents and ensure the safety of passengers and workers.',
    actions: [
      'Automatic Train Braking Mechanisms',
      'Air Traffic Controller Rerouting',
      'Dynamic Road Sign Hazard Alerts',
      'Stop Buses & Safe Passenger Evacuation',
      'Port Gantry Crane Emergency Lock'
    ]
  },
  {
    title: 'UTILITIES',
    target: 'POWER PLANT | ELECTRICITY DISTRIBUTION | WATER SUPPLY | GAS SUPPLY | WASTEWATER SYSTEM',
    image: '/amti/img/eews/utilities.webp',
    description: 'Earthquake vibrations can damage pipelines, valves, and pump stations, causing hazardous chemical and water leaks that could disrupt vital supplies of clean water or electricity to the community. The Earthquake Early Warning System (EEWS) from AMTI can trigger preventive actions to protect power plants, such as reducing gas pressure, preventing hydrogen evaporation, safeguarding substations, cutting off wastewater flow, and halting the supply of electricity and water. Additionally, the system can generate post-event reports to assess potential damage to pipelines.',
    actions: [
      'Control Water Pressure in Fire Mains',
      'Duck-Cover-Hold On Protocol Alerts',
      'Automatic Substation Shutdown',
      'Hydrogen Evaporation Prevention',
      'Post-Event Pipeline Integrity Reports'
    ]
  },
  {
    title: 'OIL, GAS AND CHEMICALS',
    target: 'OIL & GAS FACILITIES | CHEMICAL PLANT | REFINERY',
    image: '/amti/img/eews/oil.webp',
    description: 'Earthquakes can cause explosions, fires, chemical leaks, and environmental damage at oil and gas facilities. With AMTI\'s earthquake early warning, there is more time to trigger damage control actions, such as lowering or shutting off gas pressure, with maximum response time. This limits potential damage while keeping critical infrastructure and vital services operational. EEWS AMTI also sends alerts via social media, SMS, WhatsApp, alarms, or audiovisual systems to employees, reducing injuries and casualties, and speeding up facility recovery.',
    actions: [
      'Emergency Valve Shutoff',
      'Gas Pressure Reduction',
      'Fire Water System Standby',
      'Hazardous Material Isolation',
      'Multi-channel Personnel Broadcast'
    ]
  },
  {
    title: 'MINES',
    target: 'TRANSPORTATION | INFRASTRUCTURE | MINING EQUIPMENT',
    image: '/amti/img/eews/mines.webp',
    description: 'Earthquakes can cause significant damage to infrastructure and jeopardize worker safety in mining operations. The Earthquake Early Warning System (EEWS) from AMTI can significantly reduce damage, primarily by warning workers and giving them time to take cover or evacuate before the main tremor hits. Earthquake alerts can also trigger automatic shutdown mechanisms for critical mining equipment and isolate hazardous materials, reducing the risk of damage to machinery and ensuring team safety. Post-event reports can support decision-making processes for resuming operations after an earthquake.',
    actions: [
      'Delay Planned Blasting & Explosions',
      'Automatic Heavy-Machinery Shutdown',
      'Underground Tunnel Personnel Warning',
      'Hazardous Slurry Isolation',
      'Post-Event Structural Safety Decision Support'
    ]
  }
]

const activeSectorIndex = ref(0)
const currentSector = computed<SectorItem>(() => sectors[activeSectorIndex.value] || sectors[0]!)
</script>
