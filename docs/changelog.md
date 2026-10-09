# 📋 Changelog

Semua perubahan penting pada project ini didokumentasikan di file ini.

Format: [Semantic Versioning](https://semver.org/) — `MAJOR.MINOR.PATCH`

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
