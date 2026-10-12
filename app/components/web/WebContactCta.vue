<template>
  <div
    id="contact"
    class="py-20 relative overflow-hidden bg-gradient-to-br from-[#121C28] via-[#1D334A] to-[#2D4E6F] text-white"
  >
    <!-- Background Glows & Pattern -->
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(167,230,41,0.15),transparent_50%)] pointer-events-none" />
    <div class="absolute -bottom-24 -left-24 w-96 h-96 bg-[#2D4E6F]/30 rounded-full blur-3xl pointer-events-none" />

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <!-- Text & Action Column -->
        <div class="lg:col-span-7 space-y-6">
          <span class="text-xs font-bold uppercase tracking-widest text-[#A7E629] block">
            Layanan Siaga & Solusi Cepat
          </span>

          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
            Having a problem? <br>
            <span class="text-[#A7E629]">We'll fix it for you!</span>
          </h2>

          <p class="text-slate-300 text-base sm:text-lg max-w-xl leading-relaxed">
            Reach out to us anytime, and let us fix your problems quickly and efficiently. Tim ahli kami siap memberikan solusi monitoring dan proteksi aset terbaik untuk kebutuhan Anda.
          </p>

          <!-- Contact Quick Cards -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <a
              href="https://wa.me/6281287456669?text=Halo%20AMTI,%20saya%20ingin%20konsultasi%20mengenai%20solusi%20monitoring%20aset."
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-3.5 p-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 hover:border-[#A7E629]/50 transition-all duration-200 group"
            >
              <div class="size-11 rounded-lg bg-[#A7E629] text-slate-900 flex items-center justify-center shrink-0 shadow-md">
                <UIcon
                  name="i-lucide-message-circle"
                  class="size-6"
                />
              </div>
              <div>
                <span class="text-xs text-slate-300 block font-medium">Chat WhatsApp</span>
                <span class="text-sm font-bold text-white group-hover:text-[#A7E629] transition-colors">
                  +62 812-8745-6669
                </span>
              </div>
            </a>

            <a
              href="mailto:amti.solution@gmail.com"
              class="flex items-center gap-3.5 p-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 hover:border-[#A7E629]/50 transition-all duration-200 group"
            >
              <div class="size-11 rounded-lg bg-[#2D4E6F] text-white flex items-center justify-center shrink-0 shadow-md border border-white/20">
                <UIcon
                  name="i-lucide-mail"
                  class="size-6 text-[#A7E629]"
                />
              </div>
              <div>
                <span class="text-xs text-slate-300 block font-medium">Kirim Email</span>
                <span class="text-sm font-bold text-white group-hover:text-[#A7E629] transition-colors truncate block max-w-[190px]">
                  amti.solution@gmail.com
                </span>
              </div>
            </a>
          </div>

          <!-- Address snippet -->
          <div class="pt-2 text-xs text-slate-300 flex items-center gap-2">
            <UIcon
              name="i-lucide-map-pin"
              class="size-4 text-[#A7E629] shrink-0"
            />
            <span>Victoria Office Park, Jl. Imam Bonjol Blok A2 No.30, Karawaci, Tangerang</span>
          </div>
        </div>

        <!-- Image Column -->
        <div class="lg:col-span-5 flex justify-center lg:justify-end">
          <div class="relative">
            <div class="absolute -inset-4 bg-gradient-to-r from-[#A7E629]/20 to-[#2D4E6F]/30 rounded-3xl blur-2xl transform rotate-3" />
            <div class="relative rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-slate-900/40 p-4">
              <img
                src="/amti/img/index/contact.png"
                alt="AMTI Engineer / Worker"
                class="w-full max-w-md h-auto object-cover rounded-xl"
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
