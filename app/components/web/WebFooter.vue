<template>
  <footer class="bg-slate-950 text-slate-300 border-t border-slate-800/80 relative overflow-hidden">
    <!-- Subtle Ambient Top Glow -->
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-b from-[#2D4E6F]/20 via-[#A7E629]/5 to-transparent blur-3xl pointer-events-none" />

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative z-10">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
        <!-- Col 1: Brand Info -->
        <div class="lg:col-span-5 space-y-4">
          <div class="flex items-center gap-3">
            <img
              src="/logo-light.png"
              alt="AMTI Logo"
              class="h-11 w-auto"
            >
            <div>
              <span class="text-xl font-bold tracking-tight text-white block">
                AMTI
              </span>
              <span class="text-xs text-slate-400 font-medium tracking-wide uppercase">
                Asset Monitoring Teknologi Indonesia
              </span>
            </div>
          </div>

          <p class="text-sm text-slate-400 max-w-md leading-relaxed">
            Penyedia solusi terdepan untuk Earthquake Early Warning System (EEWS) & Structure Health Monitoring System (SHMS), melindungi aset, infrastruktur penting, dan keselamatan jiwa dengan pemantauan sensor real-time 24/7.
          </p>

          <div class="pt-2">
            <p class="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-3">
              Media Sosial Kami
            </p>
            <div class="flex items-center gap-2.5">
              <a
                href="https://www.instagram.com/amtiofficial/"
                target="_blank"
                rel="noopener noreferrer"
                class="size-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-[#A7E629] hover:bg-slate-800 transition-all duration-200"
                aria-label="Instagram AMTI"
              >
                <UIcon
                  name="i-lucide-instagram"
                  class="size-4"
                />
              </a>

              <a
                href="https://www.linkedin.com/company/asset-monitoring-teknologi-indonesia/about/"
                target="_blank"
                rel="noopener noreferrer"
                class="size-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-[#A7E629] hover:bg-slate-800 transition-all duration-200"
                aria-label="LinkedIn AMTI"
              >
                <UIcon
                  name="i-lucide-linkedin"
                  class="size-4"
                />
              </a>

              <a
                href="https://www.tiktok.com/@amti.solution?lang=id-ID"
                target="_blank"
                rel="noopener noreferrer"
                class="size-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-[#A7E629] hover:bg-slate-800 transition-all duration-200"
                aria-label="TikTok AMTI"
              >
                <UIcon
                  name="i-lucide-video"
                  class="size-4"
                />
              </a>

              <a
                href="https://wa.me/6281287456669?text=Halo%20AMTI,%20saya%20ingin%20konsultasi%20mengenai%20solusi%20monitoring."
                target="_blank"
                rel="noopener noreferrer"
                class="size-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-[#A7E629] hover:border-[#A7E629] hover:bg-slate-800 transition-all duration-200"
                aria-label="WhatsApp AMTI"
              >
                <UIcon
                  name="i-lucide-message-circle"
                  class="size-4"
                />
              </a>
            </div>
          </div>
        </div>

        <!-- Col 2: Navigation Links -->
        <div class="lg:col-span-3 space-y-4">
          <h4 class="text-sm font-semibold uppercase tracking-wider text-white">
            Solusi & Halaman
          </h4>
          <ul class="space-y-2.5 text-sm">
            <li>
              <NuxtLink
                to="/"
                class="text-slate-400 hover:text-[#A7E629] transition-colors flex items-center gap-2 group"
              >
                <UIcon
                  name="i-lucide-chevron-right"
                  class="size-3.5 text-slate-600 group-hover:text-[#A7E629] group-hover:translate-x-0.5 transition-all"
                />
                Home
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/eews"
                class="text-slate-400 hover:text-[#A7E629] transition-colors flex items-center gap-2 group"
              >
                <UIcon
                  name="i-lucide-chevron-right"
                  class="size-3.5 text-slate-600 group-hover:text-[#A7E629] group-hover:translate-x-0.5 transition-all"
                />
                EEWS (Earthquake Early Warning)
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/shms"
                class="text-slate-400 hover:text-[#A7E629] transition-colors flex items-center gap-2 group"
              >
                <UIcon
                  name="i-lucide-chevron-right"
                  class="size-3.5 text-slate-600 group-hover:text-[#A7E629] group-hover:translate-x-0.5 transition-all"
                />
                SHMS (Structure Health Monitoring)
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/#about"
                class="text-slate-400 hover:text-[#A7E629] transition-colors flex items-center gap-2 group"
              >
                <UIcon
                  name="i-lucide-chevron-right"
                  class="size-3.5 text-slate-600 group-hover:text-[#A7E629] group-hover:translate-x-0.5 transition-all"
                />
                Tentang Kami (About)
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/#why-us"
                class="text-slate-400 hover:text-[#A7E629] transition-colors flex items-center gap-2 group"
              >
                <UIcon
                  name="i-lucide-chevron-right"
                  class="size-3.5 text-slate-600 group-hover:text-[#A7E629] group-hover:translate-x-0.5 transition-all"
                />
                Keunggulan Solusi
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/#faq"
                class="text-slate-400 hover:text-[#A7E629] transition-colors flex items-center gap-2 group"
              >
                <UIcon
                  name="i-lucide-chevron-right"
                  class="size-3.5 text-slate-600 group-hover:text-[#A7E629] group-hover:translate-x-0.5 transition-all"
                />
                Tanya Jawab (FAQ)
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Col 3: Contact Info (Authentic AMTI Data) -->
        <div class="lg:col-span-4 space-y-4">
          <h4 class="text-sm font-semibold uppercase tracking-wider text-white">
            Kontak Kami
          </h4>
          <div class="space-y-3 text-sm text-slate-400">
            <div class="flex items-start gap-3">
              <UIcon
                name="i-lucide-map-pin"
                class="size-5 text-[#A7E629] shrink-0 mt-0.5"
              />
              <span>
                Victoria Office Park, Jl. Imam Bonjol Blok A2 No.30, Karawaci, Kota Tangerang 15115
              </span>
            </div>

            <div class="flex items-center gap-3">
              <UIcon
                name="i-lucide-phone"
                class="size-5 text-[#A7E629] shrink-0"
              />
              <a
                href="tel:+6281287456669"
                class="hover:text-white transition-colors"
              >
                +62 812-8745-6669
              </a>
            </div>

            <div class="flex items-center gap-3">
              <UIcon
                name="i-lucide-mail"
                class="size-5 text-[#A7E629] shrink-0"
              />
              <a
                href="mailto:amti.solution@gmail.com"
                class="hover:text-white transition-colors"
              >
                amti.solution@gmail.com
              </a>
            </div>
          </div>

          <div class="p-3.5 rounded-xl bg-slate-900 border border-slate-800/80 flex items-center justify-between mt-4">
            <div>
              <span class="text-xs text-slate-400 block font-medium">Platform Portal CMS</span>
              <span class="text-sm font-semibold text-white">Pengelolaan Sistem AMTI</span>
            </div>
            <NuxtLink
              to="/auth/sign-in"
              class="px-3 py-1.5 text-xs font-semibold rounded-md bg-[#2D4E6F] hover:bg-[#386088] text-white transition-colors"
            >
              Masuk
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Copyright & Bottom Bar -->
      <div class="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
        <p>© 2024 AMTI (Asset Monitoring Teknologi Indonesia). All Rights Reserved.</p>
        <div class="flex items-center gap-6">
          <NuxtLink
            to="/#about"
            class="hover:text-white transition-colors"
          >
            About Us
          </NuxtLink>
          <NuxtLink
            to="/#contact"
            class="hover:text-white transition-colors"
          >
            Contact
          </NuxtLink>
          <NuxtLink
            to="/auth/sign-in"
            class="hover:text-white transition-colors"
          >
            CMS Portal
          </NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>
