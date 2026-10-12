<template>
  <div class="rounded-3xl bg-slate-950 border border-slate-800 p-6 sm:p-8 lg:p-10 text-white relative overflow-hidden shadow-2xl">
    <!-- Ambient backlights -->
    <div class="absolute -top-20 -left-20 size-72 bg-[#2D4E6F]/30 rounded-full blur-3xl pointer-events-none" />
    <div class="absolute -bottom-20 -right-20 size-72 bg-[#A7E629]/15 rounded-full blur-3xl pointer-events-none" />

    <div class="relative z-10 space-y-8">
      <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <span class="text-xs font-bold uppercase tracking-widest text-[#A7E629] block mb-1">
            Simulasi Kejadian Gempa
          </span>
          <h3 class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Bagaimana AMTI EEWS Bekerja Menyelamatkan Aset
          </h3>
        </div>

        <p class="text-xs text-slate-400 max-w-sm">
          Pemanfaatan jeda waktu selisih kecepatan gelombang P (cepat) dan gelombang S (destruktif) secara otomatis.
        </p>
      </div>

      <!-- Timeline Progress Steps -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
        <!-- Connecting Line behind items (desktop) -->
        <div class="hidden md:block absolute top-1/2 left-8 right-8 h-[2px] bg-gradient-to-r from-red-500/40 via-[#A7E629]/60 to-cyan-400/40 -translate-y-6 z-0" />

        <!-- Step 1: Rupture -->
        <div class="relative z-10 p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-red-500/50 transition-all duration-300 space-y-3">
          <div class="flex items-center justify-between">
            <span class="px-2 py-0.5 rounded bg-red-950 border border-red-800 text-red-400 text-[10px] font-bold font-mono">
              T = 0.0s
            </span>
            <div class="size-8 rounded-full bg-red-500/10 text-red-400 flex items-center justify-center font-bold text-xs">
              01
            </div>
          </div>
          <h4 class="text-base font-bold text-white">
            Patahan & Gempa Terjadi
          </h4>
          <p class="text-xs text-slate-400 leading-relaxed">
            Pergeseran lempeng bawah tanah melepaskan gelombang seismik pertama ke segala arah dari pusat gempa (hiposentrum).
          </p>
        </div>

        <!-- Step 2: P-Wave -->
        <div class="relative z-10 p-5 rounded-2xl bg-slate-900/90 border border-[#A7E629]/40 hover:border-[#A7E629] transition-all duration-300 space-y-3 shadow-lg shadow-[#A7E629]/10">
          <div class="flex items-center justify-between">
            <span class="px-2 py-0.5 rounded bg-[#A7E629]/20 border border-[#A7E629]/40 text-[#A7E629] text-[10px] font-bold font-mono">
              T = +2.4s
            </span>
            <div class="size-8 rounded-full bg-[#A7E629] text-slate-950 flex items-center justify-center font-bold text-xs shadow-sm">
              02
            </div>
          </div>
          <h4 class="text-base font-bold text-white">
            P-Wave Terdeteksi AMTI
          </h4>
          <p class="text-xs text-slate-400 leading-relaxed">
            Sensor seismik presisi tinggi AMTI mendeteksi gelombang P seketika, mengkalkulasi magnitudo & waktu estimasi kedatangan gelombang S.
          </p>
        </div>

        <!-- Step 3: Trigger BMS -->
        <div class="relative z-10 p-5 rounded-2xl bg-slate-900/90 border border-cyan-500/40 hover:border-cyan-400 transition-all duration-300 space-y-3 shadow-lg shadow-cyan-500/10">
          <div class="flex items-center justify-between">
            <span class="px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800 text-cyan-400 text-[10px] font-bold font-mono">
              T = +3.8s
            </span>
            <div class="size-8 rounded-full bg-cyan-400 text-slate-950 flex items-center justify-center font-bold text-xs shadow-sm">
              03
            </div>
          </div>
          <h4 class="text-base font-bold text-white">
            Perintah Otomatis Aktif
          </h4>
          <p class="text-xs text-slate-400 leading-relaxed">
            Katup gas otomatis tertutup, elevator mendarat di lantai terdekat, alarm audio-visual berbunyi, dan operasi sensitif dihentikan.
          </p>
        </div>

        <!-- Step 4: S-Wave Destructive Arrival -->
        <div class="relative z-10 p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-emerald-500/50 transition-all duration-300 space-y-3">
          <div class="flex items-center justify-between">
            <span class="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800 text-emerald-400 text-[10px] font-bold font-mono">
              T = +18.5s
            </span>
            <div class="size-8 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold text-xs">
              04
            </div>
          </div>
          <h4 class="text-base font-bold text-white">
            Gelombang S Tiba di Lokasi
          </h4>
          <p class="text-xs text-slate-400 leading-relaxed">
            Guncangan hebat tiba, namun manusia telah berlindung dan sistem utilitas krusial sudah dalam mode proteksi aman.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
