# Nuxt Boilerplate — Admin Dashboard (Nuxt 4)

> **BACA SEMUA INSTRUKSI INI SEBELUM MENULIS KODE APAPUN.**
> Dokumentasi lengkap ada di folder `docs/`. File ini adalah ringkasan aturan kritis.
>
> File ini (`AGENTS.md`) adalah format standar lintas-tool (Cursor, Codex CLI, Copilot, Aider, dll).
> Untuk Claude Code, isi yang sama juga tersedia di `CLAUDE.md` (auto-loaded oleh Claude Code).
> **Kedua file harus tetap sinkron** — kalau salah satu diubah, update yang satunya juga.

## Tech Stack

- **Nuxt 4** (`^4.4.6`) — SSR disabled, SPA mode
- **NuxtUI v4** (`@nuxt/ui ^4.7.1`) — **WAJIB digunakan untuk semua UI**
- **@nuxtjs/i18n** (`^10.6.0`) — **WAJIB untuk semua teks UI** (English + Bahasa Indonesia)
- **Tailwind CSS v4** (`^4.3.0`) — Utility-first CSS
- **Zod v4** (`^4.4.3`) — Schema validation untuk forms
- **Axios** (`^1.16.1`) — HTTP client
- **nuxt-charts** (`^3.1.0`) — Chart dashboard (`AreaChart`, `BarChart`, `DonutChart`)
- **TypeScript** (`^6.0.3`) — Strict mode
- **Bun** (`1.3.1`) — Package manager
- **Icons**: `@iconify-json/lucide` — Prefix: `i-lucide-*`

## Setup & Commands

```bash
bun install       # install dependencies
bun run dev       # dev server (http://localhost:3000)
bun run build     # production build
bun run typecheck # nuxt typecheck (vue-tsc) — jalankan sebelum menganggap task selesai
bun run lint      # eslint
```

Tidak ada test runner otomatis di project ini saat ini. Verifikasi perubahan lewat `bun run typecheck` + `bun run lint` + cek visual di browser (dev server).

## ⛔ LARANGAN KERAS

### 1. DILARANG Hardcode CSS / Arbitrary Values

```
❌ DILARANG: px-[10px], m-[5px], w-[200px], h-[50vh], text-[14px], gap-[12px], max-w-[420px]
✅ GUNAKAN:  px-2.5,    m-1,     w-52,      h-screen,  text-sm,     gap-3,      max-w-md
```

### 2. WAJIB Gunakan NuxtUI Components

| Kebutuhan | Gunakan | JANGAN Gunakan |
|-----------|---------|----------------|
| Button | `<UButton>` | `<button class="...">` |
| Input | `<UInput>` | `<input class="...">` |
| Select | `<USelect>` / `<USelectMenu>` | `<select>` |
| Form | `<UForm>` + `<UFormField>` | Custom validation |
| Modal | `<UModal>` | Custom modal |
| Table | `<UTable>` | Custom table / `<table>` |
| Dropdown | `<UDropdownMenu>` | Custom dropdown |
| Pagination | `<UPagination>` | Custom pagination |
| Toast | `useToast()` | Custom notification |
| Icon | `<UIcon name="i-lucide-xxx">` | Inline SVG (kecuali brand) |
| Avatar | `<UAvatar>` | `<img class="rounded-full">` |
| Tooltip | `<UTooltip>` | Custom tooltip |
| Popover | `<UPopover>` | Custom popover |
| Alert | `<UAlert>` | Custom alert |
| Separator | `<USeparator>` | `<hr>` |
| Card | `<UCard>` | Custom card |
| Textarea | `<UTextarea>` | `<textarea>` |
| Checkbox | `<UCheckbox>` | `<input type="checkbox">` |
| Switch | `<USwitch>` | Custom toggle |
| Badge | `<UBadge>` | Custom badge span |
| Tabs | `<UTabs>` | Custom tabs |
| Breadcrumb | `<UBreadcrumb>` | Custom breadcrumb |
| Skeleton | `<USkeleton>` | Custom loading |
| Empty state | `<UEmpty>` | Custom "no data" div |
| Upload file | `<UFileUpload>` | `<input type="file">` |

Daftar lengkap 125+ komponen: baca `docs/nuxtui-components.md`

### 3. Modal HARUS Component Terpisah

```
❌ SALAH:  Menulis modal inline di page
✅ BENAR:  Buat file di app/components/<feature>/AddModal.vue
           Lalu panggil: <FeatureAddModal v-model="showModal" @created="fetchData" />
```

### 4. DILARANG Menambah Library Tanpa Alasan Kuat

Jangan install package baru jika NuxtUI/Tailwind sudah bisa menangani kebutuhan tersebut.

### 5. DILARANG Hardcode Teks UI (Wajib i18n)

```
❌ SALAH:  <UButton>Save</UButton>
✅ BENAR:  <UButton>{{ $t('common.save') }}</UButton>
           <UFormField :label="$t('components.faq.addModal.questionLabel')">
```

Semua teks yang tampil ke user (label, placeholder, judul, toast, pesan validasi Zod, `aria-label`)
**WAJIB** lewat `$t()` (template) / `t()` dari `useI18n()` (script), dengan key ditambahkan ke
**KEDUA** `i18n/locales/en.json` dan `i18n/locales/id.json`.

Baca `docs/i18n-guide.md` untuk aturan lengkap SEBELUM menulis teks apapun di UI.

### 6. WAJIB Tandai `required` di UFormField untuk Field Wajib

```
❌ SALAH:  <UFormField :label="..." name="email">
✅ BENAR:  <UFormField :label="..." name="email" required>
```

Setiap `<UFormField>` untuk field yang wajib diisi di Zod schema (bukan `.optional()`/`.nullable()`) **WAJIB**
diberi atribut `required` (menampilkan tanda `*` otomatis). Field opsional (switch/toggle, atau field yang
eksplisit `.optional()`) **jangan** diberi `required`. Baca `docs/component-guide.md` §"Aturan: `required`
di UFormField" untuk detail & kasus khusus (mis. password opsional di update modal).

### 7. WAJIB Format Tanggal/Angka Lewat `app/utils/format.ts`

```
❌ SALAH:  {{ new Date(item.createdAt).toLocaleDateString('id-ID') }}
✅ BENAR:  {{ formatDate(item.createdAt, locale) }}   // `locale` dari useI18n()
```

Jangan panggil `toLocaleDateString` / `toLocaleString` / `Intl.*` langsung di halaman atau komponen. Semua
format tanggal, tanggal-waktu, dan angka WAJIB lewat util di `app/utils/format.ts` (`formatDate`,
`formatDateTime`, `formatNumber`, `formatTimeAgo`).

Alasan historis: dulu tiap halaman memanggil `toLocaleDateString` sendiri dengan locale hardcode — separuh
`'en-US'`, separuh `'id-ID'` — sehingga dua tabel bisa menampilkan format berbeda pada bahasa yang sama.

### 8. WAJIB Upload/Preview Gambar Lewat `useImageUpload`

```
❌ SALAH:  URL.createObjectURL(file) + panggil service.upload() manual di dalam modal
✅ BENAR:  const { isUploading, previewUrl, uploadFile, clearPreview, setPreviewFromUrl } =
             useImageUpload({ upload, onUploaded, successMessage, errorMessage })
```

`app/composables/useImageUpload.ts` adalah cara BAKU alur "pilih file → preview lokal → upload → simpan path →
rollback bila gagal". Composable ini **selalu** me-revoke object URL dan **selalu** me-rollback preview saat
upload gagal. Jangan panggil `URL.createObjectURL` langsung dari modal/halaman (pakai `app/utils/file.ts`
hanya dari dalam composable tersebut).

### 9. DILARANG `window.prompt` / `window.confirm`

Input dari user (termasuk URL link/gambar di editor Tiptap) WAJIB lewat modal NuxtUI. Dialog bawaan browser
tidak bisa memakai i18n, tidak punya validasi, dan tidak bisa di-style. Contoh nyata:
`app/components/common/EditorUrlModal.vue` — pengganti `window.prompt` di `TiptapEditor.vue`.

## Struktur Folder

```
app/
├── components/          # Auto-imported components
│   ├── BrandLogo.vue    # Global: logo + nama app
│   ├── Header.vue       # Global: page header (title, tabs, actions)
│   ├── Sidebar.vue      # Global: sidebar navigasi (collapsible)
│   ├── LanguageSwitcher.vue # Global: switch bahasa (di pojok kanan atas)
│   ├── UserPopover.vue  # Global: user profile dropdown
│   ├── DeleteModal.vue  # Global: generic delete confirmation
│   ├── DataTable.vue    # Global: tabel + search + pagination + empty state bawaan
│   ├── common/          # Dipakai lintas fitur
│   │   ├── SortableHeader.vue  # Header kolom yang bisa diklik (via useTableQuery().sortHeader)
│   │   ├── EditorUrlModal.vue  # Modal input URL link/gambar untuk editor Tiptap
│   │   └── TiptapEditor.vue    # Rich text editor
│   ├── content/         # Komponen modul CMS
│   │   ├── ArticleForm.vue     # Form artikel bersama untuk halaman create & edit
│   │   └── category/           # AddModal.vue, UpdateModal.vue
│   └── <feature>/       # Feature-specific components
│       ├── AddModal.vue      → <FeatureAddModal />
│       ├── UpdateModal.vue   → <FeatureUpdateModal />
│       └── DeleteModal.vue   → <FeatureDeleteModal /> (opsional)
├── composables/         # Auto-imported — BOLEH punya state/reaktif
│   ├── useAuth.ts       # Auth state (readonly)
│   ├── useNavigation.ts # Sidebar nav config (reaktif terhadap locale, lihat docs/i18n-guide.md)
│   ├── usePermission.ts # Cek permission RBAC (can(...))
│   ├── useTableQuery.ts # State search/page/perPage/sort + sortHeader()
│   ├── useImageUpload.ts# Alur upload + preview gambar (cara baku, lihat Larangan #8)
│   └── error-helper.ts  # Global error handler
├── utils/               # Auto-imported — HANYA fungsi murni, TANPA state reaktif
│   ├── slug.ts          # slugify()
│   ├── format.ts        # formatDate/formatDateTime/formatNumber/formatTimeAgo
│   ├── file.ts          # createPreviewUrl/revokePreviewUrl
│   ├── payload.ts       # trimOrNull/trimRequired
│   ├── html.ts          # isEmptyHtml()
│   └── chart-colors.ts  # CHART_COLORS/CHART_CATEGORY_PALETTE (token design system)
├── layouts/
│   ├── dashboard.vue    # Sidebar + main content
│   └── auth.vue         # Split-screen auth
├── middleware/
│   ├── auth.global.ts   # Protected route guard
│   └── guest.ts         # Guest-only route guard
├── pages/
│   ├── index.vue        # Redirect to /app
│   ├── auth/            # Auth pages (layout: auth, middleware: guest)
│   └── app/             # Application / dashboard pages (layout: dashboard)
│       ├── index.vue    # Dashboard (/app)
│       └── <feature>/
│           └── index.vue# CRUD listing page (/app/<feature>)
├── services/
│   ├── api-service.ts   # Axios base client + interceptors
│   ├── auth-service.ts  # Auth methods
│   └── <feature>-service.ts  # CRUD service
└── types/
    ├── api.d.ts         # ApiResponse + PaginationMeta (shared)
    ├── auth.d.ts        # User, AuthData (re-export ApiResponse)
    └── <feature>.d.ts   # Feature types + payload

i18n/
└── locales/
    ├── en.json           # WAJIB sinkron dengan id.json (lihat docs/i18n-guide.md)
    └── id.json
```

**Catatan `composables/` vs `utils/`** — pembagian tanggung jawabnya tegas:

- **`app/utils/`** → fungsi murni (input → output, tanpa `ref`/`computed`/lifecycle). Contoh: `slugify()`,
  `formatDate()`, `isEmptyHtml()`.
- **`app/composables/`** → apa pun yang punya state atau reaktivitas (`ref`, `computed`, `useState`,
  `onBeforeUnmount`). Contoh: `useImageUpload()`.

Keduanya sama-sama di-auto-import Nuxt (tidak perlu `import` manual). Konvensi file: **kebab-case, satu concern
per file** (`chart-colors.ts`, bukan `helpers.ts`). Yang dipindai hanya file di **level teratas** folder
tersebut — subfolder `app/utils/<sub>/` **tidak** ikut di-auto-import, jadi jangan menaruh util di subfolder.

**Tidak ada folder `app/plugins/`.** Persistensi bahasa ditangani `@nuxtjs/i18n` lewat
`detectBrowserLanguage` di `nuxt.config.ts` (`useCookie: true`, cookie `i18n_redirected`) — bukan plugin custom.
Lihat `docs/i18n-guide.md` §6.

## Design System

Token warna didefinisikan di `app/assets/css/main.css` (`@theme static`), pemetaan perannya di
`app/app.config.ts`.

- **Primary**: `blue` — ramp navy kustom, **`blue-500: #2D4E6F`**
- **Error**: `red` (`red-500: #CC0007`)
- **Warning**: `yellow` (`yellow-500: #D97706`)
- **Neutral**: `neutral`
- **Green `#009838` masih ada di palet sebagai `green-500`, tapi BUKAN primary** — pakai hanya untuk aksen
  hijau yang memang disengaja (mis. status sukses), bukan sebagai warna brand.
- **Font**: Geist (Google Fonts)
- **Default size `lg`**: `button`, `input`, `select`, `selectMenu`, `textarea` (set di `app.config.ts`) — tidak
  perlu menulis `size="lg"` manual.

`app.config.ts` juga meng-override **slot `modal` secara global**:

```ts
modal: {
  slots: {
    content: 'sm:max-w-lg',
    overlay: '!backdrop-blur-xs !bg-white/10',
    body: 'border-0 !py-0',
    header: 'border-0'
  }
}
```

Artinya **setiap `<UModal>` sudah otomatis** memakai lebar, overlay, dan padding body/header tersebut — jangan
menulis ulang `:ui="{ content: ..., overlay: ..., body: ..., header: ... }"` di tiap modal baru. Override `:ui`
per modal hanya untuk hal yang memang berbeda (mis. `content: 'max-w-2xl'` di modal RBAC, atau `#content` khusus
di `DeleteModal`).

## Checklist: Menambah Fitur CRUD Baru

Saat diminta membuat fitur baru (contoh: `product`). Modul CRUD terkecil & paling bersih untuk dijadikan
contoh adalah **`faq`**:

1. `app/types/product.d.ts` — Interface `Product` + `ProductPayload` (contoh: `app/types/faq.d.ts`)
2. `app/services/product-service.ts` — Copy pattern dari `faq-service.ts`
3. `app/components/product/AddModal.vue` — Copy pattern dari `faq/AddModal.vue`
4. `app/components/product/UpdateModal.vue` — Copy pattern dari `faq/UpdateModal.vue`
5. `app/pages/app/product/index.vue` — Copy pattern dari `app/pages/app/faq/index.vue`
6. `app/composables/useNavigation.ts` — Tambah nav item baru (pakai pola stable-id, lihat `docs/i18n-guide.md` §5)
7. `i18n/locales/en.json` **dan** `i18n/locales/id.json` — Tambah key untuk semua teks baru (lihat `docs/i18n-guide.md`)
8. `docs/changelog.md` — Catat perubahan
9. Gunakan `DeleteModal` global (jangan buat baru)
10. Kalau halaman menampilkan tanggal → pakai `app/utils/format.ts`; kalau ada upload gambar → pakai
    `useImageUpload` (lihat Larangan #7 & #8)

## Coding Conventions

| Aspek | Aturan |
|-------|--------|
| File pages | `kebab-case.vue` |
| File components | `PascalCase.vue` |
| File composables | `camelCase.ts` dengan prefix `use` |
| File utils | `kebab-case.ts` (fungsi murni, satu concern per file) |
| File services | `kebab-case-service.ts` |
| File types | `kebab-case.d.ts` |
| Variables | `camelCase` |
| Functions | `camelCase` prefix verb (`handleSubmit`, `fetchData`) |
| Interfaces/Types | `PascalCase` |
| Emits | past-tense (`created`, `updated`, `deleted`) |
| Indent | 2 spaces |
| Quotes | Single quotes |
| Trailing comma | Never |
| Import types | `import type { X } from '...'` |
| Package manager | `bun` (bukan npm/yarn) |
| Icons | `i-lucide-*` (bukan heroicons/dll) |

## Script Setup Order

```vue
<script setup lang="ts">
// 1. Imports
// 2. definePageMeta / defineModel / defineProps / defineEmits
// 3. Composables (useToast, useRoute, useAuth)
// 4. Reactive state (ref, reactive)
// 5. Computed
// 6. Zod schema
// 7. Functions/methods
// 8. Watchers
// 9. Lifecycle hooks (onMounted)
</script>
```

## File yang JANGAN Diubah (Kecuali Diminta)

- `app/services/api-service.ts` — Base HTTP client
- `app/services/auth-service.ts` — Auth flow
- `app/assets/css/main.css` — Design tokens
- `app/app.config.ts` — NuxtUI theme config
- `app/layouts/dashboard.vue` — Dashboard layout
- `app/layouts/auth.vue` — Auth layout
- `nuxt.config.ts` — Nuxt configuration

> **Diketahui (bukan pelanggaran baru):** `app/layouts/dashboard.vue` (drawer mobile dengan `Transition` +
> overlay manual) dan `app/layouts/auth.vue` (hero `bg-[url('/hero.png')]`) masih memakai markup custom, bukan
> komponen NuxtUI seperti `UDrawer`/`UPageHero`. Ini **kandidat perbaikan berikutnya** — jangan ditiru untuk
> halaman/komponen baru, tapi juga bukan alasan mengubahnya tanpa diminta.

## Sebelum Membuat Pull Request / Commit

- Jalankan `bun run typecheck` dan `bun run lint` — pastikan tidak ada error baru yang ditambahkan
- Kalau ada teks UI baru: pastikan key sudah ada di `i18n/locales/en.json` **dan** `id.json`
- Update `docs/changelog.md` untuk perubahan yang berarti (fitur baru, breaking change)
- Jangan commit `.env`, credentials, atau file rahasia lainnya

## Dokumentasi Lengkap

Baca folder `docs/` untuk detail lebih lanjut:
- `docs/project-overview.md` — Arsitektur lengkap
- `docs/coding-standards.md` — Standar kode detail
- `docs/i18n-guide.md` — **WAJIB** — Aturan i18n (English/Indonesia) untuk semua teks UI
- `docs/nuxtui-guide.md` — Panduan NuxtUI + contoh kode
- `docs/nuxtui-components.md` — Daftar 125+ komponen NuxtUI
- `docs/component-guide.md` — Pattern modal, form, component
- `docs/service-layer.md` — Pattern service, API, types
- `docs/page-pattern.md` — Template halaman CRUD & auth
- `docs/changelog.md` — Log perubahan
