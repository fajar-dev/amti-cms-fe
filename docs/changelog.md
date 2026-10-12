# 📋 Changelog

Semua perubahan penting pada project ini didokumentasikan di file ini.

Format: [Semantic Versioning](https://semver.org/) — `MAJOR.MINOR.PATCH`

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
