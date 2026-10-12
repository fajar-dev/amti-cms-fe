<template>
  <div class="relative overflow-hidden">
    <!-- 1. HERO SECTION WITH BACKGROUND VIDEO -->
    <section class="relative min-h-[92vh] flex items-center justify-center bg-slate-950 text-white overflow-hidden pt-20 pb-16">
      <!-- Background Video & Overlay -->
      <div class="absolute inset-0 z-0 overflow-hidden">
        <video
          autoplay
          muted
          loop
          playsinline
          class="w-full h-full object-cover opacity-45 scale-105 transform filter saturate-125"
        >
          <source
            src="/amti/videos/home_amti.mp4"
            type="video/mp4"
          >
        </video>
        <!-- Layered Gradient Overlays for Depth & Readability -->
        <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/40" />
        <div class="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-transparent to-slate-950/80" />
        <div class="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-[#2D4E6F]/30 to-[#A7E629]/20 blur-3xl pointer-events-none rounded-full" />
      </div>

      <!-- Hero Content -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div class="max-w-4xl mx-auto text-center space-y-6">
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold tracking-wider uppercase text-slate-200">
            <span class="size-2 rounded-full bg-[#A7E629] animate-pulse" />
            24/7 Sensor-Based Asset Protection
          </div>

          <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] text-white">
            <span>Earthquake Early Warning &</span> <br>
            <span class="text-[#A7E629] drop-shadow-sm">Structure Health Monitoring System</span>
          </h1>

          <p class="text-lg sm:text-xl md:text-2xl text-slate-200 font-normal max-w-3xl mx-auto leading-relaxed">
            Protect Your Assets with 24/7 Real-Time Sensor-Based Monitoring
          </p>

          <!-- Action Buttons -->
          <div class="pt-4 flex flex-wrap items-center justify-center gap-4">
            <NuxtLink
              to="/eews"
              class="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-slate-950 bg-[#A7E629] hover:bg-[#bbf33e] shadow-lg shadow-[#A7E629]/25 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
            >
              <UIcon
                name="i-lucide-activity"
                class="size-5"
              />
              <span>Solusi EEWS</span>
            </NuxtLink>

            <NuxtLink
              to="/shms"
              class="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-white bg-[#2D4E6F] hover:bg-[#386088] border border-white/20 shadow-lg shadow-[#2D4E6F]/30 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
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
        </div>
      </div>

      <!-- Bottom SVG Curve Divider -->
      <div class="absolute bottom-0 inset-x-0 z-10">
        <WebCurveDivider
          type="wave"
          fill="#ffffff"
          height="h-10 sm:h-14 md:h-16"
        />
      </div>
    </section>

    <!-- 2. STAY AHEAD WITH SMART MONITORING -->
    <section class="py-16 sm:py-20 bg-white relative">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-3xl mx-auto text-center space-y-4">
          <span class="text-xs font-bold uppercase tracking-widest text-[#2D4E6F] block">
            Proteksi Dini & Andal
          </span>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Stay Ahead with Smart Monitoring
          </h2>
          <p class="text-base sm:text-lg text-slate-600 leading-relaxed">
            Our advanced system ensures real-time seismic detection, structural monitoring, instant alerts, and safeguarding your assets and lives. With state-of-the-art technology and trusted expertise, we empower you to prepare, respond, and recover effectively. Make safety your ultimate priority.
          </p>
        </div>

        <!-- 3 Feature Focus Highlights -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div class="p-8 rounded-2xl bg-slate-50/80 border border-slate-200/80 hover:border-[#2D4E6F]/30 hover:shadow-xl hover:shadow-slate-200/60 transition-all duration-300 group">
            <div class="size-12 rounded-xl bg-[#2D4E6F]/10 text-[#2D4E6F] flex items-center justify-center mb-5 group-hover:bg-[#2D4E6F] group-hover:text-white transition-colors duration-300">
              <UIcon
                name="i-lucide-activity"
                class="size-6"
              />
            </div>
            <h3 class="text-lg font-bold text-slate-900 mb-2">
              Real-Time Seismic Detection
            </h3>
            <p class="text-sm text-slate-600 leading-relaxed">
              Mendeteksi gelombang primer (P-Wave) secara instan sebelum kedatangan gelombang geser (S-Wave) yang merusak untuk memberi jeda evakuasi berharga.
            </p>
          </div>

          <div class="p-8 rounded-2xl bg-slate-50/80 border border-slate-200/80 hover:border-[#2D4E6F]/30 hover:shadow-xl hover:shadow-slate-200/60 transition-all duration-300 group">
            <div class="size-12 rounded-xl bg-[#2D4E6F]/10 text-[#2D4E6F] flex items-center justify-center mb-5 group-hover:bg-[#2D4E6F] group-hover:text-white transition-colors duration-300">
              <UIcon
                name="i-lucide-gauge"
                class="size-6"
              />
            </div>
            <h3 class="text-lg font-bold text-slate-900 mb-2">
              Structural Health Telemetry
            </h3>
            <p class="text-sm text-slate-600 leading-relaxed">
              Pemantauan regangan, getaran, kemiringan, dan pergeseran dinamis pada jembatan, gedung tinggi, dan infrastruktur strategis 24 jam sehari.
            </p>
          </div>

          <div class="p-8 rounded-2xl bg-slate-50/80 border border-slate-200/80 hover:border-[#2D4E6F]/30 hover:shadow-xl hover:shadow-slate-200/60 transition-all duration-300 group">
            <div class="size-12 rounded-xl bg-[#2D4E6F]/10 text-[#2D4E6F] flex items-center justify-center mb-5 group-hover:bg-[#2D4E6F] group-hover:text-white transition-colors duration-300">
              <UIcon
                name="i-lucide-bell-ring"
                class="size-6"
              />
            </div>
            <h3 class="text-lg font-bold text-slate-900 mb-2">
              Instant Automated Response
            </h3>
            <p class="text-sm text-slate-600 leading-relaxed">
              Integrasi langsung ke Building Management System untuk menutup katup gas, memutus arus listrik, menghentikan elevator, dan memicu alarm darurat.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 3. ABOUT SECTION & REAL INFRASTRUCTURE GALLERY (from about.html) -->
    <section
      id="about"
      class="py-20 bg-slate-50 border-t border-slate-200/70 relative"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <!-- Text Content -->
          <div class="lg:col-span-6 space-y-6">
            <span class="text-xs font-bold uppercase tracking-widest text-[#2D4E6F] block">
              Tentang Solusi Kami
            </span>

            <h2 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              We provide advanced <br>
              <span class="text-[#2D4E6F]">SHMS & EEWS</span> solutions
            </h2>

            <div class="w-16 h-1 bg-[#A7E629] rounded-full" />

            <div class="space-y-4 text-base text-slate-600 leading-relaxed">
              <p>
                Our SHMS (Structure Health Monitoring System) and EEWS (Earthquake Early Warning System) solutions are designed to ensure the safety and integrity of critical infrastructure across various regions.
              </p>
              <p>
                Through real-time monitoring and advanced alert systems, our technology helps detect structural changes and seismic activity early, allowing timely intervention and minimizing risks.
              </p>
            </div>

            <!-- Authentic Deployment Points -->
            <div class="grid grid-cols-2 gap-4 pt-2">
              <div class="p-4 rounded-xl bg-white border border-slate-200/80 shadow-sm">
                <span class="text-2xl font-extrabold text-[#2D4E6F] block">100%</span>
                <span class="text-xs text-slate-500 font-medium">Real-Time Sensor Monitoring</span>
              </div>
              <div class="p-4 rounded-xl bg-white border border-slate-200/80 shadow-sm">
                <span class="text-2xl font-extrabold text-[#2D4E6F] block">Seconds</span>
                <span class="text-xs text-slate-500 font-medium">P-Wave Early Notification</span>
              </div>
            </div>
          </div>

          <!-- Real Image Grid from about.html -->
          <div class="lg:col-span-6">
            <div class="grid grid-cols-2 gap-4">
              <!-- Item 1: Cipali -->
              <div class="space-y-2 group">
                <div class="aspect-4/3 rounded-2xl overflow-hidden shadow-md bg-slate-900 border border-slate-200">
                  <img
                    src="/amti/img/about/jembatan_cipali.JPG"
                    alt="Jembatan Cipali Monitoring"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  >
                </div>
                <span class="text-xs font-semibold text-slate-700 block">Jembatan Cipali</span>
              </div>

              <!-- Item 2: Kedang Pahu -->
              <div class="space-y-2 group">
                <div class="aspect-4/3 rounded-2xl overflow-hidden shadow-md bg-slate-900 border border-slate-200">
                  <img
                    src="/amti/img/about/kedang_pahu.jpg"
                    alt="Jembatan Kedang Pahu"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  >
                </div>
                <span class="text-xs font-semibold text-slate-700 block">Jembatan Kedang Pahu</span>
              </div>

              <!-- Item 3: Astra -->
              <div class="space-y-2 group">
                <div class="aspect-4/3 rounded-2xl overflow-hidden shadow-md bg-slate-900 border border-slate-200">
                  <img
                    src="/amti/img/about/astra.JPG"
                    alt="Astra Industrial Asset"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  >
                </div>
                <span class="text-xs font-semibold text-slate-700 block">Fasilitas Astra</span>
              </div>

              <!-- Item 4: Monitoring Setup -->
              <div class="space-y-2 group">
                <div class="aspect-4/3 rounded-2xl overflow-hidden shadow-md bg-slate-900 border border-slate-200">
                  <img
                    src="/amti/img/about/monitoring.JPG"
                    alt="Sensor Deployment Diagnostics"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  >
                </div>
                <span class="text-xs font-semibold text-slate-700 block">Sensor Diagnostics</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 4. LEADING ASSET MONITORING SOLUTION (HARDWARE & SOFTWARE from about.html) -->
    <section
      id="solution"
      class="py-20 bg-white"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto mb-14">
          <span class="text-xs font-bold uppercase tracking-widest text-[#2D4E6F] block">
            Teknologi Terintegrasi
          </span>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-1">
            Leading Asset Monitoring Solution
          </h2>
          <p class="text-base text-slate-600 mt-3">
            Kombinasi perangkat keras plug-and-play andal dan perangkat lunak analitik mutakhir untuk perlindungan menyeluruh.
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Hardware Card -->
          <div class="p-8 sm:p-10 rounded-3xl bg-slate-50 border border-slate-200/80 shadow-lg shadow-slate-200/40 relative overflow-hidden group hover:border-[#2D4E6F]/40 transition-all duration-300">
            <div class="size-12 rounded-2xl bg-[#2D4E6F] text-white flex items-center justify-center mb-6 shadow-md">
              <UIcon
                name="i-lucide-cpu"
                class="size-6 text-[#A7E629]"
              />
            </div>

            <h3 class="text-xl sm:text-2xl font-bold text-slate-900 mb-3">
              Effortless <span class="text-[#2D4E6F]">plug-and-play</span> deployment
            </h3>

            <p class="text-sm text-slate-600 mb-6">
              Kemudahan instalasi tanpa kerumitan infrastruktur tambahan, dirancang untuk efisiensi implementasi di berbagai sektor.
            </p>

            <ul class="space-y-3.5 text-sm text-slate-700">
              <li class="flex items-start gap-3">
                <UIcon
                  name="i-lucide-check-circle"
                  class="size-5 text-[#2D4E6F] shrink-0 mt-0.5"
                />
                <span>Deploy without technical expertise</span>
              </li>
              <li class="flex items-start gap-3">
                <UIcon
                  name="i-lucide-check-circle"
                  class="size-5 text-[#2D4E6F] shrink-0 mt-0.5"
                />
                <span>Seamlessly integrates with diverse machinery</span>
              </li>
              <li class="flex items-start gap-3">
                <UIcon
                  name="i-lucide-check-circle"
                  class="size-5 text-[#2D4E6F] shrink-0 mt-0.5"
                />
                <span>Independent of external systems or integrations</span>
              </li>
            </ul>
          </div>

          <!-- Software Card -->
          <div class="p-8 sm:p-10 rounded-3xl bg-slate-50 border border-slate-200/80 shadow-lg shadow-slate-200/40 relative overflow-hidden group hover:border-[#2D4E6F]/40 transition-all duration-300">
            <div class="size-12 rounded-2xl bg-[#2D4E6F] text-white flex items-center justify-center mb-6 shadow-md">
              <UIcon
                name="i-lucide-layout-dashboard"
                class="size-6 text-[#A7E629]"
              />
            </div>

            <h3 class="text-xl sm:text-2xl font-bold text-slate-900 mb-3">
              Immediate insights with <span class="text-[#2D4E6F]">advanced software</span>
            </h3>

            <p class="text-sm text-slate-600 mb-6">
              Platform telemetri terpadu dengan algoritma pengolahan data presisi tinggi untuk pengambilan keputusan cepat dan tepat.
            </p>

            <ul class="space-y-3.5 text-sm text-slate-700">
              <li class="flex items-start gap-3">
                <UIcon
                  name="i-lucide-check-circle"
                  class="size-5 text-[#2D4E6F] shrink-0 mt-0.5"
                />
                <span>Real-time asset data visualization</span>
              </li>
              <li class="flex items-start gap-3">
                <UIcon
                  name="i-lucide-check-circle"
                  class="size-5 text-[#2D4E6F] shrink-0 mt-0.5"
                />
                <span>Enhanced analysis with cutting-edge algorithms</span>
              </li>
              <li class="flex items-start gap-3">
                <UIcon
                  name="i-lucide-check-circle"
                  class="size-5 text-[#2D4E6F] shrink-0 mt-0.5"
                />
                <span>Comprehensive system-level performance tracking</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- 5. COMPANY PROFILE VIDEO SECTION -->
    <section
      id="company-profile"
      class="py-20 bg-slate-950 text-white relative overflow-hidden"
    >
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(45,78,111,0.25),transparent_70%)] pointer-events-none" />

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <span class="text-xs font-bold uppercase tracking-widest text-[#A7E629] block">
            Mengenal Lebih Dekat
          </span>
          <h2 class="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            COMPANY PROFILE
          </h2>
          <p class="text-slate-300 text-sm sm:text-base leading-relaxed">
            Saksikan paparan komprehensif mengenai visi, kapabilitas teknologi, serta komitmen AMTI dalam melindungi infrastruktur nasional.
          </p>
        </div>

        <!-- Embedded Video Component -->
        <WebVideoModal />
      </div>
    </section>

    <!-- 6. INNOVATIVE SOLUTIONS TEXT SECTION (from home.html) -->
    <section class="py-16 bg-white border-b border-slate-100">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <span class="text-xs font-bold uppercase tracking-widest text-[#2D4E6F] block">
          Infrastruktur Berkelanjutan
        </span>
        <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Innovative Solutions for Asset Safety and Monitoring
        </h2>
        <p class="text-slate-600 text-base sm:text-lg leading-relaxed">
          Asset Monitoring Teknologi Indonesia (AMTI) provides cutting-edge solutions to safeguard and sustain your infrastructure. With advanced technology, we deliver real-time seismic activity detection and early warnings to minimize risks. Our expertise empowers you to protect valuable assets, ensure efficient operations, and enhance resilience against potential disasters. Join us in building a safer and well-prepared future.
        </p>
      </div>
    </section>

    <!-- 7. WHY CHOOSE US SECTION (from home.html) -->
    <section
      id="why-us"
      class="py-20 bg-slate-900 text-white relative overflow-hidden"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="text-center mb-14">
          <h2 class="text-3xl sm:text-4xl font-extrabold tracking-tight">
            <span>WHY</span> <span class="text-[#A7E629]">CHOOSE US?</span>
          </h2>
          <p class="text-slate-400 text-sm mt-2 max-w-xl mx-auto">
            Empat nilai utama yang mendasari setiap inovasi dan layanan pemantauan dari AMTI.
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <!-- 4 Feature Items with Real Icons -->
          <div class="lg:col-span-7 space-y-6">
            <!-- 1: SUPERIOR TECHNOLOGY -->
            <div class="flex items-start gap-5 p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#A7E629]/40 hover:bg-white/10 transition-all duration-200">
              <div class="size-14 rounded-xl bg-white/10 flex items-center justify-center shrink-0 p-2.5">
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

            <!-- 2: CUSTOMER DRIVEN -->
            <div class="flex items-start gap-5 p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#A7E629]/40 hover:bg-white/10 transition-all duration-200">
              <div class="size-14 rounded-xl bg-white/10 flex items-center justify-center shrink-0 p-2.5">
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

            <!-- 3: OUR SOLUTIONS LISTENS -->
            <div class="flex items-start gap-5 p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#A7E629]/40 hover:bg-white/10 transition-all duration-200">
              <div class="size-14 rounded-xl bg-white/10 flex items-center justify-center shrink-0 p-2.5">
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

            <!-- 4: PERSONALIZED FOR YOU -->
            <div class="flex items-start gap-5 p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#A7E629]/40 hover:bg-white/10 transition-all duration-200">
              <div class="size-14 rounded-xl bg-white/10 flex items-center justify-center shrink-0 p-2.5">
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

          <!-- Image Column from home.html -->
          <div class="lg:col-span-5 flex justify-center">
            <div class="rounded-3xl overflow-hidden border border-white/15 shadow-2xl bg-slate-950/60 p-2 max-w-md w-full">
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

    <!-- 8. MISSION & VALUES (from about.html) -->
    <section class="py-20 bg-slate-50 border-t border-slate-200/80">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto mb-14">
          <span class="text-xs font-bold uppercase tracking-widest text-[#2D4E6F] block">
            Prinsip Fundamental
          </span>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-1">
            Our Mission & Values
          </h2>
          <p class="text-base text-slate-600 mt-2">
            Guided by our commitment to excellence and innovation.
          </p>
        </div>

        <div class="bg-white rounded-3xl p-8 sm:p-12 shadow-xl shadow-slate-200/50 border border-slate-200/70">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <!-- Mission -->
            <div class="lg:col-span-6 lg:pr-8 lg:border-r lg:border-slate-200 space-y-4">
              <div class="flex items-center gap-3">
                <div class="size-11 rounded-xl bg-[#2D4E6F]/10 text-[#2D4E6F] flex items-center justify-center shrink-0">
                  <UIcon
                    name="i-lucide-target"
                    class="size-6"
                  />
                </div>
                <h3 class="text-2xl font-bold text-slate-900">
                  Our Mission
                </h3>
              </div>
              <p class="text-slate-600 leading-relaxed text-base">
                To protect lives, assets, and infrastructure through innovative monitoring solutions that provide early warning and comprehensive structural health assessment.
              </p>
              <p class="text-slate-600 leading-relaxed text-base">
                We are dedicated to making communities and critical infrastructure more resilient against natural disasters and structural failures through cutting-edge technology and expertise.
              </p>
            </div>

            <!-- Values -->
            <div class="lg:col-span-6 lg:pl-4 space-y-5">
              <div class="flex items-center gap-3">
                <div class="size-11 rounded-xl bg-[#009838]/10 text-[#009838] flex items-center justify-center shrink-0">
                  <UIcon
                    name="i-lucide-sparkles"
                    class="size-6"
                  />
                </div>
                <h3 class="text-2xl font-bold text-slate-900">
                  Our Values
                </h3>
              </div>

              <div class="space-y-4 text-sm">
                <div>
                  <h4 class="font-bold text-slate-900 text-base">
                    Innovation
                  </h4>
                  <p class="text-slate-600">
                    Continuously developing and refining our technology to provide the most advanced solutions.
                  </p>
                </div>

                <div>
                  <h4 class="font-bold text-slate-900 text-base">
                    Reliability
                  </h4>
                  <p class="text-slate-600">
                    Building systems that perform consistently under all conditions, especially during critical events.
                  </p>
                </div>

                <div>
                  <h4 class="font-bold text-slate-900 text-base">
                    Excellence
                  </h4>
                  <p class="text-slate-600">
                    Maintaining the highest standards in everything we do, from engineering to customer service.
                  </p>
                </div>

                <div>
                  <h4 class="font-bold text-slate-900 text-base">
                    Integrity
                  </h4>
                  <p class="text-slate-600">
                    Operating with transparency, honesty, and accountability in all our relationships.
                  </p>
                </div>

                <div>
                  <h4 class="font-bold text-slate-900 text-base">
                    Impact
                  </h4>
                  <p class="text-slate-600">
                    Measuring our success by the tangible difference we make in protecting lives and assets.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 9. CLIENT LOGOS -->
    <WebClientLogos />

    <!-- 10. FAQ SECTION -->
    <section
      id="faq"
      class="py-20 bg-slate-50 border-t border-slate-200/70"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span class="text-xs font-bold uppercase tracking-widest text-[#2D4E6F] block">
            Pertanyaan Umum
          </span>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            We have answers to all your questions
          </h2>
          <p class="text-slate-600 text-sm">
            Kumpulan jawaban untuk pertanyaan umum seputar sistem pemantauan dan implementasi di lapangan.
          </p>
        </div>

        <WebFaqAccordion />
      </div>
    </section>

    <!-- 11. CALL TO ACTION SECTION -->
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
