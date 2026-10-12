# AMTI CMS — Frontend (Nuxt 4 Dashboard) — Instructions for Gemini

Kamu adalah AI agent yang bekerja pada **AMTI CMS Frontend** (`amti-cms-fe`):
**Nuxt 4 (SPA) + NuxtUI v4 + Tailwind v4 + TypeScript + Zod**.

> ⚠️ **File ini sengaja dibuat SINGKAT dan tidak memuat aturan proyek.**
> Sebelumnya file ini masih berjudul proyek lain ("SIMAS — Sistem Management
> Asset") dan menyalin `CLAUDE.md` versi lama, lalu menyimpang darinya. Agar
> tidak terulang: **selalu baca sumber kanonik di bawah, jangan tambahkan
> salinan aturan di file ini.**

## Wajib dibaca sebelum menulis kode

| Urutan | File | Isi |
|--------|------|-----|
| 1 | `AGENTS.md` | Ringkasan aturan kritis (tech stack, larangan keras, struktur folder, design system, checklist fitur CRUD) — **format lintas-tool, isinya identik dengan `CLAUDE.md`** |
| 2 | `docs/i18n-guide.md` | **WAJIB** — aturan i18n untuk semua teks UI (English + Indonesia) |
| 3 | `docs/component-guide.md` | Pola modal, form, dan komponen |
| 4 | `docs/page-pattern.md` | Template halaman CRUD |
| 5 | `docs/service-layer.md` | Pola service, API client, tipe |
| 6 | `docs/coding-standards.md` | Konvensi kode lengkap |
| 7 | `docs/changelog.md` | Riwayat perubahan terbaru |

Dokumentasi lain ada di folder `docs/`.

## Ringkasan paling singkat

- Semua UI **wajib** memakai komponen NuxtUI (`UButton`, `UInput`, `UModal`, `UCard`, `UEmpty`, `UIcon`, …) — jangan tulis elemen native atau markup custom
- Semua teks yang tampil ke user **wajib** lewat `$t()` / `t()`, dengan key ditambahkan ke **KEDUA** `i18n/locales/en.json` dan `id.json`
- Modal **wajib** komponen terpisah di `app/components/<feature>/`
- Dilarang arbitrary Tailwind value (`px-[10px]`) — pakai skala standar (`px-2.5`)
- Dilarang `window.prompt` / `window.confirm` — pakai `UModal`
- Helper: fungsi murni → `app/utils/`; yang punya state → `app/composables/`
  (format tanggal/angka lewat `app/utils/format.ts`, upload gambar lewat `useImageUpload`)
- Selesai = `bun run typecheck` + `bun run lint` bersih + `docs/changelog.md` diperbarui
