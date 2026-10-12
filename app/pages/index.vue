<template>
  <div class="relative overflow-hidden bg-slate-950">
    <!-- 1. HIGH-TECH HERO SECTION WITH LIVE TELEMETRY CONSOLE -->
    <section class="relative min-h-[92vh] flex items-center bg-slate-950 text-white overflow-hidden pt-28 pb-20">
      <!-- Ambient Lighting & Video Background -->
      <div class="absolute inset-0 z-0 overflow-hidden">
        <video
          autoplay
          muted
          loop
          playsinline
          class="w-full h-full object-cover opacity-35 scale-105 filter saturate-150"
        >
          <source
            src="/amti/videos/home_amti.mp4"
            type="video/mp4"
          >
        </video>
        <!-- Layered tech grid and gradient meshes -->
        <div class="absolute inset-0 bg-tech-grid opacity-30 pointer-events-none" />
        <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/40" />
        <div class="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/40 to-slate-950/90" />
        <div class="absolute top-1/4 left-1/4 w-[500px] h-[300px] bg-[#A7E629]/15 blur-3xl pointer-events-none rounded-full" />
        <div class="absolute bottom-1/4 right-1/4 w-[600px] h-[350px] bg-[#2D4E6F]/40 blur-3xl pointer-events-none rounded-full" />
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <!-- Left: Hero Text Column -->
          <div class="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div class="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 text-xs font-semibold tracking-wider uppercase text-slate-200 backdrop-blur-md shadow-lg">
              <span class="size-2 rounded-full bg-[#A7E629] animate-ping" />
              <span>24/7 Sensor-Based Asset Protection</span>
              <span class="text-slate-500">|</span>
              <span class="text-cyan-400 font-mono">LATENCY &lt; 0.15s</span>
            </div>

            <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] text-white">
              <span>Earthquake Early Warning &</span> <br>
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#A7E629] via-emerald-300 to-cyan-400 drop-shadow-md">
                Structure Health Monitoring
              </span>
            </h1>

            <p class="text-lg sm:text-xl text-slate-300 font-normal max-w-2xl leading-relaxed">
              Protect Your Assets with 24/7 Real-Time Sensor-Based Monitoring. Sistem telemetri presisi tinggi untuk keselamatan jiwa dan ketahanan infrastruktur nasional.
            </p>

            <!-- Action Buttons -->
            <div class="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <NuxtLink
                to="/eews"
                class="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-slate-950 bg-[#A7E629] hover:bg-[#bbf33e] shadow-lg shadow-[#A7E629]/25 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
              >
                <UIcon
                  name="i-lucide-activity"
                  class="size-5"
                />
                <span>Solusi EEWS</span>
              </NuxtLink>

              <NuxtLink
                to="/shms"
                class="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-white bg-[#2D4E6F] hover:bg-[#386088] border border-white/20 shadow-lg shadow-[#2D4E6F]/30 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
              >
                <UIcon
                  name="i-lucide-building"
                  class="size-5 text-[#A7E629]"
                />
                <span>Solusi SHMS</span>
              </NuxtLink>

              <a
                href="#company-profile"
                class="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl font-medium text-white bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/15 hover:border-white/30 transition-all duration-200"
              >
                <UIcon
                  name="i-lucide-play-circle"
                  class="size-5 text-white"
                />
                <span>Video Profile</span>
              </a>
            </div>

            <!-- Fast Stat Badges -->
            <div class="pt-4 grid grid-cols-3 gap-3 max-w-lg border-t border-slate-800/80">
              <div>
                <span class="text-2xl font-bold text-[#A7E629] block font-mono">100%</span>
                <span class="text-[11px] text-slate-400 font-medium">Real-Time Data</span>
              </div>
              <div>
                <span class="text-2xl font-bold text-cyan-400 block font-mono">P-Wave</span>
                <span class="text-[11px] text-slate-400 font-medium">Early Warning</span>
              </div>
              <div>
                <span class="text-2xl font-bold text-white block font-mono">24/7/365</span>
                <span class="text-[11px] text-slate-400 font-medium">Uptime Monitoring</span>
              </div>
            </div>
          </div>

          <!-- Right: Interactive Live Telemetry Waveform HUD -->
          <div class="lg:col-span-5">
            <WebTelemetryWaveform />
          </div>
        </div>
      </div>

      <!-- Bottom Curve Divider -->
      <div class="absolute bottom-0 inset-x-0 z-10">
        <WebCurveDivider
          type="wave"
          fill="#0B1120"
          height="h-10 sm:h-14 md:h-16"
        />
      </div>
    </section>

    <!-- 2. STAY AHEAD WITH SMART MONITORING & 3 CORE CAPABILITIES -->
    <section class="py-20 bg-[#0B1120] text-white relative">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <span class="text-xs font-bold uppercase tracking-widest text-[#A7E629] block font-mono">
            Keunggulan Pemantauan Cerdas
          </span>
          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Stay Ahead with Smart Monitoring
          </h2>
          <p class="text-base sm:text-lg text-slate-300 leading-relaxed">
            Our advanced system ensures real-time seismic detection, structural monitoring, instant alerts, and safeguarding your assets and lives. With state-of-the-art technology and trusted expertise, we empower you to prepare, respond, and recover effectively. Make safety your ultimate priority.
          </p>
        </div>

        <!-- 3 Feature Focus Cards (Dewesoft Style Precision Hardware / Software Cards) -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="p-8 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-[#A7E629]/50 hover:bg-slate-900 transition-all duration-300 shadow-xl group">
            <div class="size-14 rounded-2xl bg-[#A7E629]/15 text-[#A7E629] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-[#A7E629]/30">
              <UIcon
                name="i-lucide-activity"
                class="size-7"
              />
            </div>
            <h3 class="text-xl font-bold text-white mb-3">
              Real-Time Seismic Detection
            </h3>
            <p class="text-sm text-slate-400 leading-relaxed">
              Mendeteksi gelombang P secara instan beberapa detik sebelum kedatangan gelombang S yang destruktif, memberikan jendela waktu evakuasi berharga dan aktivasi protokol keselamatan otomatis.
            </p>
          </div>

          <div class="p-8 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-cyan-400/50 hover:bg-slate-900 transition-all duration-300 shadow-xl group">
            <div class="size-14 rounded-2xl bg-cyan-500/15 text-cyan-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-cyan-400/30">
              <UIcon
                name="i-lucide-gauge"
                class="size-7"
              />
            </div>
            <h3 class="text-xl font-bold text-white mb-3">
              Structural Health Telemetry
            </h3>
            <p class="text-sm text-slate-400 leading-relaxed">
              Pemantauan kontinu mikro-regangan (*micro-strain*), frekuensi alami, pergeseran sudut, dan defleksi jembatan serta gedung untuk mendeteksi kelelahan material jauh sebelum terjadi kegagalan struktur.
            </p>
          </div>

          <div class="p-8 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-emerald-400/50 hover:bg-slate-900 transition-all duration-300 shadow-xl group">
            <div class="size-14 rounded-2xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-emerald-400/30">
              <UIcon
                name="i-lucide-bell-ring"
                class="size-7"
              />
            </div>
            <h3 class="text-xl font-bold text-white mb-3">
              Instant Automated Intervention
            </h3>
            <p class="text-sm text-slate-400 leading-relaxed">
              Integrasi langsung ke Building Management System (BMS) untuk mematikan katup pipa gas, memutus pasokan listrik bertegangan tinggi, memarkir lift darurat, dan membunyikan alarm multi-saluran.
            </p>
          </div>
        </div>

        <!-- Comparison Matrix Section -->
        <div class="mt-20">
          <WebComparisonMatrix />
        </div>
      </div>
    </section>

    <!-- 3. ABOUT AMTI & REAL INFRASTRUCTURE GALLERY (from about.html) -->
    <section
      id="about"
      class="py-20 bg-slate-900 text-white relative border-t border-slate-800/80"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <!-- Text Content -->
          <div class="lg:col-span-6 space-y-6">
            <span class="text-xs font-bold uppercase tracking-widest text-[#A7E629] block font-mono">
              Tentang Solusi Kami
            </span>

            <h2 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              We provide advanced <br>
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-[#A7E629]">
                SHMS & EEWS solutions
              </span>
            </h2>

            <div class="w-16 h-1 bg-[#A7E629] rounded-full" />

            <div class="space-y-4 text-base text-slate-300 leading-relaxed">
              <p>
                Our SHMS (Structure Health Monitoring System) and EEWS (Earthquake Early Warning System) solutions are designed to ensure the safety and integrity of critical infrastructure across various regions.
              </p>
              <p>
                Through real-time monitoring and advanced alert systems, our technology helps detect structural changes and seismic activity early, allowing timely intervention and minimizing risks.
              </p>
            </div>

            <!-- Two Highlights -->
            <div class="grid grid-cols-2 gap-4 pt-2">
              <div class="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                <span class="text-2xl font-extrabold text-[#A7E629] block font-mono">100%</span>
                <span class="text-xs text-slate-400 font-medium">Real-Time Sensor Monitoring</span>
              </div>
              <div class="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                <span class="text-2xl font-extrabold text-cyan-400 block font-mono">Seconds</span>
                <span class="text-xs text-slate-400 font-medium">P-Wave Early Notification</span>
              </div>
            </div>
          </div>

          <!-- Real Image Showcase Grid from about.html -->
          <div class="lg:col-span-6">
            <div class="grid grid-cols-2 gap-4">
              <!-- Item 1: Cipali -->
              <div class="space-y-2 group">
                <div class="aspect-4/3 rounded-2xl overflow-hidden shadow-xl bg-slate-950 border border-slate-800">
                  <img
                    src="/amti/img/about/jembatan_cipali.JPG"
                    alt="Jembatan Cipali Monitoring"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  >
                </div>
                <span class="text-xs font-semibold text-slate-300 block">Jembatan Cipali</span>
              </div>

              <!-- Item 2: Kedang Pahu -->
              <div class="space-y-2 group">
                <div class="aspect-4/3 rounded-2xl overflow-hidden shadow-xl bg-slate-950 border border-slate-800">
                  <img
                    src="/amti/img/about/kedang_pahu.jpg"
                    alt="Jembatan Kedang Pahu"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  >
                </div>
                <span class="text-xs font-semibold text-slate-300 block">Jembatan Kedang Pahu</span>
              </div>

              <!-- Item 3: Astra -->
              <div class="space-y-2 group">
                <div class="aspect-4/3 rounded-2xl overflow-hidden shadow-xl bg-slate-950 border border-slate-800">
                  <img
                    src="/amti/img/about/astra.JPG"
                    alt="Astra Industrial Asset"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  >
                </div>
                <span class="text-xs font-semibold text-slate-300 block">Fasilitas Astra</span>
              </div>

              <!-- Item 4: Monitoring Setup -->
              <div class="space-y-2 group">
                <div class="aspect-4/3 rounded-2xl overflow-hidden shadow-xl bg-slate-950 border border-slate-800">
                  <img
                    src="/amti/img/about/monitoring.JPG"
                    alt="Sensor Deployment Diagnostics"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  >
                </div>
                <span class="text-xs font-semibold text-slate-300 block">Sensor Diagnostics</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 4. LEADING ASSET MONITORING SOLUTION (HARDWARE & SOFTWARE from about.html) -->
    <section
      id="solution"
      class="py-20 bg-slate-950 text-white border-t border-slate-800/80"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto mb-14">
          <span class="text-xs font-bold uppercase tracking-widest text-[#A7E629] block font-mono">
            Arsitektur Solusi
          </span>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
            Leading Asset Monitoring Solution
          </h2>
          <p class="text-base text-slate-400 mt-3">
            Kombinasi perangkat keras plug-and-play andal dan perangkat lunak analitik mutakhir untuk perlindungan menyeluruh.
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Hardware Card -->
          <div class="p-8 sm:p-10 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl relative overflow-hidden group hover:border-[#A7E629]/40 transition-all duration-300">
            <div class="size-14 rounded-2xl bg-[#A7E629]/15 text-[#A7E629] flex items-center justify-center mb-6 border border-[#A7E629]/30">
              <UIcon
                name="i-lucide-cpu"
                class="size-7"
              />
            </div>

            <h3 class="text-xl sm:text-2xl font-bold text-white mb-3">
              Effortless <span class="text-[#A7E629]">plug-and-play</span> deployment
            </h3>

            <p class="text-sm text-slate-300 mb-6">
              Kemudahan instalasi tanpa kerumitan infrastruktur tambahan, dirancang untuk efisiensi implementasi di berbagai sektor.
            </p>

            <ul class="space-y-3.5 text-sm text-slate-300">
              <li class="flex items-start gap-3">
                <UIcon
                  name="i-lucide-check-circle"
                  class="size-5 text-[#A7E629] shrink-0 mt-0.5"
                />
                <span>Deploy without technical expertise</span>
              </li>
              <li class="flex items-start gap-3">
                <UIcon
                  name="i-lucide-check-circle"
                  class="size-5 text-[#A7E629] shrink-0 mt-0.5"
                />
                <span>Seamlessly integrates with diverse machinery</span>
              </li>
              <li class="flex items-start gap-3">
                <UIcon
                  name="i-lucide-check-circle"
                  class="size-5 text-[#A7E629] shrink-0 mt-0.5"
                />
                <span>Independent of external systems or integrations</span>
              </li>
            </ul>
          </div>

          <!-- Software Card -->
          <div class="p-8 sm:p-10 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl relative overflow-hidden group hover:border-cyan-400/40 transition-all duration-300">
            <div class="size-14 rounded-2xl bg-cyan-500/15 text-cyan-400 flex items-center justify-center mb-6 border border-cyan-400/30">
              <UIcon
                name="i-lucide-layout-dashboard"
                class="size-7"
              />
            </div>

            <h3 class="text-xl sm:text-2xl font-bold text-white mb-3">
              Immediate insights with <span class="text-cyan-400">advanced software</span>
            </h3>

            <p class="text-sm text-slate-300 mb-6">
              Platform telemetri terpadu dengan algoritma pengolahan data presisi tinggi untuk pengambilan keputusan cepat dan tepat.
            </p>

            <ul class="space-y-3.5 text-sm text-slate-300">
              <li class="flex items-start gap-3">
                <UIcon
                  name="i-lucide-check-circle"
                  class="size-5 text-cyan-400 shrink-0 mt-0.5"
                />
                <span>Real-time asset data visualization</span>
              </li>
              <li class="flex items-start gap-3">
                <UIcon
                  name="i-lucide-check-circle"
                  class="size-5 text-cyan-400 shrink-0 mt-0.5"
                />
                <span>Enhanced analysis with cutting-edge algorithms</span>
              </li>
              <li class="flex items-start gap-3">
                <UIcon
                  name="i-lucide-check-circle"
                  class="size-5 text-cyan-400 shrink-0 mt-0.5"
                />
                <span>Comprehensive system-level performance tracking</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- 5. COMPANY PROFILE VIDEO -->
    <section
      id="company-profile"
      class="py-24 bg-slate-900 text-white relative overflow-hidden border-t border-slate-800"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <span class="text-xs font-bold uppercase tracking-widest text-[#A7E629] block font-mono">
            Mengenal Lebih Dekat
          </span>
          <h2 class="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            COMPANY PROFILE
          </h2>
          <p class="text-slate-300 text-sm sm:text-base leading-relaxed">
            Saksikan paparan komprehensif mengenai visi, kapabilitas teknologi, serta komitmen AMTI dalam melindungi infrastruktur nasional.
          </p>
        </div>

        <WebVideoModal />
      </div>
    </section>

    <!-- 6. WHY CHOOSE US -->
    <section
      id="why-us"
      class="py-20 bg-slate-950 text-white relative overflow-hidden border-t border-slate-800"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="text-center mb-14">
          <span class="text-xs font-bold uppercase tracking-widest text-[#A7E629] block font-mono mb-1">
            Nilai Keunggulan
          </span>
          <h2 class="text-3xl sm:text-4xl font-extrabold tracking-tight">
            <span>WHY</span> <span class="text-[#A7E629]">CHOOSE US?</span>
          </h2>
          <p class="text-slate-400 text-sm mt-2 max-w-xl mx-auto">
            Empat pilar utama yang mendasari setiap inovasi dan layanan pemantauan dari AMTI.
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <!-- 4 Pillars -->
          <div class="lg:col-span-7 space-y-4">
            <div class="flex items-start gap-5 p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-[#A7E629]/50 transition-all duration-200">
              <div class="size-12 rounded-xl bg-[#A7E629]/15 flex items-center justify-center shrink-0 p-2.5">
                <img
                  src="/amti/img/icon/technology.png"
                  alt="Superior Technology"
                  class="size-full object-contain"
                >
              </div>
              <div class="space-y-1">
                <h3 class="text-lg font-bold text-white tracking-wide">
                  SUPERIOR TECHNOLOGY
                </h3>
                <p class="text-sm text-slate-300 leading-relaxed">
                  We use the latest technology to ensure the best and fastest solutions in every aspect of our services.
                </p>
              </div>
            </div>

            <div class="flex items-start gap-5 p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-[#A7E629]/50 transition-all duration-200">
              <div class="size-12 rounded-xl bg-[#A7E629]/15 flex items-center justify-center shrink-0 p-2.5">
                <img
                  src="/amti/img/icon/customer_driven.png"
                  alt="Customer Driven"
                  class="size-full object-contain"
                >
              </div>
              <div class="space-y-1">
                <h3 class="text-lg font-bold text-white tracking-wide">
                  CUSTOMER DRIVEN
                </h3>
                <p class="text-sm text-slate-300 leading-relaxed">
                  You are our top priority. We focus on delivering service that exceeds your expectations.
                </p>
              </div>
            </div>

            <div class="flex items-start gap-5 p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-[#A7E629]/50 transition-all duration-200">
              <div class="size-12 rounded-xl bg-[#A7E629]/15 flex items-center justify-center shrink-0 p-2.5">
                <img
                  src="/amti/img/icon/listenncares.png"
                  alt="Our Solutions Listens"
                  class="size-full object-contain"
                >
              </div>
              <div class="space-y-1">
                <h3 class="text-lg font-bold text-white tracking-wide">
                  OUR SOLUTIONS LISTENS
                </h3>
                <p class="text-sm text-slate-300 leading-relaxed">
                  Our solutions work efficiently and care about your needs. We aim to make a positive impact.
                </p>
              </div>
            </div>

            <div class="flex items-start gap-5 p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-[#A7E629]/50 transition-all duration-200">
              <div class="size-12 rounded-xl bg-[#A7E629]/15 flex items-center justify-center shrink-0 p-2.5">
                <img
                  src="/amti/img/icon/personalized_service.png"
                  alt="Personalized For You"
                  class="size-full object-contain"
                >
              </div>
              <div class="space-y-1">
                <h3 class="text-lg font-bold text-white tracking-wide">
                  PERSONALIZED FOR YOU
                </h3>
                <p class="text-sm text-slate-300 leading-relaxed">
                  Each of our solutions is tailored to your personal needs and specifications.
                </p>
              </div>
            </div>
          </div>

          <!-- Image Column -->
          <div class="lg:col-span-5 flex justify-center">
            <div class="rounded-3xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-900 p-2 max-w-md w-full">
              <img
                src="/amti/img/index/why-choose-us.png"
                alt="Why Choose Us"
                class="w-full h-auto object-cover rounded-2xl"
              >
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 7. MISSION & VALUES -->
    <section class="py-20 bg-slate-900 text-white border-t border-slate-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto mb-14">
          <span class="text-xs font-bold uppercase tracking-widest text-[#A7E629] block font-mono mb-1">
            Komitmen Profesional
          </span>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Our Mission & Values
          </h2>
          <p class="text-base text-slate-400 mt-2">
            Guided by our commitment to excellence and innovation.
          </p>
        </div>

        <div class="bg-slate-950 rounded-3xl p-8 sm:p-12 shadow-2xl border border-slate-800">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <!-- Mission -->
            <div class="lg:col-span-6 lg:pr-8 lg:border-r lg:border-slate-800 space-y-4">
              <div class="flex items-center gap-3">
                <div class="size-11 rounded-xl bg-[#2D4E6F] text-white flex items-center justify-center shrink-0">
                  <UIcon
                    name="i-lucide-target"
                    class="size-6 text-[#A7E629]"
                  />
                </div>
                <h3 class="text-2xl font-bold text-white">
                  Our Mission
                </h3>
              </div>
              <p class="text-slate-300 leading-relaxed text-base">
                To protect lives, assets, and infrastructure through innovative monitoring solutions that provide early warning and comprehensive structural health assessment.
              </p>
              <p class="text-slate-300 leading-relaxed text-base">
                We are dedicated to making communities and critical infrastructure more resilient against natural disasters and structural failures through cutting-edge technology and expertise.
              </p>
            </div>

            <!-- Values -->
            <div class="lg:col-span-6 lg:pl-4 space-y-4">
              <div class="flex items-center gap-3">
                <div class="size-11 rounded-xl bg-emerald-950 border border-emerald-800 text-emerald-400 flex items-center justify-center shrink-0">
                  <UIcon
                    name="i-lucide-sparkles"
                    class="size-6"
                  />
                </div>
                <h3 class="text-2xl font-bold text-white">
                  Our Values
                </h3>
              </div>

              <div class="space-y-3 text-sm">
                <div>
                  <h4 class="font-bold text-white text-base">
                    Innovation
                  </h4>
                  <p class="text-slate-400">
                    Continuously developing and refining our technology to provide the most advanced solutions.
                  </p>
                </div>

                <div>
                  <h4 class="font-bold text-white text-base">
                    Reliability
                  </h4>
                  <p class="text-slate-400">
                    Building systems that perform consistently under all conditions, especially during critical events.
                  </p>
                </div>

                <div>
                  <h4 class="font-bold text-white text-base">
                    Excellence
                  </h4>
                  <p class="text-slate-400">
                    Maintaining the highest standards in everything we do, from engineering to customer service.
                  </p>
                </div>

                <div>
                  <h4 class="font-bold text-white text-base">
                    Integrity
                  </h4>
                  <p class="text-slate-400">
                    Operating with transparency, honesty, and accountability in all our relationships.
                  </p>
                </div>

                <div>
                  <h4 class="font-bold text-white text-base">
                    Impact
                  </h4>
                  <p class="text-slate-400">
                    Measuring our success by the tangible difference we make in protecting lives and assets.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 8. CLIENT LOGOS -->
    <WebClientLogos />

    <!-- 9. FAQ SECTION -->
    <section
      id="faq"
      class="py-20 bg-slate-950 border-t border-slate-800"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span class="text-xs font-bold uppercase tracking-widest text-[#A7E629] block font-mono">
            Tanya Jawab
          </span>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            We have answers to all your questions
          </h2>
          <p class="text-slate-400 text-sm">
            Kumpulan jawaban untuk pertanyaan umum seputar sistem pemantauan dan implementasi di lapangan.
          </p>
        </div>

        <WebFaqAccordion />
      </div>
    </section>

    <!-- 10. CALL TO ACTION -->
    <WebContactCta />
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Asset Monitoring Teknologi Indonesia (AMTI) | EEWS & SHMS',
  description: 'Earthquake Early Warning System (EEWS) & Structure Health Monitoring System (SHMS). Protect Your Assets with 24/7 Real-Time Sensor-Based Monitoring.',
  ogTitle: 'Asset Monitoring Teknologi Indonesia (AMTI)',
  ogDescription: 'Earthquake Early Warning System (EEWS) & Structure Health Monitoring System (SHMS) 24/7 Real-Time Monitoring.'
})
</script>
