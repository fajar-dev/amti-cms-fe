# 📏 Coding Standards

> Dokumen ini berisi aturan ketat yang WAJIB dipatuhi oleh semua AI agent dan developer.

## 1. Larangan Keras (DILARANG)

### ❌ Dilarang Menggunakan Arbitrary Values / Hardcode Class

```vue
<!-- ❌ SALAH — DILARANG KERAS -->
<div class="px-[10px]">...</div>
<div class="m-[5px]">...</div>
<div class="w-[200px]">...</div>
<div class="h-[50vh]">...</div>
<div class="text-[14px]">...</div>
<div class="gap-[12px]">...</div>
<div class="max-w-[420px]">...</div>
<div class="top-[20px]">...</div>

<!-- ✅ BENAR — Gunakan Tailwind utility standar -->
<div class="px-2.5">...</div>
<div class="m-1">...</div>
<div class="w-52">...</div>
<div class="h-screen">...</div>
<div class="text-sm">...</div>
<div class="gap-3">...</div>
<div class="max-w-md">...</div>
<div class="top-5">...</div>
```

### Referensi Tailwind Spacing (untuk menghindari arbitrary values)

| Arbitrary | ➡️ Gunakan | Ukuran |
|-----------|-----------|--------|
| `[2px]` | `0.5` | 2px |
| `[4px]` | `1` | 4px |
| `[5px]` | `1` (terdekat) | 4px |
| `[6px]` | `1.5` | 6px |
| `[8px]` | `2` | 8px |
| `[10px]` | `2.5` | 10px |
| `[12px]` | `3` | 12px |
| `[14px]` | `3.5` | 14px |
| `[16px]` | `4` | 16px |
| `[20px]` | `5` | 20px |
| `[24px]` | `6` | 24px |
| `[32px]` | `8` | 32px |
| `[40px]` | `10` | 40px |
| `[48px]` | `12` | 48px |

### Referensi Max Width

| Arbitrary | ➡️ Gunakan | Ukuran |
|-----------|-----------|--------|
| `[320px]` | `max-w-xs` | 320px |
| `[384px]` | `max-w-sm` | 384px |
| `[420px]` | `max-w-md` | 448px (closest) |
| `[448px]` | `max-w-md` | 448px |
| `[512px]` | `max-w-lg` | 512px |
| `[640px]` | `max-w-xl` | 576px (closest) |

### ❌ Dilarang Membuat Component Manual jika NuxtUI Sudah Menyediakan

```vue
<!-- ❌ SALAH — Jangan buat custom button -->
<button class="bg-green-500 text-white px-4 py-2 rounded">Save</button>

<!-- ✅ BENAR — Gunakan NuxtUI -->
<UButton color="primary">Save</UButton>
```

### ❌ Dilarang Menulis Logic di Template

```vue
<!-- ❌ SALAH -->
<span>{{ new Date(item.createdAt).toLocaleDateString() }}</span>

<!-- ✅ BENAR -->
<span>{{ formatDate(item.createdAt, locale) }}</span>
```

### ❌ Dilarang Memformat Tanggal/Angka Manual

Semua format tanggal, tanggal-waktu, dan angka **WAJIB** lewat `app/utils/format.ts`:

```typescript
// ❌ SALAH — locale hardcode, tiap halaman bisa beda format
new Date(val).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
new Date(val).toLocaleString('en-US', { hour: '2-digit', minute: '2-digit' })
new Intl.NumberFormat('id-ID').format(count)

// ✅ BENAR — locale mengikuti bahasa aktif
import { formatDate, formatDateTime, formatNumber, formatTimeAgo } from '~/utils/format'  // atau auto-import
const { t, locale } = useI18n()

formatDate(row.original.createdAt, locale.value)          // 12 Okt 2026
formatDateTime(row.original.createdAt, locale.value)      // 12 Okt 2026, 14.30
formatNumber(row.original.viewsCount, locale.value)       // 12.345
formatTimeAgo(message.createdAt, t)                       // 3 jam lalu
```

> **Alasan historis:** dulu separuh halaman meng-hardcode `'id-ID'` dan separuh `'en-US'`, sehingga dua tabel
> bisa menampilkan format tanggal berbeda pada bahasa yang sama. Jangan ulangi — `toLocaleDateString` /
> `toLocaleString` / `Intl.*` tidak boleh muncul di halaman/komponen, hanya di `app/utils/format.ts`.

### ❌ Dilarang `window.prompt` / `window.confirm`

Dialog bawaan browser tidak bisa memakai i18n, tidak punya validasi, dan tidak bisa di-style. Semua input dari
user WAJIB lewat `<UModal>`:

```vue
<!-- ❌ SALAH -->
const url = window.prompt('Masukkan URL')
if (window.confirm('Yakin?')) { /* ... */ }

<!-- ✅ BENAR -->
<CommonEditorUrlModal v-model="showLinkModal" mode="link" :initial-url="currentUrl" @submit="applyLink" />
```

Contoh nyata: `app/components/common/EditorUrlModal.vue` menggantikan `window.prompt` untuk link & gambar di
`TiptapEditor.vue`; hapus data pakai `DeleteModal` global.

### ❌ Dilarang Upload/Preview Gambar Tanpa `useImageUpload`

```typescript
// ❌ SALAH — object URL tidak pernah di-revoke, preview tidak di-rollback saat gagal
const url = URL.createObjectURL(file)
previewUrl.value = url

// ✅ BENAR — pakai composable baku
const { isUploading, previewUrl, uploadFile, clearPreview, setPreviewFromUrl } = useImageUpload({
  upload: file => userService.uploadPhoto(file),
  onUploaded: (path) => { form.photo = path },
  successMessage: t('pages.profile.information.photoUploadSuccess'),
  errorMessage: t('pages.profile.information.photoUploadFailed')
})
```

`app/utils/file.ts` (`createPreviewUrl`/`revokePreviewUrl`) dipakai **dari dalam** composable tersebut, bukan
dipanggil langsung dari modal/halaman. Detail pattern: [component-guide.md](./component-guide.md) §"Pattern:
Upload Gambar".

### ❌ Dilarang Menggunakan `any` Tanpa Alasan

```typescript
// ❌ SALAH
const data: any = response.data

// ✅ BENAR
const data: Faq[] = response.data
```

### ❌ Dilarang Hardcode Teks UI (Wajib i18n)

```vue
<!-- ❌ SALAH -->
<UButton>Save</UButton>
<UInput placeholder="Enter name" />

<!-- ✅ BENAR -->
<UButton>{{ $t('common.save') }}</UButton>
<UInput :placeholder="$t('components.faq.addModal.questionPlaceholder')" />
```

Berlaku juga untuk toast title, pesan validasi Zod, `useHead({ title })`, header kolom `UTable`,
dan `aria-label` yang berisi kata-kata. Baca `docs/i18n-guide.md` untuk aturan lengkap.

**Setiap key baru WAJIB ditambahkan ke KEDUA file locale** (`i18n/locales/en.json` **dan**
`i18n/locales/id.json`) dengan key shape yang identik — bukan hanya ke file bahasa yang sedang dipakai.
Key yang hanya ada di satu file akan tampil sebagai teks literal (`pages.faq.title`) saat bahasa itu aktif.

## 2. Naming Conventions

### File Naming

| Tipe | Convention | Contoh |
|------|-----------|--------|
| Pages | `kebab-case.vue` | `forgot-password.vue` |
| Components (global) | `PascalCase.vue` | `BrandLogo.vue`, `DeleteModal.vue`, `DataTable.vue` |
| Components (feature) | `PascalCase.vue` di subfolder | `faq/AddModal.vue`, `content/ArticleForm.vue` |
| Composables | `camelCase.ts` dengan prefix `use` — **boleh punya state/reaktif** | `useAuth.ts`, `useImageUpload.ts` |
| Utils | `kebab-case.ts` — **fungsi murni saja**, satu concern per file | `format.ts`, `chart-colors.ts` |
| Services | `kebab-case.ts` dengan suffix `-service` | `auth-service.ts`, `faq-service.ts` |
| Types | `kebab-case.d.ts` | `api.d.ts`, `faq.d.ts` |
| Middleware | `kebab-case.ts` | `auth.global.ts`, `guest.ts` |
| i18n key | `camelCase`, nested per file (lihat `docs/i18n-guide.md`) | `components.faq.addModal.questionRequired` |

### `app/utils/` vs `app/composables/`

Keduanya di-auto-import Nuxt, tapi pembagiannya tegas:

| Folder | Isi | Contoh |
|--------|-----|--------|
| `app/utils/` | Fungsi murni: input → output, tanpa `ref`/`computed`/lifecycle | `slugify()`, `formatDate()`, `isEmptyHtml()` |
| `app/composables/` | Apa pun yang punya state/reaktivitas (`ref`, `computed`, `useState`, `onBeforeUnmount`) | `useImageUpload()`, `useTableQuery()` |

Hanya file di **level teratas** folder tersebut yang dipindai Nuxt — `app/utils/<subfolder>/` **tidak**
di-auto-import, jadi jangan menaruh util di subfolder.

### Variable & Function Naming

| Tipe | Convention | Contoh |
|------|-----------|--------|
| Variables | `camelCase` | `isLoading`, `selectedFaq` |
| Functions | `camelCase` dengan prefix verb | `handleSubmit`, `fetchFaqs` |
| Reactive state | `camelCase` | `const form = reactive({})` |
| Ref | `camelCase` | `const isSubmitting = ref(false)` |
| Constants | `UPPER_SNAKE_CASE` (di service/util) | `ACCESS_TOKEN_KEY`, `CHART_COLORS` |
| Interface/Type | `PascalCase` | `Faq`, `FaqPayload` |
| Emits | `past-tense` verb | `created`, `updated`, `deleted` |

### Component Naming (Auto-import oleh Nuxt)

```
app/components/BrandLogo.vue            → <BrandLogo />
app/components/DeleteModal.vue          → <DeleteModal />
app/components/DataTable.vue            → <DataTable />
app/components/faq/AddModal.vue         → <FaqAddModal />
app/components/faq/UpdateModal.vue      → <FaqUpdateModal />
app/components/common/TiptapEditor.vue  → <CommonTiptapEditor />
app/components/content/ArticleForm.vue  → <ContentArticleForm />
```

## 3. Script Setup Convention

Urutan penulisan dalam `<script setup lang="ts">`:

```vue
<script setup lang="ts">
// 1. Imports
import { z } from 'zod'
import { faqService } from '~/services/faq-service'
import type { Faq, FaqPayload } from '~/types/faq'

// 2. Page/Component Meta
definePageMeta({ layout: 'dashboard' })

// 3. Model & Props & Emits
const open = defineModel<boolean>({ default: false })
const props = defineProps<{ faq: Faq | null }>()
const emit = defineEmits<{ updated: [] }>()

// 4. Composables & Injections
const toast = useToast()
const route = useRoute()
const { t } = useI18n()

// 5. Reactive State
const isSubmitting = ref(false)
const form = reactive<FaqPayload>({ question: '', answer: '', order: 0, isActive: true })

// 6. Computed Properties
const isValid = computed(() => form.question.length > 0)

// 7. Validation Schema (pesan error WAJIB via t(), lihat docs/i18n-guide.md)
const schema = z.object({
  question: z.string().min(1, t('components.faq.addModal.questionRequired'))
})

// 8. Functions/Methods
const handleSubmit = async () => { /* ... */ }
const resetForm = () => { /* ... */ }

// 9. Watchers
watch(open, (val) => { /* ... */ })

// 10. Lifecycle Hooks
onMounted(() => { /* ... */ })
</script>
```

## 4. Template Convention

Urutan atribut pada element:

```vue
<UButton
  v-model="value"                    <!-- 1. v-model / v-if / v-for -->
  type="submit"                       <!-- 2. Native attributes -->
  form="add-faq-form"                 <!-- 3. Binding attributes -->
  color="primary"                     <!-- 4. Component props -->
  variant="soft"                      <!-- 5. Variant/style props -->
  :loading="isSubmitting"             <!-- 6. Dynamic bindings -->
  class="w-full"                      <!-- 7. Class (terakhir) -->
  @click="handleSubmit"               <!-- 8. Events -->
>
  {{ $t('common.save') }}
</UButton>
```

## 5. CSS Rules

### Import Order di `main.css`

```css
@import url('https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap');
@import "tailwindcss";
@import "@nuxt/ui";

@theme static {
  /* Custom theme tokens */
}
```

### Class Ordering di Template

Ikuti urutan: **Layout → Sizing → Spacing → Typography → Colors → Effects → State**

```vue
<!-- Urutan class yang benar -->
<div class="flex items-center gap-3 w-full px-4 py-2 text-sm font-medium text-neutral-900 bg-white rounded-md shadow-sm transition-colors hover:bg-neutral-50">
```

## 6. Formatting Rules

| Rule | Value |
|------|-------|
| Indent | 2 spaces |
| End of line | LF |
| Trailing comma | Never (`commaDangle: 'never'`) |
| Brace style | 1TBS (`braceStyle: '1tbs'`) |
| Final newline | Yes |
| Max line length | ~120 chars (soft limit) |
| Quote style | Single quotes |

## 7. TypeScript Rules

### Type Definition Pattern

Setiap feature HARUS memiliki file type di `app/types/<feature>.d.ts`:

```typescript
// Interface untuk data dari API
export interface Faq {
  id: number
  question: string
  answer: string
  order: number
  isActive: boolean
  createdAt?: string
  updatedAt?: string
}

// Interface untuk payload (create/update)
export interface FaqPayload {
  question: string
  answer: string
  order?: number
  isActive: boolean
}

// PaginationMeta & ApiResponse TIDAK ditulis ulang per fitur —
// keduanya sudah shared di app/types/api.d.ts (lihat docs/service-layer.md §4)
import type { ApiResponse } from './api'
```

### Import Types

```typescript
// Gunakan `import type` untuk type-only imports
import type { Faq, FaqPayload } from '~/types/faq'

// Bukan:
import { Faq } from '~/types/faq'
```

## 8. Git Commit Convention

Format: `<type>(<scope>): <description>`

| Type | Keterangan |
|------|-----------|
| `feat` | Fitur baru |
| `fix` | Bug fix |
| `docs` | Dokumentasi |
| `style` | Formatting (tanpa perubahan logic) |
| `refactor` | Refactoring code |
| `chore` | Maintenance, dependencies |

Contoh:
```
feat(faq): add create faq modal
fix(auth): handle token refresh race condition
docs: update component guide
refactor(service): extract error handler
```
