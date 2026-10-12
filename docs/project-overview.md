# 🏗️ Project Overview — Nuxt Boilerplate

## Tentang Project

**Nuxt Boilerplate** — Starter template admin dashboard.
SPA (Single Page Application) dengan Nuxt 4, NuxtUI v4, dan Tailwind CSS v4.

- **SSR**: Disabled (`ssr: false`)
- **Color Mode**: Light only (preference: `light`)
- **Bahasa**: Multi-language via `@nuxtjs/i18n` — English (`en`) + Bahasa Indonesia (`id`). Lihat [i18n-guide.md](./i18n-guide.md)
- **Package Manager**: Bun 1.3.1

## Tech Stack

| Layer         | Teknologi            | Keterangan                                                        |
| ------------- | -------------------- | ----------------------------------------------------------------- |
| Framework     | Nuxt 4               | `nuxt ^4.4.6`                                                     |
| UI Library    | NuxtUI v4            | `@nuxt/ui ^4.7.1` — **Wajib digunakan**                           |
| i18n          | @nuxtjs/i18n         | `@nuxtjs/i18n ^10.6.0` — English + Indonesia, **Wajib digunakan** |
| Styling       | Tailwind CSS v4      | `tailwindcss ^4.3.0`                                              |
| Icons         | Lucide via Iconify   | `@iconify-json/lucide ^1.2.108`                                   |
| Validation    | Zod v4               | `zod ^4.4.3`                                                      |
| HTTP Client   | Axios                | `axios ^1.16.1`                                                   |
| Charts        | nuxt-charts          | `nuxt-charts ^3.1.0` — `AreaChart`/`BarChart`/`DonutChart` di dashboard |
| Rich Text     | Tiptap               | `@tiptap/* ^3.31.4` — editor artikel (`CommonTiptapEditor`)        |
| Auth Provider | Google Sign-In       | `nuxt-vue3-google-signin 0.0.13`                                  |
| Linting       | ESLint + Nuxt ESLint | `@nuxt/eslint ^1.15.2`                                            |
| Type Checking | TypeScript + vue-tsc | `typescript ^6.0.3`                                               |

## Struktur Folder

```
fe/
├── app/
│   ├── app.vue                    # Root component (UApp wrapper)
│   ├── app.config.ts              # NuxtUI theme config (colors, defaults)
│   ├── assets/
│   │   └── css/
│   │       └── main.css           # Font, Tailwind imports, custom color tokens
│   ├── components/
│   │   ├── BrandLogo.vue          # Logo + nama app
│   │   ├── Header.vue             # Page header (title, tabs, actions, mobile nav)
│   │   ├── Sidebar.vue            # Navigasi sidebar (collapsible, reaktif terhadap locale)
│   │   ├── LanguageSwitcher.vue   # Switch bahasa (kanan atas Header & auth layout)
│   │   ├── UserPopover.vue        # User profile dropdown + logout
│   │   ├── DeleteModal.vue        # Generic delete confirmation modal
│   │   ├── DataTable.vue          # Generic list table (search, per-page, pagination, empty state)
│   │   ├── common/                # Dipakai lintas fitur
│   │   │   ├── SortableHeader.vue # Header kolom yang bisa diklik (via useTableQuery().sortHeader)
│   │   │   ├── EditorUrlModal.vue # Modal input URL link/gambar untuk editor Tiptap
│   │   │   └── TiptapEditor.vue   # Rich text editor artikel
│   │   ├── content/               # Komponen modul CMS
│   │   │   ├── ArticleForm.vue    # Form artikel bersama (create & edit)
│   │   │   └── category/          # AddModal.vue, UpdateModal.vue
│   │   └── <feature>/             # Feature-specific components
│   │       └── AddModal.vue       # Auto-named: <FeatureAddModal />
│   │       └── UpdateModal.vue
│   │       └── DeleteModal.vue
│   ├── composables/               # Auto-imported — boleh punya state/reaktif
│   │   ├── useAuth.ts             # Auth state accessor (readonly)
│   │   ├── useNavigation.ts       # Sidebar navigation config + active state (i18n-aware)
│   │   ├── usePermission.ts       # Cek permission RBAC (can(...))
│   │   ├── useTableQuery.ts       # State search/page/perPage/sort + sortHeader()
│   │   ├── useImageUpload.ts      # Alur upload + preview gambar (cara baku)
│   │   └── error-helper.ts        # Global error handler untuk service layer
│   ├── utils/                     # Auto-imported — HANYA fungsi murni (tanpa state)
│   │   ├── slug.ts                # slugify()
│   │   ├── format.ts              # formatDate/formatDateTime/formatNumber/formatTimeAgo
│   │   ├── file.ts                # createPreviewUrl/revokePreviewUrl
│   │   ├── payload.ts             # trimOrNull/trimRequired
│   │   ├── html.ts                # isEmptyHtml()
│   │   └── chart-colors.ts        # Palet chart dari token design system
│   ├── layouts/
│   │   ├── dashboard.vue          # Layout utama: sidebar + main content
│   │   └── auth.vue               # Layout auth: split-screen (gradient | form)
│   ├── middleware/
│   │   ├── auth.global.ts         # Global guard: redirect ke sign-in jika tidak auth
│   │   └── guest.ts               # Guest-only: redirect ke home jika sudah login
│   ├── pages/
│   │   ├── index.vue              # Dashboard (layout: dashboard)
│   │   ├── auth/
│   │   │   ├── sign-in.vue        # Login page (layout: auth, middleware: guest)
│   │   │   ├── forgot-password.vue
│   │   │   └── reset-password.vue
│   │   └── <feature>/
│   │       └── index.vue          # CRUD listing page
│   ├── services/
│   │   ├── api-service.ts         # Axios instance factory + interceptors
│   │   ├── auth-service.ts        # Auth: login, logout, refresh, Google OAuth
│   │   └── <feature>-service.ts   # Feature CRUD service
│   └── types/
│       ├── api.d.ts               # ApiResponse + PaginationMeta (shared)
│       ├── auth.d.ts              # User, AuthData, AuthResponse (re-export ApiResponse)
│       └── <feature>.d.ts         # Feature types + payload
├── i18n/
│   └── locales/
│       ├── en.json                # WAJIB sinkron dengan id.json — lihat docs/i18n-guide.md
│       └── id.json
├── docs/                          # Dokumentasi project ini
├── public/                        # Static assets (favicon, SVGs)
├── nuxt.config.ts                 # Nuxt configuration (termasuk block `i18n`)
├── package.json
├── tsconfig.json
└── eslint.config.mjs
```

## Konfigurasi Design System

### Warna (dari `main.css` + `app.config.ts`)

Project menggunakan custom color palette yang di-override di `@theme static`, lalu dipetakan ke peran NuxtUI
di `app.config.ts`:

| Ramp     | Shade 500 | Peran (di `app.config.ts`)                          |
| -------- | --------- | --------------------------------------------------- |
| `blue`   | `#2D4E6F` | **Primary** — navy brand utama (ramp kustom)        |
| `red`    | `#CC0007` | **Error/Danger**                                    |
| `yellow` | `#D97706` | **Warning**                                         |
| `green`  | `#009838` | Bukan primary — dipakai sebagai aksen hijau/sukses  |
| —        | —         | **Neutral**: ramp bawaan `neutral` (bukan `slate`)  |

### Font

- **Font Family**: `Geist` (Google Fonts)
- Didefinisikan di `main.css`: `--font-sans: 'Geist', sans-serif`

### NuxtUI Default Variants (dari `app.config.ts`)

```typescript
ui: {
  colors: {
    primary: 'blue',
    error: 'red',
    warning: 'yellow',
    neutral: 'neutral'
  },
  button: {
    defaultVariants: { size: 'lg' }
  },
  input: {
    defaultVariants: { size: 'lg' }
  },
  selectMenu: {
    defaultVariants: { size: 'lg' }
  },
  select: {
    defaultVariants: { size: 'lg' }
  },
  textarea: {
    defaultVariants: { size: 'lg' }
  },
  modal: {
    slots: {
      content: 'sm:max-w-lg',
      overlay: '!backdrop-blur-xs !bg-white/10',
      body: 'border-0 !py-0',
      header: 'border-0'
    }
  }
}
```

> **Catatan**: `button`, `input`, `select`, `selectMenu`, dan `textarea` default size-nya `lg` — tidak perlu
> menambahkan `size="lg"` secara manual kecuali perlu override.
>
> **Slot `modal` di atas berlaku global**: semua `<UModal>` sudah memakai lebar `sm:max-w-lg`, overlay blur,
> serta body/header tanpa border & padding atas. Jangan menulis ulang `:ui` yang sama di tiap modal — override
> hanya untuk yang memang berbeda (mis. modal RBAC memakai `content: 'max-w-2xl'`).

## Environment Variables

| Variable           | Contoh                      | Keterangan             |
| ------------------ | --------------------------- | ---------------------- |
| `API_BASE_URL`     | `http://localhost:4000/api` | Base URL API backend   |
| `GOOGLE_CLIENT_ID` | —                           | Google OAuth Client ID |

## ESLint Rules

- **CommaDangle**: `never` — Tidak ada trailing comma
- **BraceStyle**: `1tbs` — One True Brace Style

## Layouts

### 1. `dashboard` Layout

- Sidebar kiri (desktop) + drawer overlay (mobile)
- Main content area dengan scroll
- Responsive: sidebar hidden di mobile, diganti hamburger menu
- State `isMobileMenuOpen` di-share via `useState('isMobileMenuOpen')`
- `LanguageSwitcher` di kanan atas `Header.vue` (mobile bar + desktop top row)

### 2. `auth` Layout

- Split screen: 60% hero background (kiri) | 40% form (kanan)
- Mobile: full-width form only
- Background memakai `bg-[url('/hero.png')]` + grid overlay
- `LanguageSwitcher` di kanan atas panel form

> **Diketahui**: kedua layout ini masih memakai markup custom (drawer mobile dengan `Transition` manual di
> `dashboard.vue`, hero `bg-[url(...)]` di `auth.vue`), bukan komponen NuxtUI seperti `UDrawer`/`UPageHero`.
> Ini kandidat perbaikan berikutnya — bukan pelanggaran baru, dan bukan pola yang perlu ditiru di halaman baru.

## Authentication Flow

1. **Global Middleware** (`auth.global.ts`): Cek token di setiap navigasi
2. **Guest Middleware** (`guest.ts`): Redirect user yang sudah login
3. **Session Storage**: `localStorage` (accessToken, refreshToken, user JSON)
4. **Token Refresh**: Auto-refresh via Axios interceptor saat mendapat 401
5. **Google OAuth**: Menggunakan `nuxt-vue3-google-signin` + authorization code flow
