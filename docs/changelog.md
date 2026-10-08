# 📋 Changelog

Semua perubahan penting pada project ini didokumentasikan di file ini.

Format: [Semantic Versioning](https://semver.org/) — `MAJOR.MINOR.PATCH`

## [Unreleased]

### Added
- Modul Content Management System yang mencakup manajemen Kategori dan Artikel:
  - Halaman CRUD Kategori di `app/pages/content/category/index.vue` dengan modal `ContentCategoryAddModal` dan `ContentCategoryUpdateModal`.
  - Halaman daftar Artikel di `app/pages/content/article/index.vue` terintegrasi dengan filter kategori dan status di slot `DataTable`.
  - Halaman formulir pembuatan dan pengubahan artikel di `app/pages/content/article/create.vue` dan `[id].vue` dengan editor rich text WYSIWYG Tiptap, upload cover image ke MinIO, dan konfigurasi optimasi mesin pencari (SEO & Open Graph).
  - Komponen editor konten `CommonTiptapEditor` (`app/components/common/TiptapEditor.vue`) dengan toolbar format lengkap, heading, list, blockquote, link, dan upload gambar.
  - Service API `category-service.ts` dan `article-service.ts`.
  - Tipe TypeScript di `app/types/content.d.ts` dan `app/types/tiptap.d.ts`.
  - Menu navigasi CMS (`/content/category` dan `/content/article`) di `useNavigation.ts`.
  - Seluruh teks UI dilokalisasi 100% pada `en.json` dan `id.json` (`pages.category.*` dan `pages.article.*`).

### Fixed
- Memperbaiki arbitrary Tailwind CSS classes (`max-w-[420px]` -> `max-w-md`, `table-class="min-w-[768px]"` -> `min-w-3xl`, `opacity-[0.40]` -> `opacity-40`) sesuai panduan `coding-standards.md`.
- Menghapus komponen non-existent `<TenantSwitcher />` pada `Sidebar.vue`.
- Memperbaiki tab navigasi profil pada `profile.vue` yang menggunakan komponen non-existent `<TabLink>` dan route salah (`/organizer/...`), digantikan dengan `<NuxtLink>` dan middleware redirect `/profile` -> `/profile/information`.
- Mengganti referensi icon set eksternal yang tidak terpasang (`circle-flags:*`) pada `LanguageSwitcher.vue` dan `UserPopover.vue` dengan `i-lucide-languages` sesuai aturan `i18n-guide.md`.
- Memperbaiki atribut keliru `color="neutral" variant="soft" @click="open = false"` pada tag root `<UModal>` di `user/AddModal.vue` dan `user/UpdateModal.vue`.
- Memperbaiki pelanggaran `vue/no-multiple-template-root` pada `sign-in.vue` dengan memindahkan elemen copyright ke dalam root container.
- Menghilangkan penggunaan `any` dan memperbaiki error TypeScript/ESLint pada `error-helper.ts`, `auth-service.ts`, `contact-service.ts`, `user-service.ts`, `api-service.ts`, `user.d.ts`, `auth.d.ts`, dan `contact.d.ts`.
- Menyinkronkan tema NuxtUI di `app.config.ts` (`primary: 'green'`, `neutral: 'slate'`) agar sesuai dengan standar design system.
- Melokalisasi teks hero auth layout ke `en.json` dan `id.json` (`components.authLayout`).

### Changed
- Mengubah nama aplikasi dari "NusaCall" menjadi "Content Management System" pada metadata SEO, layout autentikasi, serta lokalisasi bahasa (i18n en & id).

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
