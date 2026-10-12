<template>
  <div class="rounded-3xl bg-white border border-slate-200/80 p-6 sm:p-10 shadow-xl shadow-slate-200/50">
    <div class="text-center max-w-2xl mx-auto mb-10">
      <span class="text-xs font-bold uppercase tracking-widest text-[#2D4E6F] block mb-1">
        Perbandingan Efektivitas
      </span>
      <h3 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
        Inspeksi Manual vs Monitoring Sensor AMTI
      </h3>
      <p class="text-sm text-slate-600 mt-2">
        Mengapa pemantauan sensor otomatis 24/7 menjadi standar keselamatan infrastruktur modern.
      </p>
    </div>

    <div class="overflow-x-auto">
      <table class="w-full text-left text-sm border-collapse min-w-[600px]">
        <thead>
          <tr class="border-b border-slate-200">
            <th class="py-4 px-4 font-bold text-slate-700 w-1/3">
              Parameter
            </th>
            <th class="py-4 px-4 font-semibold text-slate-400 w-1/3 bg-slate-50/60 rounded-t-xl">
              Metode Manual Konvensional
            </th>
            <th class="py-4 px-4 font-bold text-[#2D4E6F] w-1/3 bg-[#2D4E6F]/5 border-t-2 border-[#2D4E6F] rounded-t-xl">
              Solusi Sensor AMTI (24/7)
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          <tr>
            <td class="py-4 px-4 font-semibold text-slate-800">
              Frekuensi Pemantauan
            </td>
            <td class="py-4 px-4 text-slate-500 bg-slate-50/60">
              Periodik (1 bulan s/d 1 tahun sekali)
            </td>
            <td class="py-4 px-4 font-semibold text-slate-900 bg-[#2D4E6F]/5 flex items-center gap-2">
              <UIcon
                name="i-lucide-check-circle"
                class="size-4 text-[#009838] shrink-0"
              />
              Kontinu Real-Time (200 data/detik)
            </td>
          </tr>

          <tr>
            <td class="py-4 px-4 font-semibold text-slate-800">
              Deteksi Gempa Bumi
            </td>
            <td class="py-4 px-4 text-slate-500 bg-slate-50/60">
              Tidak ada peringatan dini (pasif)
            </td>
            <td class="py-4 px-4 font-semibold text-slate-900 bg-[#2D4E6F]/5 flex items-center gap-2">
              <UIcon
                name="i-lucide-check-circle"
                class="size-4 text-[#009838] shrink-0"
              />
              Deteksi P-Wave instan (detik s/d menit)
            </td>
          </tr>

          <tr>
            <td class="py-4 px-4 font-semibold text-slate-800">
              Aksi Tanggap Darurat
            </td>
            <td class="py-4 px-4 text-slate-500 bg-slate-50/60">
              Tindakan manual manusia (rawan panik)
            </td>
            <td class="py-4 px-4 font-semibold text-slate-900 bg-[#2D4E6F]/5 flex items-center gap-2">
              <UIcon
                name="i-lucide-check-circle"
                class="size-4 text-[#009838] shrink-0"
              />
              Otomatisasi BMS, katup gas, lift, & alarm
            </td>
          </tr>

          <tr>
            <td class="py-4 px-4 font-semibold text-slate-800">
              Deteksi Kelelahan Struktur
            </td>
            <td class="py-4 px-4 text-slate-500 bg-slate-50/60">
              Hanya terlihat saat retak kasat mata
            </td>
            <td class="py-4 px-4 font-semibold text-slate-900 bg-[#2D4E6F]/5 flex items-center gap-2">
              <UIcon
                name="i-lucide-check-circle"
                class="size-4 text-[#009838] shrink-0"
              />
              Analisis mikro-regangan & frekuensi alami
            </td>
          </tr>

          <tr>
            <td class="py-4 px-4 font-semibold text-slate-800">
              Akurasi Laporan Pasca-Bencana
            </td>
            <td class="py-4 px-4 text-slate-500 bg-slate-50/60">
              Subjektif, butuh survei berminggu-minggu
            </td>
            <td class="py-4 px-4 font-semibold text-slate-900 bg-[#2D4E6F]/5 flex items-center gap-2">
              <UIcon
                name="i-lucide-check-circle"
                class="size-4 text-[#009838] shrink-0"
              />
              Laporan telemetri kuantitatif instan
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
