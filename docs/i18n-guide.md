# 🌐 i18n Guide (English / Bahasa Indonesia)

> **WAJIB DIBACA** oleh AI agent sebelum menambah atau mengubah teks apapun yang tampil di UI.
> Project ini mendukung 2 bahasa: **English (`en`)** dan **Bahasa Indonesia (`id`)** via `@nuxtjs/i18n`.

## ⛔ Aturan #0 (Paling Penting)

> **DILARANG KERAS hardcode teks yang tampil ke user** — baik di `<template>` maupun `<script>`.
> Setiap label, placeholder, judul, deskripsi, pesan toast, pesan validasi Zod, dan `aria-label` HARUS lewat i18n.

```vue
<!-- ❌ SALAH -->
<UButton>Save</UButton>
<h1>Add FAQ</h1>

<!-- ✅ BENAR -->
<UButton>{{ $t('common.save') }}</UButton>
<h1>{{ $t('components.faq.addModal.title') }}</h1>
```

Berlaku juga untuk teks non-`$t` yang tampil ke user: `aria-label`, judul kolom tabel, pesan toast, dan
`window.prompt`/`window.confirm` bawaan browser (**dilarang** — pakai `<UModal>`, lihat
[coding-standards.md](./coding-standards.md)).

Pengecualian (boleh hardcode) — lihat [§7 Apa yang TIDAK Perlu Diterjemahkan](#7-apa-yang-tidak-perlu-diterjemahkan).

## 1. Stack & Konfigurasi

| Hal | Detail |
|-----|--------|
| Module | `@nuxtjs/i18n` (`^10.6.0`) |
| Locale tersedia | `en` (English), `id` (Bahasa Indonesia) |
| Config | `nuxt.config.ts` → key `i18n` |
| File locale | `i18n/locales/en.json`, `i18n/locales/id.json` (**di root project, BUKAN di `app/`**) |
| Strategy | `no_prefix` — tidak ada prefix locale di URL (`/faq`, bukan `/en/faq`) |
| SSR | Disabled (`ssr: false`) — semua i18n berjalan client-side |
| Terjemahan teks bawaan NuxtUI | `<UApp :locale>` di `app/app.vue` menerima locale aktif, sehingga teks bawaan komponen NuxtUI (mis. "No data", "Previous"/"Next") ikut berbahasa Indonesia/Inggris |
| Atribut `lang` HTML | `htmlAttrs.lang` di `app/app.vue` mengikuti locale aktif |

Cek isi `i18n` block di `nuxt.config.ts` untuk detail persis (locale codes, default locale, mekanisme deteksi/persist bahasa) — **jangan asumsikan**, baca konfigurasi aktual karena bisa berubah.

## 2. Lokasi & Struktur File Locale

```
i18n/
└── locales/
    ├── en.json
    └── id.json
```

Kedua file **WAJIB punya key shape yang identik** — hanya value (teks) yang beda. Jangan pernah menambah key ke satu file tanpa menambah key yang sama persis ke file satunya.

### Struktur Top-Level (WAJIB)

Root JSON punya 3 top-level key:

```json
{
  "common": { ... },
  "components": { ... },
  "pages": { ... }
}
```

- **`common`** — teks yang dipakai lintas fitur dan berulang terus: `common.save`, `common.cancel`,
  `common.delete`, `common.edit`, `common.createdAt`, `common.error`, `common.timeAgo.*`. Kalau sebuah teks
  muncul di lebih dari satu fitur dengan makna sama, taruh di sini dan jangan duplikasi per fitur.
- **`components`** — teks milik file di `app/components/`.
- **`pages`** — teks milik file di `app/pages/`.

**Aturan penempatan:**

| Sumber teks | Masuk ke | Contoh path key |
|-------------|----------|------------------|
| Teks generik lintas fitur | `common.*` | `common.save`, `common.cancel`, `common.timeAgo.hours` |
| File di `app/components/<File>.vue` | `components.<camelCaseFileName>.*` | `components.header.openMenu` |
| File di `app/components/common/<File>.vue` | `components.<camelCaseFileName>.*` (subfolder `common/` tidak jadi namespace) | `components.editorUrlModal.linkTitle` |
| File di `app/components/<feature>/<File>.vue` | `components.<feature>.<camelCaseFileName>.*` | `components.faq.addModal.title` |
| File di `app/components/<feature>/<File>.vue` — komponen shared (dipakai create & edit) | `pages.<fitur>.*` (sejajar halaman yang memakainya) | `pages.article.coverTitle` (dipakai `content/ArticleForm.vue`) |
| File di `app/pages/<file>.vue` | `pages.<camelCaseFileName>.*` | `pages.dashboard.title` |
| File di `app/pages/<feature>/<file>.vue` | `pages.<feature>.<camelCaseFileName>.*` | `pages.faq.title`, `pages.auth.signIn.title` |
| File di `app/pages/<feature>/index.vue` | `pages.<feature>.*` (tanpa sub-key `index`) | `pages.faq.title` |
| File di `app/pages/profile/information.vue` (nested, bukan index) | `pages.profile.information.*` | `pages.profile.information.save` |

Key di dalam tiap section pakai **camelCase**, deskriptif berdasarkan fungsi elemen (`questionLabel`, `questionRequired`, `questionPlaceholder`, `deletedSuccess`) — bukan berdasarkan isi teks literal.

### Contoh Lengkap (mengikuti fitur `faq`)

```json
// i18n/locales/en.json (kutipan)
{
  "common": {
    "save": "Save",
    "cancel": "Cancel"
  },
  "components": {
    "faq": {
      "addModal": {
        "title": "Add FAQ",
        "questionLabel": "Question",
        "questionPlaceholder": "Enter question",
        "questionRequired": "Question is required",
        "createdSuccess": "FAQ created successfully!"
      }
    }
  },
  "pages": {
    "faq": {
      "title": "FAQ",
      "addFaq": "Add FAQ",
      "columnQuestion": "Question",
      "deletedSuccess": "FAQ deleted successfully!"
    }
  }
}
```

```json
// i18n/locales/id.json — SAMA PERSIS strukturnya, hanya value yang beda
{
  "common": {
    "save": "Simpan",
    "cancel": "Batal"
  },
  "components": {
    "faq": {
      "addModal": {
        "title": "Tambah FAQ",
        "questionLabel": "Pertanyaan",
        "questionPlaceholder": "Masukkan pertanyaan",
        "questionRequired": "Pertanyaan wajib diisi",
        "createdSuccess": "FAQ berhasil ditambahkan!"
      }
    }
  },
  "pages": {
    "faq": {
      "title": "FAQ",
      "addFaq": "Tambah FAQ",
      "columnQuestion": "Pertanyaan",
      "deletedSuccess": "FAQ berhasil dihapus!"
    }
  }
}
```

## 3. Cara Pakai di Kode

### Di `<template>`

Gunakan `$t('key.path')` — global helper, tidak perlu import:

```vue
<UButton>{{ $t('common.save') }}</UButton>
<UFormField :label="$t('components.faq.addModal.questionLabel')">
  <UInput :placeholder="$t('components.faq.addModal.questionPlaceholder')" />
</UFormField>
<UButton :aria-label="$t('components.header.openMenu')" icon="i-lucide-menu" />
```

### Di `<script setup>`

`$t` **tidak tersedia** di script. Ambil `t` dari `useI18n()`:

```typescript
const { t } = useI18n()

// Toast
toast.add({
  title: t('components.faq.addModal.createdSuccess'),
  color: 'success',
  icon: 'i-lucide-circle-check'
})

// Zod schema — pesan error WAJIB via t()
const schema = z.object({
  question: z.string().min(1, t('components.faq.addModal.questionRequired')),
  answer: z.string().min(1, t('components.faq.addModal.answerRequired'))
})

// useHead (page title tab browser)
useHead({ title: t('pages.auth.signIn.title') })

// TableColumn header (fungsi reaktif, bukan string statis)
const columns: TableColumn<Faq>[] = [
  { accessorKey: 'question', header: () => t('pages.faq.columnQuestion') }
]
```

> Untuk kolom yang bisa di-sort, jangan tulis `header: () => t(...)` manual — pakai
> `sortHeader(() => t('pages.<fitur>.columnX'), '<field>')` dari `useTableQuery` (lihat
> [page-pattern.md](./page-pattern.md)).

> ⚠️ **Skema Zod dibuat sekali saat `setup()` berjalan.** Pesan error ter-lock ke locale saat komponen mount. Ini trade-off yang **diterima** di project ini (konsisten dengan pattern yang sudah ada) — jangan over-engineer dengan `computed()` schema kecuali diminta eksplisit.

### Interpolasi (variabel di dalam teks)

```json
// locale file
{ "showingResults": "Showing {from} to {to} of {total} results" }
```

```vue
<!-- Contoh nyata: teks "showing" DataTable -->
{{ $t('components.dataTable.showing', { from: from || 0, to: to || 0, total }) }}
```

```typescript
// Contoh nyata: app/utils/format.ts
t('common.timeAgo.hours', { count: Math.floor(diffSec / 3600) })   // "3 jam lalu"
```

## 4. Language Switcher

Component: `app/components/LanguageSwitcher.vue` (global, auto-imported).

- Sudah dipasang di **kanan atas**: `Header.vue` (dashboard, mobile + desktop) dan `auth.vue` layout (halaman sign-in/forgot/reset-password).
- **Jangan buat switcher baru** — pakai `<LanguageSwitcher />` yang sudah ada jika butuh menambah lokasi baru.
- Ganti bahasa lewat `useI18n().setLocale(code)` — **jangan** `locale.value = code` langsung (bisa skip proses async load pesan locale target).
- Icon HARUS dari set `@iconify-json/lucide` (prefix `i-lucide-*`) sesuai aturan project. **Jangan** referensikan icon set lain (mis. `circle-flags:*`) — package-nya tidak terpasang dan akan gagal render.
- Komponen dropdown pakai `<UDropdownMenu>` — **`UIconMenu` tidak ada** di NuxtUI, jangan pernah pakai.
- Label pilihan bahasa ("English", "Bahasa Indonesia") **tidak diterjemahkan** — nama bahasa selalu ditampilkan dalam bahasa aslinya (native name), ini pengecualian yang disengaja.

## 5. Sidebar / Navigasi — Pola Wajib (Stable ID)

`app/composables/useNavigation.ts` dan `app/components/Sidebar.vue` adalah kasus khusus yang **wajib diikuti persis** kalau menambah nav item baru:

1. `navGroups` **HARUS** berupa `computed(() => [...])`, **bukan** array statis biasa. Array statis dibuat sekali saat komponen mount dan **tidak akan reaktif** terhadap pergantian bahasa.
2. Setiap `NavGroup` (yang punya `title`) dan setiap `NavItem` yang punya `children` **WAJIB** diberi `id` string stabil (bahasa Inggris, tidak berubah), terpisah dari `label` yang terjemahannya berubah sesuai locale.
3. State expand/collapse (`toggleExpanded`, `isExpanded`) dan `:key` di `v-for` **HARUS** pakai `id`, **BUKAN** `label`/`title`. Kalau pakai teks yang diterjemahkan sebagai key/identity, submenu yang sedang terbuka akan collapse/reset saat user ganti bahasa.

```typescript
// ✅ BENAR — contoh nyata dari useNavigation.ts
{
  id: 'content',                                    // stabil, tidak berubah
  label: t('components.sidebar.nav.content'),       // berubah sesuai locale
  to: contentChildren[0]?.to || '/content',
  icon: 'i-lucide-file-text',
  children: contentChildren                         // [{ id: 'category', ... }, { id: 'article', ... }]
}
```

```vue
<!-- Sidebar.vue -->
<div v-for="group in navGroups" :key="group.id || group.title">
<template v-for="item in group.items" :key="item.id">
@click="() => { toggleExpanded(item.id) }"
```

Tambah nav item baru = tambah entry di `t('components.sidebar.nav.<key>')` (di kedua locale file) + tambah node di `navGroups` dengan `id` baru yang unik. Item yang butuh permission dicek lewat `usePermission().can('...')` sebelum di-push.

## 6. Persistensi Bahasa

Persistensi ditangani **`@nuxtjs/i18n` sendiri**, bukan plugin custom. Di `nuxt.config.ts`:

```ts
i18n: {
  defaultLocale: 'id',
  strategy: 'no_prefix',
  detectBrowserLanguage: {
    useCookie: true,
    cookieKey: 'i18n_redirected',
    alwaysRedirect: true,
    fallbackLocale: 'id'
  }
}
```

- **Tidak ada folder `app/plugins/`** di project ini (jangan menambahkan plugin i18n manual).
- Bahasa pilihan user disimpan di **cookie `i18n_redirected`**, sehingga bertahan setelah full page reload
  dan saat pindah halaman. `fallbackLocale: 'id'` dipakai sebagai locale cadangan saat bahasa browser tidak
  dikenali.
- Key yang hanya ada di satu file locale tetap **tidak boleh** diandalkan — teks akan muncul sebagai key
  literal (`pages.faq.title`) atau tertukar bahasa. Selalu tambahkan ke kedua file.

Yang **tidak boleh berubah** tanpa alasan kuat:

- Bahasa pilihan user harus bertahan setelah **full page reload**.
- Bahasa pilihan user harus bertahan saat **pindah halaman**.
- Teks bawaan NuxtUI (mis. "No data") harus ikut locale aktif — ini yang dijaga `<UApp :locale>` di
  `app/app.vue`; jangan hapus prop itu.

## 7. Apa yang TIDAK Perlu Diterjemahkan

- Nama brand: `SIAMO`, `PMI`, `Palang Merah Indonesia`
- Nama bahasa di `LanguageSwitcher` ("English", "Bahasa Indonesia")
- Data mock/dummy untuk demo (misal isi notifikasi contoh di `NotificationPopover.vue`) — ini bukan UI chrome, hanya sample data
- Nilai teknis: nama field form (`name="email"`), `id` HTML, class Tailwind, nama icon (`i-lucide-*`)

## 8. Checklist — Setiap Kali Menambah Fitur / Halaman / Komponen Baru

```
[ ] 1. Semua teks statis di <template> pakai $t('...')
[ ] 2. Semua teks di <script> (toast, Zod message, useHead, table header) pakai t('...') dari useI18n()
[ ] 3. aria-label yang berisi kata-kata (bukan cuma nama teknis) juga diterjemahkan
[ ] 4. Key baru ditambahkan ke KEDUA i18n/locales/en.json dan i18n/locales/id.json, shape identik
[ ] 5. Key masuk ke "components.<...>" atau "pages.<...>" sesuai lokasi file (§2)
[ ] 6. Kalau menambah nav item → ikuti pola stable-id di §5, JANGAN pakai array statis / label sebagai key
[ ] 7. Kalau butuh variabel dalam teks → pakai interpolasi {namaVar}, bukan template string manual
[ ] 8. Test switch bahasa di browser — pastikan tidak ada teks literal "pages.xxx.yyy" muncul (artinya key belum ada di salah satu file locale)
```

## 9. Kesalahan Umum (Sudah Pernah Terjadi — Jangan Diulang)

| Kesalahan | Akibat | Solusi |
|-----------|--------|--------|
| Key ditambahkan cuma di satu locale file | Teks fallback ke key literal (`pages.faq.title` tampil apa adanya) di locale yang belum punya key | Selalu tambah ke **kedua** file, sekaligus |
| `locale.value = 'id'` langsung (bukan `setLocale()`) | Pesan locale baru belum ter-load, UI stuck di key literal walau locale sudah pindah | Selalu pakai `await setLocale(code)` |
| Nav array statis (bukan `computed()`) | Sidebar tidak berubah bahasa saat switch locale tanpa reload manual | Bungkus dengan `computed(() => [...])` |
| Pakai `label`/`title` (teks) sebagai `:key` atau identity untuk expand-state | Submenu collapse/reset saat ganti bahasa | Tambah field `id` stabil, pakai itu untuk key & state |
| Menambah module i18n baru tapi dev server tidak di-restart | Locale file baru tidak ke-load (`Not found 'xxx' key in 'id' locale messages`), tidak ada error jelas | Registrasi module/locale file baru selalu butuh **restart penuh** dev server, bukan cuma HMR |
| Referensi icon set yang tidak terpasang (`circle-flags:*`) atau komponen yang tidak ada (`UIconMenu`) | Icon tidak render / component resolve error | Selalu cek `@iconify-json/lucide` tersedia; pakai `UDropdownMenu`, bukan `UIconMenu` |

## 10. Referensi File Nyata (Contoh yang Sudah Benar)

| Kebutuhan | Contoh File |
|-----------|-------------|
| Halaman CRUD lengkap dengan i18n | `app/pages/faq/index.vue` |
| Modal Add/Update dengan Zod + i18n | `app/components/faq/AddModal.vue`, `app/components/faq/UpdateModal.vue` |
| Halaman auth dengan i18n | `app/pages/auth/sign-in.vue` |
| Sidebar dengan pola stable-id | `app/composables/useNavigation.ts` + `app/components/Sidebar.vue` |
| Language switcher | `app/components/LanguageSwitcher.vue` |
| Struktur locale file | `i18n/locales/en.json` + `i18n/locales/id.json` |
