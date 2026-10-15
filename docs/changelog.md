# 📋 Changelog

## 2026-10-14 — Shared image lightbox

- Connect image previews in dashboard clients, articles and chat, plus public company-profile gallery and chat.
- Use the shared Lightbox with NuxtUI modal accessibility and SSR-safe state; keep article title links and document downloads intact.

## 2026-10-14 — Landing page latest articles

- Show the four latest published articles before the contact section, ordered by publication date, with responsive cards and a link to the article listing.
- Share SiteArticleCard with the article listing; include loading, empty and error states and English/Indonesian copy.

## 2026-10-14 — Static website SEO

- Keep only Contact and Social Media in Settings. Remove the meta form, upload service and obsolete translations/permissions. Website identity, logos and home-page SEO now use static localized content and bundled assets.

## 2026-10-13 — Ticket queue proportions and selection

- Set the queue to 7 of 24 columns on large desktop screens, balancing readable ticket details with conversation space.
- Apply the active ticket color only to its left border and reserve that space on all rows to prevent selection shifts.

## 2026-10-13 — Use ticket IDs in live chat

- Display the session ID as #ID in the queue, conversation header and public widget instead of the generated ticket number.
- Remove long-ticket-number tooltips and truncation from those labels.


## 2026-10-13 — Balance live chat density

- Keep message/body text at text-sm while reducing timestamps and ticket metadata to text-xs.
- Use compact headers, medium avatars/search fields and small supporting actions/badges; preserve neutral contact colors and Geist.


## 2026-10-13 — Live chat typography

- Use the dashboard's text-sm body typography and text-base section headings instead of undersized chat-specific text.
- Restore configured input/action/badge sizes; use standard avatar sizing and align queue metadata with the larger avatars.
- Keep visitor names, company details, email and phone links neutral, including hover styling on queue names.
- Increase shared message, timestamp, system-notice and attachment text to text-sm.


## 2026-10-13 — Live chat visual consistency and infinite scroll

- Fill the dashboard content height with flex/grid sizing and internal scrolling; use UAvatar alt-based initials like the existing user components.
- Match dashboard cards with a single default ring, rounded-lg corners and consistent padding; remove duplicate card borders and responsive body padding.
- Replace ticket pagination controls with infinite scroll; preserve loaded pages during polling, deduplicate IDs, and reset on tab/search changes.
- Render system messages as plain centered text with the time above them.
- Remove monospace ticket styling so all live-chat text inherits Geist.
- Remove the initial-message field from the visitor form and request payload; compact the ticket/status row and waiting notice, and remove duplicated responsive card padding.


## 2026-10-13 — Live chat refactor

- Move visitor and staff orchestration to `useVisitorChat` / `useStaffChat`; share serial polling with lifecycle cleanup.
- Share message rendering, validated message composition and Nuxt UI file selection through `components/chat`.
- Centralize time/file-size formatting, remove arbitrary Tailwind values, and localize attachment labels and validation.
- Filter assigned tickets on the server, paginate the queue, enforce action permissions in UI, and ignore stale conversation responses.
- Use session metadata polling while minimized so unread messages are not marked read prematurely.

Semua perubahan penting pada project ini didokumentasikan di file ini.

Format: [Semantic Versioning](https://semver.org/) — `MAJOR.MINOR.PATCH`

## [Unreleased] — 2026-10-13

### Added
- **Modul Klien & Mitra** di panel admin (`/app/client`):
  - Service `clientService` (`app/services/client-service.ts`) untuk CRUD dan upload logo klien.
  - Komponen dialog `AddModal` dan `UpdateModal` (`app/components/client/`) dengan unggah logo interaktif via MinIO.
  - Halaman manajemen `app/pages/app/client/index.vue` dengan DataTable, pencarian, filter status, pengurutan, dan paginasi.
  - Navigasi sidebar `/app/client` terintegrasi dengan pengecekan permission `clients.view`.
- **Integrasi Klien Dinamis di Landing Page**:
  - Halaman utama (`app/pages/index.vue`) mengambil daftar klien aktif dari endpoint publik backend via `useAsyncData('public-clients', ...)`.
  - Komponen `SiteClientLogos.vue` mendukung logo interaktif dengan tautan website client (`target="_blank"`, `rel="noopener noreferrer"`).
  - Fallback otomatis ke logo statis jika backend belum mengembalikan data klien.
- **Lokalisasi**:
  - Dukungan dwibahasa penuh (ID & EN) untuk halaman dan modal Klien (`components.client`, `pages.client`).

### Fixed
- Memperbaiki tautan kartu EEWS, SHMS, dan artikel "read more" di landing page agar navigasi berfungsi secara responsif.

---

## [Unreleased] — 2026-10-12 (website publik)

### Added
- **Website publik** di aplikasi yang sama dengan panel admin, dengan rute `/`, `/eews`, `/shms`,
  `/article`, dan `/article/[slug]`.
- `app/data/site-content.ts` — seluruh konten website (home, about, EEWS, SHMS, artikel) disalin
  **verbatim** dari amti.co.id dan dikumpulkan di satu file supaya mudah diaudit. Tidak ada kalimat
  yang dikarang; bagian yang teksnya rusak di situs lama (DAM/LANDSLIDE/PORT/RAILWAY memakai teks
  HIGHWAY) dibiarkan kosong.
- Komponen website yang bisa dipakai ulang di `app/components/site/`: `SiteNavbar`, `SiteFooter`,
  `SiteBackground` (pola garis/grid + kontur + gradient mesh + butiran), `SiteCurveDivider`,
  `SiteReveal` (animasi saat masuk viewport), `SiteSectionHeader`, `SiteVideoPlayer` (click-to-play),
  `SiteWaveDiagram` (animasi gelombang P/S), `SiteEntryBlock`, `SiteCard`
  (permukaan kartu standar + sorot kursor), `SiteFrame` (bingkai media + penanda sudut),
  `SiteClientLogos` (deretan logo klien), `SiteContactSection` + `SiteContactForm`.
- **Formulir kontak publik** di halaman utama (bagian `#contact`), mengirim ke endpoint
  `POST /api/messages` yang **sudah ada** dan publik — jadi tidak ada modul backend baru. Kiriman
  masuk ke menu **Messages** di panel admin seperti pesan lainnya. Formulir memakai Zod, honeypot
  anti-bot, dan panel konfirmasi setelah terkirim.
- `app/composables/usePointerGlow.ts` — efek sorot kursor untuk kartu. Nilai posisi ditulis langsung
  ke DOM sebagai CSS variable (bukan state reaktif) supaya gerakan mouse tidak memicu render ulang.
- Strip angka di hero: `24/7` (dikutip dari subjudul) serta jumlah sektor EEWS dan jenis struktur
  SHMS yang **dihitung dari data halaman**, bukan klaim baru.
- `app/layouts/default.vue` — chrome website publik (navbar sticky, footer kontak, tombol WhatsApp
  & kembali ke atas).
- Pola latar SVG sendiri di `public/amti/patterns/` (garis, grid, kontur) karena pola bawaan
  `public/grid.svg` dirancang untuk latar gelap.
- Method `articleService.getPublicList()` + tipe `PublicArticleCard` untuk endpoint publik baru
  `GET /api/articles` (hanya artikel publish, tanpa `content`).

### Changed
- **Rendering hybrid**: `ssr: true` dengan `routeRules` — website publik dirender di server agar
  terindeks mesin pencari, sedangkan `/app/**` dan `/auth/**` tetap SPA seperti sebelumnya.
- `auth.global.ts` memeriksa rute publik lebih dulu sehingga SSR halaman publik tidak memicu
  pemanggilan `/auth/me` di server.
- `BrandLogo.vue` menerima prop opsional `to` (default `/app`) agar bisa dipakai di navbar publik.
- Halaman `/article` mengambil artikel dari CMS, bukan menyalin excerpt placeholder situs lama;
  kunjungan artikel dicatat lewat endpoint publik `POST /api/content/articles/:id/view`.

### Fixed
- Aset asli AMTI (27 gambar + 2 video) dipulihkan ke `public/amti/` dari riwayat git.
- **Kelas `aspect-*` pecahan tidak pernah ter-generate** (`aspect-4/3`, `aspect-16/10`, `aspect-16/9`
  tidak ada di CSS hasil build) sehingga semua bingkai gambar/video tidak punya rasio dan foto
  dirender seukuran aslinya. Diganti ke `aspect-video`/`aspect-square` yang terbukti ter-generate.
- **Hero berantakan**: `SiteCurveDivider` diberi kelas `absolute` padahal root komponennya sudah
  `relative`, sehingga kurva tidak ter-posisi absolut dan menjadi anak flex — teks dan kurva duduk
  berdampingan. Pembatas kurva di hero kemudian **dihapus** (hero berakhir dengan tepi tegas), dan
  pita teks berjalan di bawahnya juga dihapus.
- **Halaman utama gagal SSR (500)** karena nilai i18n `nama@perusahaan.com`: vue-i18n membaca `@`
  sebagai sintaks *linked message*. Ditulis memakai escape yang sudah dipakai proyek ini di kunci
  lain, yaitu `{'@'}`.
- `articlePage.title` tempatnya sempat hilang saat halaman artikel ditata ulang; dikembalikan.

### Catatan
- Video **tidak** autoplay (total 88 MB, tidak ada `ffmpeg` untuk kompres di mesin ini) — diputar
  lewat modal dengan `preload="metadata"` + poster. Sebaiknya dikompres agar bisa dipakai lebih bebas.
- Footer sementara memakai kontak asli dari situs (bukan `/api/settings/public`) karena Settings di
  CMS masih berisi data contoh (`info@amti.id`, `Jakarta, Indonesia`).
- Halaman `Privacy Policy` dan `Contact` milik situs lama tidak dibuat karena tautannya mati (`#`)
  dan Anda tidak memintanya.

---

## [Unreleased] — 2026-10-12

### Added
- Folder **`app/utils/`** untuk fungsi murni yang bisa dipakai ulang (auto-import Nuxt, sama seperti `app/composables/`):
  - `slug.ts` — `slugify()`, dipakai form artikel (sebelumnya fungsi ini hanya ada di halaman create sehingga halaman edit tidak punya auto-slug dari judul).
  - `format.ts` — `formatDate()`, `formatDateTime()`, `formatNumber()`, `formatTimeAgo()`. Semuanya sadar-locale (mengikuti bahasa aktif), menggantikan **9 implementasi format tanggal** yang tersebar.
  - `file.ts` — `createPreviewUrl()` / `revokePreviewUrl()`.
  - `payload.ts` — `trimOrNull()` / `trimRequired()`.
  - `html.ts` — `isEmptyHtml()` untuk deteksi konten editor yang kosong.
  - `chart-colors.ts` — palet chart dari token design system.
- Composable `app/composables/useImageUpload.ts` — satu jalur baku untuk "pilih file → preview lokal → upload → simpan path → rollback", menggantikan 6 salinan alur yang perilakunya berbeda-beda.
- Komponen `app/components/common/SortableHeader.vue` — header kolom tabel yang bisa diklik untuk sorting, memakai `UIcon` (sebelumnya chevron digambar sebagai SVG manual dari dalam file `.ts`).
- Komponen `app/components/common/EditorUrlModal.vue` — modal input URL untuk editor, menggantikan `window.prompt`.
- Komponen `app/components/content/ArticleForm.vue` — satu form artikel untuk halaman **create** dan **edit**.
- `DataTable.vue` kini punya **empty state bawaan** (`UEmpty`), sehingga keenam halaman CRUD mendapatkannya tanpa konfigurasi.

### Changed
- Seluruh halaman CMS / dashboard (kecuali `pages/auth/`) dipindahkan ke folder `app/pages/app/` dengan prefix URL `/app` (dashboard, content, faq, messages, user, roles, settings, profile). Halaman root `/` di-redirect ke `/app` untuk persiapan landing page.
- Halaman `content/article/create.vue` dan `[id].vue` disatukan: keduanya kini pembungkus tipis (`<Header>` + `<ContentArticleForm>`) — dari ~740 baris duplikat menjadi ~40 baris.
- Semua format tanggal/tanggal-waktu memakai `app/utils/format.ts`. Sebelumnya separuh halaman memakai locale `en-US` dan separuh `id-ID`, sehingga tabel berbeda menampilkan format berbeda pada bahasa yang sama.
- Upload gambar di modal user, halaman profil, settings, dan cover artikel memakai `useImageUpload` + `UFileUpload`, seragam dengan pola yang sudah dipakai `settings/meta.vue`.
- Avatar picker memakai `UAvatar` (sebelumnya `<img>` + hidden `<input type="file">`).
- Dashboard: warna aksen memakai token design system (bukan pasangan class `dark:` yang dilarang), warna chart tidak lagi memakai hex default Tailwind, dan seluruh label/legend-nya lewat i18n.
- `Sidebar.vue`: seluruh tombol native (`<button>`) diganti `UButton` — tidak ada lagi tombol non-NuxtUI di sidebar.
- Tombol aksi tabel, ikon menu aksi (`i-lucide-edit`), ukuran badge status, dan `aria-label` diseragamkan antar keenam halaman CRUD.
- `<UApp>` meneruskan locale i18n aktif sehingga teks bawaan NuxtUI (mis. "No data") ikut bahasa yang dipilih; `htmlAttrs.lang` juga mengikuti locale.
- Semua arbitrary Tailwind value (`min-h-[420px]`, `text-[10px]`, `min-w-[160px]`, dst.) diganti skala standar.
- Tipe `ApiResponse` kini hanya didefinisikan di `app/types/api.d.ts` — 4 re-export perantara dihapus dan seluruh service diarahkan ke sumber tunggal itu.

### Fixed
- **Kolom tanggal pada tabel CRUD diseragamkan.** Sebelumnya `createdAt`/`receivedAt` tampil dalam tiga bentuk berbeda: `formatDate` (tanggal saja) di user/category/article vs `formatDateTime` (tanggal + jam) di faq/messages, dengan tiga class sel berbeda (`text-xs text-muted`, `text-sm text-muted`, dan tanpa pembungkus). Sekarang kelimanya memakai `formatDateTime` + pembungkus `text-muted whitespace-nowrap` yang sama. Key i18n duplikat `pages.faq.columnCreatedAt` (isinya sama dengan `common.createdAt`) dihapus, dan aturan kolom tanggal di `docs/page-pattern.md` diperketat agar tidak terulang.
- Upload gambar kini **selalu** me-rollback preview dan me-`revokeObjectURL` saat gagal (sebelumnya blob bocor dan dua modal menampilkan preview yang tidak akan tersimpan).
- Toast gagal hapus di halaman `user`, `faq`, `content/category`, dan `content/article` (sebelumnya modal tertutup dan data di-refetch seolah berhasil).
- `window.prompt` untuk menyisipkan link/gambar di editor diganti modal NuxtUI + validasi URL.
- Teks hardcoded yang melanggar aturan i18n diganti key terjemahan: label dashboard & legend chart, alt/label upload media, `aria-label: 'Actions'`, copyright halaman sign-in.
- Field slug di halaman edit artikel kini ikut tersinkron dari judul seperti di halaman create.

### Removed
- `bottomNavItems` di `useNavigation.ts` — menu `/feedback` yang halamannya tidak pernah ada dan tidak pernah dirender.
- Tipe mati: `SelectOption`, `PaginationSummary`, `DashboardStats`, `SettingPayload`; method `settingService.update()` yang tidak pernah dipanggil; dan `app/types/tiptap.d.ts` yang tidak melakukan apa pun (tanpa `declare module`/`export`).
- 27 key i18n yatim di `en.json` dan `id.json` (key lama yang tidak lagi dirujuk kode mana pun).

---

## [Unreleased]

### Added
- Modul Role-Based Access Control (RBAC) pada grup User Management:
  - Halaman CRUD Roles & Permissions di `app/pages/user/roles/index.vue` dengan `DataTable`, pencarian, badge jumlah permissions, badge jumlah pengguna, indikator System/Custom role, dan konfirmasi hapus via `DeleteModal`.
  - Modal tambah peran `RbacAddModal` (`app/components/rbac/AddModal.vue`) dengan input nama tampilan, slug identifier otomatis/manual, deskripsi, dan matriks hak akses yang dikelompokkan berdasarkan modul dengan opsi "Pilih Semua" per modul maupun global.
  - Modal ubah peran `RbacUpdateModal` (`app/components/rbac/UpdateModal.vue`) dengan proteksi penguncian nama peran sistem default (`super_admin`) dan matriks hak akses.
  - Pemilihan peran pada modal tambah & ubah pengguna (`UserAddModal` & `UserUpdateModal`) menggunakan `<USelectMenu>` yang terhubung ke daftar peran aktif via `rbacService.getAllList()`.
  - Kolom Role pada tabel daftar pengguna (`app/pages/user/index.vue`).
  - Menu navigasi "Roles & Permissions" (`/user/roles`) di `useNavigation.ts` di bawah grup navigasi `userManagement`.
  - Service API `rbac-service.ts` (`app/services/rbac-service.ts`) terhubung ke endpoint `/rbac/roles` dan `/rbac/permissions`.
  - Definisi tipe TypeScript di `app/types/rbac.d.ts` (`Role`, `Permission`, `RolePayload`, `PermissionsData`) dan pembaruan `app/types/user.d.ts` dengan `roleId` & `role`.
  - Lokalisasi lengkap pada `en.json` dan `id.json` (`pages.roles.*`, `components.rbac.*`, `components.sidebar.nav.roles`, dan label peran pengguna).
- Modul Frequently Asked Questions (FAQ) dengan fitur CRUD lengkap:
  - Halaman CRUD FAQ di `app/pages/faq/index.vue` dengan `DataTable`, pencarian, pengurutan, filter status (Active/Inactive), dan konfirmasi hapus via `DeleteModal`.
  - Modal tambah dan ubah FAQ di `app/components/faq/AddModal.vue` dan `UpdateModal.vue` dengan validasi Zod schema.
  - Service API `faq-service.ts` (`app/services/faq-service.ts`) terintegrasi dengan backend endpoints `/faq`.
  - Definisi tipe TypeScript di `app/types/faq.d.ts` (`Faq`, `FaqPayload`).
  - Menu navigasi FAQ (`/faq`) di `useNavigation.ts` di bawah grup CMS.
  - Lokalisasi lengkap pada `en.json` dan `id.json` (`pages.faq.*` dan `components.faq.*`).
- Modul Content Management System yang mencakup manajemen Kategori dan Artikel:
  - Halaman CRUD Kategori di `app/pages/content/category/index.vue` dengan modal `ContentCategoryAddModal` dan `ContentCategoryUpdateModal`.
  - Halaman daftar Artikel di `app/pages/content/article/index.vue` terintegrasi dengan filter kategori dan status di slot `DataTable`.
  - Halaman formulir pembuatan dan pengubahan artikel di `app/pages/content/article/create.vue` dan `[id].vue` dengan editor rich text WYSIWYG Tiptap, upload cover image ke MinIO, dan konfigurasi optimasi mesin pencari (SEO & Open Graph).
  - Komponen editor konten `CommonTiptapEditor` (`app/components/common/TiptapEditor.vue`) dengan toolbar format lengkap, heading, list, blockquote, link, dan upload gambar.
  - Service API `category-service.ts` dan `article-service.ts`.
  - Tipe TypeScript di `app/types/content.d.ts` dan `app/types/tiptap.d.ts`.
  - Menu navigasi CMS (`/content/category` dan `/content/article`) di `useNavigation.ts`.
  - Seluruh teks UI dilokalisasi 100% pada `en.json` dan `id.json` (`pages.category.*` dan `pages.article.*`).
  - Integrasi pemilihan Author pada pembuatan dan pengubahan artikel (`create.vue` & `[id].vue`) menggunakan `<USelectMenu>` dengan avatar pengguna dan penarikan data via `userService.getAllList()`.
  - Penggunaan `<UInputTags>` untuk manajemen tag artikel.
  - Komponen `<UFileUpload>` untuk upload gambar cover lengkap dengan panduan dimensi rekomendasi (1600 × 840).

### Changed
  - Menghapus kelas `font-mono` dari seluruh elemen UI modul RBAC (`app/pages/user/roles/index.vue`, `app/components/rbac/AddModal.vue`, `app/components/rbac/UpdateModal.vue`) untuk menjaga konsistensi tipografi dengan seluruh dashboard.
  - Redesain tampilan tabel daftar artikel (`app/pages/content/article/index.vue`):
    - Kolom Artikel memadukan thumbnail cover berbingkai (`size-11 rounded-lg border border-default`) dengan judul artikel dan monospace slug.
    - Kolom Status menggunakan pill badge `UBadge` varian `subtle` (`success` untuk Publish, `neutral` untuk Draft).
    - Kolom Author menampilkan avatar bulat `UAvatar` beserta nama dan email penulis.
    - Kolom Kategori dan Author terhubung dengan sorting server-side.
  - Mengubah dropdown filter Kategori dan Status dari `<USelect>` menjadi `<USelectMenu>`.
  - Mengubah pemilih Kategori pada form artikel menjadi `<USelectMenu>`.
  - Tombol Cancel pada form artikel diseragamkan dengan gaya modal (`variant="soft" color="neutral"`).
  - Field Deskripsi diposisikan pada panel Pengaturan Publikasi sebagai ringkasan singkat artikel.
  - Mengubah nama aplikasi dari "NusaCall" menjadi "Content Management System" pada metadata SEO, layout autentikasi, serta lokalisasi bahasa (i18n en & id).

### Removed
  - Menghapus seluruh fitur dan komponen terkait Contact (halaman `app/pages/contact/`, komponen `app/components/contact/`, API service `contact-service.ts`, tipe `contact.d.ts`, navigasi `/contact`, dan lokalisasi i18n).
  - Menghapus kolom ID pada tabel daftar FAQ di halaman frontend (`app/pages/faq/index.vue`).
  - Menghapus field kategori pada fitur FAQ sehingga entri FAQ fokus pada Pertanyaan, Jawaban, Urutan, dan Status Aktif.
  - Menghapus seluruh section konfigurasi SEO dan Open Graph (meta title, meta description, keywords, canonical URL, og image, og title) dari form pembuatan dan pengeditan artikel.

---

## [0.1.0] — 2026-06-18

### 🎉 Initial Release

- Nuxt Boilerplate — Starter template admin dashboard
- Nuxt 4, NuxtUI v4, Tailwind CSS v4, TypeScript, Zod, Axios
- Authentication (email/password, Google OAuth, forgot/reset password)
- User management CRUD
- Contact CRUD
- Profile configuration
- Dashboard layout dengan collapsible sidebar
- Auth layout dengan split-screen design
- Custom design system (green primary, Geist font)
- Dokumentasi lengkap di `docs/`

---

## Template untuk Entry Baru

```markdown
## [X.Y.Z] — YYYY-MM-DD

### Added
- Fitur baru yang ditambahkan

### Changed
- Perubahan pada fitur yang sudah ada

### Fixed
- Bug yang diperbaiki

### Removed
- Fitur yang dihapus

### Security
- Perubahan terkait keamanan
```
