<template>
  <div class="relative overflow-hidden">
    <!-- 1. EEWS HERO WITH VIDEO BACKGROUND -->
    <section class="relative min-h-[85vh] flex items-center justify-center bg-slate-950 text-white overflow-hidden pt-24 pb-20">
      <div class="absolute inset-0 z-0 overflow-hidden">
        <video
          autoplay
          muted
          loop
          playsinline
          class="w-full h-full object-cover opacity-45 scale-105 filter saturate-125"
        >
          <source
            src="/amti/videos/header_eews.mp4"
            type="video/mp4"
          >
        </video>
        <!-- Overlay Gradients -->
        <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/50" />
        <div class="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-transparent to-slate-950/80" />
        <div class="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-gradient-to-tr from-[#2D4E6F]/35 to-[#A7E629]/20 blur-3xl pointer-events-none rounded-full" />
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center">
        <div class="max-w-4xl mx-auto space-y-6">
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold tracking-wider uppercase text-slate-200">
            <span class="size-2 rounded-full bg-[#A7E629] animate-pulse" />
            Seismic Risk Mitigation
          </div>

          <h1 class="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Earthquake Early Warning System <br>
            <span class="text-[#A7E629]">(EEWS)</span>
          </h1>

          <p class="text-xl sm:text-2xl text-slate-200 font-semibold max-w-2xl mx-auto">
            Earthquake Warning System to Save Lives, Assets and Communities
          </p>

          <p class="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            By identifying P-waves, the first waves to arrive in an earthquake, our system provides crucial alerts seconds to minutes before the stronger S-waves hit. This early notification allows users to take swift actions, such as moving to a safer location or halting critical operations, ultimately saving lives and minimizing damage.
          </p>

          <div class="pt-4 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#sectors"
              class="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-slate-950 bg-[#A7E629] hover:bg-[#bbf33e] shadow-lg shadow-[#A7E629]/25 hover:-translate-y-0.5 transition-all duration-200"
            >
              <UIcon
                name="i-lucide-layers"
                class="size-5"
              />
              <span>Jelajahi 5 Sektor Penerapan</span>
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
      </div>

      <!-- Wave Divider -->
      <div class="absolute bottom-0 inset-x-0 z-10">
        <WebCurveDivider
          type="wave"
          fill="#ffffff"
          height="h-10 sm:h-14 md:h-16"
        />
      </div>
    </section>

    <!-- 2. P-WAVE VS S-WAVE DETECTION PRINCIPLE -->
    <section class="py-16 sm:py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div class="lg:col-span-6 space-y-4">
            <span class="text-xs font-bold uppercase tracking-widest text-[#2D4E6F] block">
              Prinsip Deteksi Ilmiah
            </span>
            <h2 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              P-Wave Detection: Waktu Berharga Menyelamatkan Jiwa
            </h2>
            <p class="text-base text-slate-600 leading-relaxed">
              Gempa bumi menghasilkan dua gelombang utama: gelombang primer (P-wave) yang bergerak lebih cepat tetapi berdaya rusak rendah, dan gelombang geser (S-wave) yang bergerak lebih lambat namun membawa energi destruktif terbesar.
            </p>
            <p class="text-base text-slate-600 leading-relaxed">
              Sensor seismik presisi tinggi AMTI mendeteksi P-wave seketika di titik episentrum/lokasi pemasangan dan mengaktifkan protokol otomatis ke sistem kendali gedung dan fasilitas industri sebelum guncangan hebat tiba.
            </p>
          </div>

          <div class="lg:col-span-6">
            <div class="p-8 rounded-3xl bg-slate-50 border border-slate-200/80 shadow-lg space-y-4">
              <div class="flex items-center justify-between pb-4 border-b border-slate-200">
                <div class="flex items-center gap-3">
                  <div class="size-10 rounded-xl bg-[#2D4E6F] text-white flex items-center justify-center font-bold">
                    P
                  </div>
                  <div>
                    <h3 class="font-bold text-slate-900">
                      Primary Wave (P-Wave)
                    </h3>
                    <p class="text-xs text-slate-500">
                      Kecepatan ~5-8 km/s • Kompresional
                    </p>
                  </div>
                </div>
                <span class="text-xs font-bold text-[#009838] uppercase">Deteksi Awal</span>
              </div>

              <div class="flex items-center justify-between pb-4 border-b border-slate-200">
                <div class="flex items-center gap-3">
                  <div class="size-10 rounded-xl bg-red-600 text-white flex items-center justify-center font-bold">
                    S
                  </div>
                  <div>
                    <h3 class="font-bold text-slate-900">
                      Secondary Wave (S-Wave)
                    </h3>
                    <p class="text-xs text-slate-500">
                      Kecepatan ~3-4.5 km/s • Destruktif
                    </p>
                  </div>
                </div>
                <span class="text-xs font-bold text-red-600 uppercase">Potensi Bahaya</span>
              </div>

              <div class="pt-2 text-xs text-slate-600 bg-white p-4 rounded-xl border border-slate-200/60 leading-relaxed">
                <strong class="text-slate-900">Jeda Emas (Golden Window):</strong> Memberi interval waktu <strong>detik hingga menit</strong> untuk evakuasi aman, mematikan kompor & gas pipa, menghentikan kereta berkecepatan tinggi, serta mengamankan peralatan bedah rumah sakit.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 3. SECTOR SELECTOR TABS & DEEP-DIVE CARDS (dewesoft style) -->
    <section
      id="sectors"
      class="py-20 bg-slate-50 border-t border-slate-200/70"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto mb-12">
          <span class="text-xs font-bold uppercase tracking-widest text-[#2D4E6F] block">
            Implementasi Multi-Sektor
          </span>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-1">
            Solusi EEWS untuk 5 Sektor Kritis
          </h2>
          <p class="text-slate-600 text-sm sm:text-base mt-2">
            Setiap sektor memiliki risiko spesifik. AMTI menghadirkan sistem mitigasi otomatis yang terintegrasi langsung dengan operasional fasilitas Anda.
          </p>

          <!-- Sector Quick Nav Tabs -->
          <div class="flex flex-wrap items-center justify-center gap-2 mt-8">
            <button
              v-for="(sector, idx) in sectors"
              :key="idx"
              type="button"
              class="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200"
              :class="[
                activeSectorIndex === idx
                  ? 'bg-[#2D4E6F] text-white shadow-md shadow-[#2D4E6F]/20'
                  : 'bg-white text-slate-700 border border-slate-200/80 hover:bg-slate-100'
              ]"
              @click="activeSectorIndex = idx"
            >
              {{ sector.title }}
            </button>
          </div>
        </div>

        <!-- Active Sector Deep Dive Card -->
        <div class="bg-white rounded-3xl border border-slate-200/80 shadow-xl shadow-slate-200/50 p-6 sm:p-10 lg:p-12 mb-16">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <!-- Left Info -->
            <div class="lg:col-span-6 space-y-5">
              <div class="flex items-center gap-3">
                <span class="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-md bg-[#2D4E6F]/10 text-[#2D4E6F]">
                  Sektor 0{{ activeSectorIndex + 1 }}
                </span>
                <span class="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  {{ currentSector.target }}
                </span>
              </div>

              <h3 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {{ currentSector.title }}
              </h3>

              <p class="text-slate-600 text-sm sm:text-base leading-relaxed">
                {{ currentSector.description }}
              </p>

              <!-- Capability List -->
              <div class="pt-2">
                <h4 class="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
                  Tindakan Mitigasi Otomatis:
                </h4>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div
                    v-for="(action, aIdx) in currentSector.actions"
                    :key="aIdx"
                    class="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-slate-700 p-2.5 rounded-lg bg-slate-50 border border-slate-200/60"
                  >
                    <UIcon
                      name="i-lucide-check-circle"
                      class="size-4 text-[#009838] shrink-0"
                    />
                    <span>{{ action }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Right Image Showcase -->
            <div class="lg:col-span-6">
              <div class="relative rounded-2xl overflow-hidden shadow-xl bg-slate-950 border border-slate-200 group aspect-4/3 flex items-center justify-center">
                <img
                  :src="currentSector.image"
                  :alt="currentSector.title"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                >
                <div class="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
                <div class="absolute bottom-4 left-4 right-4 text-white text-xs font-medium">
                  {{ currentSector.target }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Grid of All 5 Sectors for Overview -->
        <div class="space-y-6">
          <div class="text-center">
            <h3 class="text-xl font-bold text-slate-900">
              Rangkuman Seluruh 5 Sektor
            </h3>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              v-for="(sector, sIdx) in sectors"
              :key="sIdx"
              class="rounded-2xl p-6 bg-white border border-slate-200/80 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between cursor-pointer"
              :class="activeSectorIndex === sIdx ? 'ring-2 ring-[#2D4E6F]' : ''"
              @click="activeSectorIndex = sIdx"
            >
              <div class="space-y-3">
                <div class="aspect-16/10 rounded-xl overflow-hidden bg-slate-900 border border-slate-100">
                  <img
                    :src="sector.image"
                    :alt="sector.title"
                    class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  >
                </div>
                <span class="text-[11px] font-bold uppercase tracking-wider text-[#2D4E6F] block">
                  {{ sector.target }}
                </span>
                <h4 class="text-lg font-bold text-slate-900">
                  {{ sector.title }}
                </h4>
                <p class="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {{ sector.description }}
                </p>
              </div>

              <div class="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between text-xs font-semibold text-[#2D4E6F]">
                <span>Pelajari Sektor Ini</span>
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
