# 🔌 Service Layer Guide

## Arsitektur Service Layer

```
app/services/
├── api-service.ts        # Base HTTP client (Axios) + interceptors
├── auth-service.ts       # Auth: login, logout, refresh, Google OAuth
└── <feature>-service.ts  # Feature CRUD operations

app/composables/          # Auto-imported — boleh punya state/reaktif
├── useAuth.ts            # Auth state accessor
├── useNavigation.ts      # Sidebar nav config
├── usePermission.ts      # Cek permission RBAC (can(...))
├── useTableQuery.ts      # State search/page/perPage/sort + sortHeader()
├── useImageUpload.ts     # Alur upload + preview gambar (cara baku)
└── error-helper.ts       # Global error handler

app/utils/                # Auto-imported — fungsi murni (tanpa state)
├── slug.ts               # slugify()
├── format.ts             # formatDate/formatDateTime/formatNumber/formatTimeAgo
├── file.ts               # createPreviewUrl/revokePreviewUrl
├── payload.ts            # trimOrNull/trimRequired
├── html.ts               # isEmptyHtml()
└── chart-colors.ts       # Palet chart dari token design system

app/types/
└── api.d.ts              # ApiResponse + PaginationMeta (shared, dipakai semua service)
```

## 1. API Service (Base Client)

`api-service.ts` adalah fondasi semua HTTP request. **Jangan edit file ini** kecuali untuk menambah interceptor.

```typescript
// Singleton instance
export const apiService = new ApiService()
```

### Fitur:
- **Axios instance** dengan `baseURL` dari `runtimeConfig.public.apiUrl`
- **Header `Accept-Language`** otomatis diisi dari locale aktif (`useI18n().locale`) di setiap request — backend mendeteksi bahasa dari header ini dan menerjemahkan `message` di response. Tidak perlu ditambahkan manual per service/request.
- **Auto-refresh token** saat mendapat 401 via interceptor
- **Auto-redirect** ke `/auth/sign-in` jika refresh gagal
- **Auto-redirect** ke `/` jika mendapat 403 (forbidden)

### Penggunaan di Service:

```typescript
// Semua request melalui apiService.client
const response = await apiService.client.get<ApiResponse<T>>('/endpoint', this.authHeaders)
const response = await apiService.client.post<ApiResponse<T>>('/endpoint', payload, this.authHeaders)
const response = await apiService.client.put<ApiResponse<T>>('/endpoint', payload, this.authHeaders)
const response = await apiService.client.delete<ApiResponse<T>>('/endpoint', this.authHeaders)
```

## 2. Pattern Service Class

Setiap feature memiliki service class yang mengikuti pattern ini:

```typescript
import { apiService } from "./api-service"
import { handleServiceError } from "../composables/error-helper"
import type { SortOrder } from "../composables/useTableQuery"
import type { Feature, FeaturePayload } from "../types/feature"
import type { ApiResponse } from "../types/api"

export class FeatureService {

  // Auth headers — WAJIB di setiap request yang butuh auth
  private get authHeaders() {
    return { headers: { Authorization: `Bearer ${useAuth().state.token}` } }
  }

  // GET ALL (pagination + search + sorting server-side)
  async getAll(
    page = 1,
    perPage = 10,
    q = '',
    sortBy = '',
    order: SortOrder = 'DESC'
  ): Promise<ApiResponse<Feature[]>> {
    try {
      // ⚠️ Nama parameter query adalah `limit` (konvensi backend), BUKAN `perPage`.
      const params = new URLSearchParams({ page: String(page), limit: String(perPage), q })
      if (sortBy) {
        params.set('sortBy', sortBy)
        params.set('order', order)
      }
      const response = await apiService.client.get<ApiResponse<Feature[]>>(
        `/feature?${params.toString()}`,
        this.authHeaders
      )
      return response.data
    } catch (error: any) {
      return handleServiceError(error)
    }
  }

  // GET BY ID
  async getById(id: number): Promise<ApiResponse<Feature>> {
    try {
      const response = await apiService.client.get<ApiResponse<Feature>>(
        `/feature/${id}`,
        this.authHeaders
      )
      return response.data
    } catch (error: any) {
      return handleServiceError(error)
    }
  }

  // CREATE
  async create(payload: FeaturePayload): Promise<ApiResponse<Feature>> {
    try {
      const response = await apiService.client.post<ApiResponse<Feature>>(
        `/feature`,
        payload,
        this.authHeaders
      )
      return response.data
    } catch (error: any) {
      return handleServiceError(error)
    }
  }

  // UPDATE
  async update(id: number, payload: FeaturePayload): Promise<ApiResponse<Feature>> {
    try {
      const response = await apiService.client.put<ApiResponse<Feature>>(
        `/feature/${id}`,
        payload,
        this.authHeaders
      )
      return response.data
    } catch (error: any) {
      return handleServiceError(error)
    }
  }

  // DELETE
  async delete(id: number): Promise<ApiResponse<null>> {
    try {
      const response = await apiService.client.delete<ApiResponse<null>>(
        `/feature/${id}`,
        this.authHeaders
      )
      return response.data
    } catch (error: any) {
      return handleServiceError(error)
    }
  }
}

// Export singleton — WAJIB
export const featureService = new FeatureService()
```

### Aturan Service:
1. **Selalu export sebagai singleton** — `export const featureService = new FeatureService()`
2. **Selalu gunakan `authHeaders`** — Untuk endpoint yang membutuhkan auth
3. **Selalu wrap dalam try-catch** — Catch diarahkan ke `handleServiceError`
4. **Selalu type response** — `apiService.client.get<ApiResponse<Feature[]>>`
5. **Return `response.data`** — Bukan `response`, karena Axios wrap di `.data`

## 3. Error Handler

`error-helper.ts` menangani semua error dari service secara global:

```typescript
export const handleServiceError = (error: any): never => {
  if (axios.isCancel(error)) {
    throw error                    // Re-throw cancelled requests
  }

  const toast = useToast()
  const responseData = error.response?.data

  let title = responseData?.message || 'Gagal'
  let message = ''

  // Handle validation errors (422)
  if (error.response?.status === 422 && responseData?.errors) {
    message = responseData.errors.map((err: any) => err.message).join(', ')
  } else {
    message = responseData?.message || error.message || 'Terjadi kesalahan'
    if (message === title) message = ''
  }

  toast.add({
    title,
    description: message,
    icon: 'i-lucide-circle-x',
    color: 'error'
  })

  throw new Error()               // Re-throw to stop execution
}
```

### Behaviour:
- **422 (Validation)**: Menampilkan semua pesan error digabung dengan koma
- **Error lain**: Menampilkan `message` dari response
- **Selalu throw** — Caller harus handle di `finally` block, bukan `catch`

> **⚠️ TODO (i18n gap)**: Fallback title (`'Gagal'`) dan fallback message (`'Terjadi kesalahan'`) di
> `error-helper.ts` saat ini **hardcode Bahasa Indonesia**, tidak lewat i18n — akan selalu tampil
> dalam Bahasa Indonesia walau locale aktif `en`. Kalau menyentuh file ini, pindahkan fallback text
> tersebut ke key i18n baru (mis. `components.errorHelper.*`) mengikuti aturan di
> [i18n-guide.md](./i18n-guide.md). Pesan dari `responseData?.message` sendiri berasal dari API
> backend dan di luar cakupan i18n frontend.

## 4. Type Definitions

### Pattern Type File (`app/types/<feature>.d.ts`)

```typescript
// Data model dari API
export interface Feature {
  id: number
  name: string
  // ... field lain sesuai API response
  createdAt?: string
  updatedAt?: string
}

// Payload untuk create/update
export interface FeaturePayload {
  name: string
  // ... field yang dikirim ke API (tanpa id, timestamps)
}

// ApiResponse & PaginationMeta TIDAK didefinisikan di sini —
// keduanya shared di app/types/api.d.ts:
import type { ApiResponse } from './api'
```

`app/types/api.d.ts` adalah sumber tunggal untuk wrapper response (`ApiResponse<T>`, `PaginationMeta`).
Type file per fitur cukup meng-import-nya (beberapa file seperti `auth.d.ts` & `setting.d.ts` juga
me-`export type { ApiResponse }` supaya pemanggil lama tidak perlu ganti import).

### ⚠️ `limit` (request) vs `perPage` (response) — jangan tertukar

| Arah | Nama | Isi |
| ---- | ---- | --- |
| **Request** (query string) | `limit` | Jumlah baris per halaman yang **dikirim** service, mis. `?page=2&limit=25` |
| **Response** (`response.meta`) | `perPage` | Jumlah baris per halaman yang **dilaporkan** backend, bersama `currentPage`, `lastPage`, `total`, `from`, `to` |

Jadi service memakai `perPage` sebagai nama **parameter fungsi** (biar jelas di sisi frontend), tapi
mengirimnya ke backend sebagai `limit`; sementara `response.meta.perPage` tetap dibaca apa adanya.

## 5. Auth Service

`auth-service.ts` menangani semua authentication:

### Methods:

| Method | Endpoint | Keterangan |
|--------|----------|------------|
| `login(email, password)` | `POST /auth/login` | Login dengan credentials |
| `google(code)` | `POST /auth/google` | Login via Google OAuth |
| `forgotPassword(email)` | `POST /auth/forgot-password` | Request reset link |
| `validateResetPassword(email, token)` | `GET /auth/validate-reset-token` | Validasi reset token |
| `resetPassword(token, password)` | `POST /auth/reset-password` | Reset password |
| `logout()` | `POST /auth/logout` | Logout + clear session |
| `refreshToken()` | `POST /auth/refresh` | Auto-refresh token |

### Session Management:

```
localStorage:
├── accessToken   → Bearer token untuk API requests
├── refreshToken  → Token untuk refresh
└── user          → JSON string user object
```

### useAuth Composable:

```typescript
const { state, service } = useAuth()

// Read-only state
state.token  // string | null
state.user   // User | null

// Service methods
service.logout()
service.login(email, password)
```

## 6. Composables

### useAuth

- **Fungsi**: Accessor untuk auth state (readonly getter)
- **Penggunaan**: Di component yang perlu akses user/token
- **Jangan**: Modifikasi state langsung, gunakan `authService` methods

### useNavigation

- **Fungsi**: Konfigurasi sidebar navigation + active state detection
- **Data**: `navGroups` (menu utama, termasuk grup bersarang seperti CMS & User Management) dan `isCollapsed`
  (sidebar state)
- **Tambah menu**: Tambahkan item baru di dalam `navGroups`
- ⚠️ **i18n-aware** — `navGroups` adalah `computed()`, bukan array statis, dan setiap `label` diambil dari
  `t('components.sidebar.nav.<key>')`. Lihat [i18n-guide.md](./i18n-guide.md) §5 untuk aturan pola
  stable-`id` sebelum menambah menu baru.

```typescript
// Menambah menu baru (pola nyata — bukan array statis):
const { t } = useI18n()

const navGroups = computed<NavGroup[]>(() => {
  const groups: NavGroup[] = [
    {
      items: [
        { id: 'dashboard', label: t('components.sidebar.nav.dashboard'), to: '/', icon: 'i-lucide-layout-dashboard' }
      ]
    }
  ]

  // Tambah di sini — id WAJIB stabil (bahasa Inggris), label lewat t():
  // Item dengan permission dicek lewat can('products.view') sebelum di-push.
  groups.push({
    items: [
      { id: 'product', label: t('components.sidebar.nav.product'), to: '/product', icon: 'i-lucide-package' }
    ]
  })

  return groups
})
```

Jangan lupa tambah `components.sidebar.nav.product` ke **kedua** `i18n/locales/en.json` dan `id.json`.

### useImageUpload

- **Fungsi**: Alur baku "pilih file → preview lokal → upload → simpan path → rollback bila gagal"
- **File**: `app/composables/useImageUpload.ts` — dipakai modal user, halaman profil, `settings/meta.vue`, dan
  form artikel
- **Signature**:

```typescript
const { isUploading, previewUrl, uploadFile, clearPreview, setPreviewFromUrl } = useImageUpload({
  upload: file => userService.uploadPhoto(file), // method upload dari service
  onUploaded: (path) => { form.photo = path },  // simpan path hasil upload ke form
  successMessage: t('pages.profile.information.photoUploadSuccess'),
  errorMessage: t('pages.profile.information.photoUploadFailed')
})
```

| Return | Tipe | Keterangan |
| ------ | ---- | ---------- |
| `isUploading` | `Ref<boolean>` | Untuk `:disabled` / spinner |
| `previewUrl` | `Ref<string \| null>` | Blob lokal (setelah pilih file) atau URL tersimpan |
| `uploadFile` | `(file) => Promise<boolean>` | Jalankan upload; `false` kalau gagal |
| `clearPreview` | `() => void` | Buang preview + revoke object URL |
| `setPreviewFromUrl` | `(url) => void` | Pasang preview dari path/URL yang sudah tersimpan |

Jaminan yang sudah dipegang composable ini (jangan diduplikasi di komponen):

1. **Object URL selalu di-revoke** — saat preview diganti, di-rollback, atau komponen di-unmount
   (`onBeforeUnmount(clearPreview)`). Sebelumnya blob tertahan di memori selama sesi berlangsung.
2. **Preview selalu di-rollback saat upload gagal** — URL lama dipulihkan dan toast error muncul, sehingga
   preview tidak lagi "berbohong" menampilkan gambar yang sebenarnya gagal tersimpan.

Aturan pemakaian: jangan memanggil `URL.createObjectURL` langsung dari modal/halaman — util di
`app/utils/file.ts` hanya dipakai dari dalam composable ini.

### error-helper (handleServiceError)

- **Fungsi**: Global error handler untuk service layer
- **Auto**: Menampilkan toast error
- **Auto**: Handle validation errors (422)
- **Selalu throw**: Caller harus handle di `finally`

## 7. Import Pattern

```typescript
// Service — direct import
import { faqService } from '~/services/faq-service'

// Types — type-only import
import type { Faq, FaqPayload } from '~/types/faq'
import type { ApiResponse } from '~/types/api'

// Composable — auto-imported oleh Nuxt (tidak perlu import)
const { state } = useAuth()
const toast = useToast()
const route = useRoute()

// External lib
import { z } from 'zod'
import axios from 'axios'
```

## 8. Checklist Membuat Service Baru

1. Buat file type: `app/types/<feature>.d.ts` (import `ApiResponse` dari `app/types/api.d.ts`)
2. Buat file service: `app/services/<feature>-service.ts`
3. Ikuti pattern `FaqService` persis (`app/services/faq-service.ts`)
4. Export singleton di akhir file
5. Gunakan `handleServiceError` di setiap catch
6. Type semua response dengan generic `ApiResponse<T>`
7. Tambahkan `authHeaders` di setiap method yang butuh auth
8. Kalau ada upload gambar: sediakan method upload yang mengembalikan `ApiResponse<{ path: string }>`, lalu
   pakai dari komponen lewat `useImageUpload` (lihat §6)
