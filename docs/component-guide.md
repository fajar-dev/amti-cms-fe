# 🧩 Component Guide

## Prinsip Dasar

1. **Reusability** — Komponen harus bisa dipakai ulang di berbagai konteks
2. **Single Responsibility** — Satu komponen, satu tanggung jawab
3. **Props Down, Events Up** — Data mengalir ke bawah via props, perubahan dikomunikasikan via emit
4. **Modal = Component** — Semua modal, dialog, dan popup **HARUS** dijadikan component terpisah, BUKAN ditulis inline di page
5. **Dark mode via semantic tokens, BUKAN class `dark:`** — App ini support dark mode (toggle: `UColorModeButton` di `layouts/auth.vue`, dan item toggle di `UserPopover.vue` via `useColorMode()` dari `@nuxtjs/color-mode`). JANGAN hardcode warna neutral/white (`bg-white`, `text-neutral-900`, `border-neutral-200`, dst) — pakai token semantik NuxtUI yang otomatis adaptif ke dark mode:
   - Background: `bg-default` (putih/neutral-900), `bg-muted` (neutral-50/neutral-800), `bg-elevated`, `bg-accented`
   - Text: `text-highlighted` (judul/neutral-900), `text-toned`, `text-default`, `text-muted`, `text-dimmed` (paling redup)
   - Border/ring: `border-default`, `border-muted`, `border-accented`, `ring-default`, `ring-muted`
   - Warna aksen (`bg-emerald-500/10`, dsb) pakai shade mid + opacity (`/10`), BUKAN shade `-50`/`-100` solid — shade terang solid nyaris tak terlihat di background gelap
   - Aset gambar dengan teks/warna solid (mis. logo) butuh 2 versi file (light/dark) di-switch via `useColorMode()` — lihat `BrandLogo.vue`
   - Pengecualian: warna literal (`text-white`, `bg-black/40`) tetap boleh dipakai kalau elemennya duduk di atas background yang SELALU gelap terlepas dari tema (contoh: overlay foto) — di situ warna TIDAK boleh ikut flip ke token semantik

## Kategori Komponen

### 1. Global Components (`app/components/`)

Komponen yang digunakan di seluruh aplikasi. Auto-imported oleh Nuxt.

| Komponen | Fungsi | Props | Emits |
|----------|--------|-------|-------|
| `BrandLogo` | Logo + nama aplikasi (2 versi asset: `logo-with-text.png` light, `logo-with-text-dark.png` dark) | `isCollapsed?: boolean` | — |
| `Header` | Page header: title, description, tabs, actions, mobile nav | `title: string`, `description?: string` | — |
| `Sidebar` | Navigasi sidebar (collapsible, responsive, i18n-aware) | — | — |
| `LanguageSwitcher` | Switch bahasa (English/Indonesia) | — | — |
| `UserPopover` | User profile dropdown + logout + toggle dark/light (via `useColorMode()`) | `popoverProps?: Record<string, any>` | — |
| `DeleteModal` | Generic delete confirmation modal | `title?: string`, `itemName?: string`, `loading?: boolean` | `confirm` |
| `DataTable` | Generic list table: search, per-page, sortable headers (via `useTableQuery`), pagination, **empty state bawaan**, `#filters`/`#actions`/`#expanded` slots | `columns`, `data`, `loading?`, `total?`, `from?`, `to?`, `searchPlaceholder?`, `limitOptions?`, `tableClass?` (+ `v-model` untuk `search`/`page`/`perPage`/`expanded`) | — |

**Subfolder `common/`** (`app/components/common/`) — komponen bantu yang dipakai lintas fitur:

| Komponen | Fungsi | Props | Emits |
|----------|--------|-------|-------|
| `CommonSortableHeader` | Header kolom tabel yang bisa diklik untuk sorting; dipasang lewat `useTableQuery().sortHeader()` | `label: () => string`, `active?: boolean`, `order?: SortOrder`, `align?: 'left' \| 'center' \| 'right'` | `toggle` |
| `CommonEditorUrlModal` | Modal input URL untuk editor Tiptap (link & gambar) — **pengganti `window.prompt`** | `modelValue: boolean` (v-model), `mode: 'link' \| 'image'`, `initialUrl?: string` | `submit` (payload: `string`) |
| `CommonTiptapEditor` | Rich text editor artikel (Tiptap) | `modelValue?: string`, `placeholder?: string` | `update:modelValue` |

**Subfolder `content/`** (`app/components/content/`) — komponen modul CMS:

| Komponen | Fungsi | Props | Emits |
|----------|--------|-------|-------|
| `ContentArticleForm` | Form artikel bersama untuk halaman **create & edit** — lihat [page-pattern.md](./page-pattern.md) §"Pattern 4" | `articleId?: number` (kosong = create) | `submitted` |
| `ContentCategoryAddModal` / `ContentCategoryUpdateModal` | Modal CRUD kategori artikel | `modelValue: boolean` (v-model), + item untuk update | `created` / `updated` |

> **Toggle dark mode:** tombol toggle di area dashboard ada di dalam `UserPopover` (memakai `useColorMode()`),
> sedangkan `UColorModeButton` bawaan NuxtUI dipakai di `app/layouts/auth.vue`. Jangan tambah tombol toggle
> baru di tempat lain.

> ⚠️ **Semua teks di atas (title, description, label toast, dsb.) di kode asli lewat `$t()`, bukan string statis.** Lihat [i18n-guide.md](./i18n-guide.md). Contoh kode di bawah ini disederhanakan pakai teks polos agar mudah dibaca — saat implementasi nyata, **ganti semua teks dengan `$t('...')` / `t('...')`**.

### 2. Feature Components (`app/components/<feature>/`)

Komponen spesifik untuk fitur tertentu. Dinamakan dengan prefix folder.

**Contoh: `faq/`** — modul CRUD terkecil & paling bersih di project ini, dipakai sebagai acuan:

| Komponen | Fungsi | Props | Emits |
|----------|--------|-------|-------|
| `FaqAddModal` | Form tambah FAQ | `modelValue: boolean` (v-model) | `created` |
| `FaqUpdateModal` | Form edit FAQ | `modelValue: boolean`, `faq: Faq \| null` | `updated` |

Contoh lain yang lebih kompleks: `user/` (modal + upload foto), `content/category/` (modal kategori artikel),
`content/ArticleForm.vue` (form halaman penuh, bukan modal).

> **Auto-naming oleh Nuxt:** File `components/faq/AddModal.vue` otomatis jadi `<FaqAddModal />`.
>
> **Delete tidak perlu modal sendiri** — pakai `DeleteModal` global.

## Aturan Wajib: Modal HARUS Jadi Component

### ❌ SALAH — Modal ditulis inline di page

```vue
<!-- pages/product/index.vue -->
<template>
  <div>
    <!-- ... page content ... -->
    
    <!-- ❌ JANGAN tulis modal langsung di page -->
    <UModal v-model:open="showAdd">
      <template #body>
        <UForm ...>
          <!-- 50+ baris form code -->
        </UForm>
      </template>
    </UModal>
  </div>
</template>
```

### ✅ BENAR — Modal dijadikan component terpisah

```vue
<!-- components/product/AddModal.vue -->
<template>
  <UModal ...>
    <!-- Modal content -->
  </UModal>
</template>

<!-- pages/product/index.vue -->
<template>
  <div>
    <!-- ... page content ... -->
    <ProductAddModal v-model="showAdd" @created="fetchProducts" />
  </div>
</template>
```

## Pattern: Add Modal Component

> Key i18n di bawah ini contoh untuk feature `[feature]` — sesuaikan namespace-nya
> (`components.[feature].addModal.*`) dan tambahkan ke **kedua** `i18n/locales/en.json` & `id.json`.
>
> **Field required:** kalau field itu wajib di Zod schema (tidak `.optional()`/`.nullable()`), `<UFormField>`-nya **WAJIB** diberi atribut `required` — ini yang menampilkan tanda `*` di label. Field opsional (switch/toggle, select dengan default, atau field yang eksplisit `.optional()`) **tidak** diberi `required`. Lihat §"Aturan: `required` di UFormField" di bawah.
>
> **JANGAN menulis `:ui` lebar/overlay/body di modal baru.** `app/app.config.ts` sudah meng-override slot
> `modal` secara global:
>
> ```ts
> modal: {
>   slots: {
>     content: 'sm:max-w-lg',
>     overlay: '!backdrop-blur-xs !bg-white/10',
>     body: 'border-0 !py-0',
>     header: 'border-0'
>   }
> }
> ```
>
> Tulis `:ui="..."` hanya kalau modal itu memang butuh hal berbeda (mis. modal RBAC pakai
> `content: 'max-w-2xl'`). Modal `faq/user/messages` tidak menulis `:ui` sama sekali.
>
> **Tombol Cancel baku:** `color="neutral" variant="soft"` + label `$t('common.cancel')` — bukan
> `variant="outline"`, dan label tidak perlu key per-fitur.

```vue
<template>
  <UModal
    v-model:open="open"
    :title="$t('components.[feature].addModal.title')"
    :description="$t('components.[feature].addModal.description')"
  >
    <template #body>
      <UForm id="add-[feature]-form" :schema="schema" :state="form" @submit="handleSubmit" class="space-y-3">
        <UFormField :label="$t('components.[feature].addModal.fieldNameLabel')" name="fieldName" required>
          <UInput v-model="form.fieldName" :placeholder="$t('components.[feature].addModal.fieldNamePlaceholder')" class="w-full" />
        </UFormField>
        <!-- More fields -->
      </UForm>
    </template>
    <template #footer>
      <div class="flex justify-end items-center gap-2 w-full">
        <UButton :label="$t('common.cancel')" color="neutral" variant="soft" @click="() => { open = false }" />
        <UButton
          type="submit"
          form="add-[feature]-form"
          color="primary"
          :loading="isSubmitting"
        >
          {{ $t('common.save') }}
        </UButton>
      </div>
    </template>
  </UModal>
</template>

<script setup lang="ts">
import { z } from 'zod'
import { featureService } from '~/services/[feature]-service'
import type { FeaturePayload } from '~/types/[feature]'

const open = defineModel<boolean>({ default: false })
const emit = defineEmits<{ created: [] }>()
const toast = useToast()
const isSubmitting = ref(false)
const { t } = useI18n()

const schema = z.object({
  fieldName: z.string().min(1, t('components.[feature].addModal.fieldNameRequired'))
})

const form = reactive<FeaturePayload>({
  fieldName: ''
})

const resetForm = () => {
  form.fieldName = ''
}

const handleSubmit = async () => {
  isSubmitting.value = true
  try {
    const response = await featureService.create(form)
    if (response.success) {
      toast.add({
        title: t('components.[feature].addModal.createdSuccess'),
        color: 'success',
        icon: 'i-lucide-circle-check'
      })
      emit('created')
      open.value = false
      resetForm()
    }
  } finally {
    isSubmitting.value = false
  }
}

watch(open, (val) => {
  if (!val) resetForm()
})
</script>
```

## Aturan: `required` di UFormField

Setiap `<UFormField>` untuk field yang **wajib diisi** di Zod schema (bukan `.optional()`/`.nullable()`, tanpa fallback `.or(z.literal(''))`) **WAJIB** diberi atribut `required`. NuxtUI otomatis menampilkan tanda `*` di label saat atribut ini ada — jangan tambahkan tanda `*` manual ke teks label.

```vue
<!-- ✅ BENAR — field wajib di schema, UFormField diberi required -->
<UFormField :label="$t('components.user.addModal.nameLabel')" name="name" required>
  <UInput v-model="form.name" ... />
</UFormField>

<!-- ✅ BENAR — field opsional di schema, TIDAK diberi required -->
<UFormField :label="$t('components.user.addModal.roleLabel')" name="role">
  <USelect v-model="form.role" ... />
</UFormField>
```

```typescript
const schema = z.object({
  name: z.string().min(1, t('...')),                    // wajib → required di UFormField
  role: z.enum(['admin', 'user']).nullable().optional(), // opsional → JANGAN required
  oldPassword: z.string().optional().or(z.literal('')),  // opsional → JANGAN required
})
```

**Kasus khusus:**
- Field boolean via `USwitch`/`UCheckbox` (mis. status aktif/nonaktif) — jangan diberi `required`, selalu punya nilai default.
- Field select dengan default value (mis. `type` dengan default `customer`) tapi **wajib** di schema (tidak `.optional()`) — tetap diberi `required`, karena aturannya berdasarkan schema, bukan ada/tidaknya default.
- Update modal yang field-nya jadi opsional (mis. password "kosongkan jika tidak diubah") — **jangan** ikut pola Add modal-nya begitu saja, cek schema update-nya masing-masing.

## Pattern: Update Modal Component

```vue
<template>
  <!-- Sama seperti Add Modal: TANPA :ui override (ikut app.config.ts global) -->
  <UModal
    v-model:open="open"
    :title="$t('components.[feature].updateModal.title')"
    :description="$t('components.[feature].updateModal.description')"
  >
    <template #body>
      <UForm id="update-[feature]-form" :schema="schema" :state="form" @submit="handleSubmit" class="space-y-3">
        <!-- Same fields as Add (namespace components.[feature].updateModal), populated from props.item -->
      </UForm>
    </template>
    <template #footer>
      <div class="flex justify-end items-center gap-2 w-full">
        <UButton :label="$t('common.cancel')" color="neutral" variant="soft" @click="() => { open = false }" />
        <UButton type="submit" form="update-[feature]-form" color="primary" :loading="isSubmitting">
          {{ $t('common.save') }}
        </UButton>
      </div>
    </template>
  </UModal>
</template>

<script setup lang="ts">
import { z } from 'zod'
import { featureService } from '~/services/[feature]-service'
import type { Feature, FeaturePayload } from '~/types/[feature]'

const open = defineModel<boolean>({ default: false })

const props = defineProps<{
  [feature]: Feature | null       // Data item yang akan di-edit
}>()

const emit = defineEmits<{ updated: [] }>()
const toast = useToast()
const isSubmitting = ref(false)
const { t } = useI18n()

// Schema (namespace terpisah dari Add: components.[feature].updateModal.*)
const schema = z.object({ /* z.string().min(1, t('components.[feature].updateModal.fieldNameRequired')) */ })

const form = reactive<FeaturePayload>({ /* ... */ })

// Populate form saat modal dibuka
const populateForm = () => {
  if (props.[feature]) {
    form.fieldName = props.[feature].fieldName
    // ... populate semua field
  }
}

const handleSubmit = async () => {
  if (!props.[feature]) return
  isSubmitting.value = true
  try {
    const response = await featureService.update(props.[feature].id, form)
    if (response.success) {
      toast.add({
        title: t('components.[feature].updateModal.updatedSuccess'),
        color: 'success',
        icon: 'i-lucide-circle-check'
      })
      emit('updated')
      open.value = false
    }
  } finally {
    isSubmitting.value = false
  }
}

// Watch: populate saat modal open
watch(open, (val) => {
  if (val) populateForm()
})
</script>
```

## Pattern: Menggunakan Generic DeleteModal

Untuk delete, **gunakan DeleteModal global** bukan buat baru:

```vue
<!-- Di page -->
<DeleteModal
  v-model="showDeleteModal"
  :title="$t('pages.[feature].deleteTitle')"
  :item-name="selectedItem?.name"
  :loading="isDeleting"
  @confirm="handleDelete"
/>
```

```typescript
// Handler di page
const { t } = useI18n()

const handleDelete = async () => {
  if (!selectedItem.value) return
  isDeleting.value = true
  try {
    const response = await featureService.delete(selectedItem.value.id)
    if (response.success) {
      toast.add({
        title: t('pages.[feature].deletedSuccess'),
        color: 'success',
        icon: 'i-lucide-circle-check'
      })
      // Modal ditutup HANYA saat sukses:
      showDeleteModal.value = false
      fetchItems()
    } else {
      // Gagal → modal TETAP TERBUKA + toast error, user bisa coba lagi
      toast.add({
        title: response.message || t('common.error'),
        color: 'error',
        icon: 'i-lucide-circle-alert'
      })
    }
  } finally {
    isDeleting.value = false
  }
}
```

> **Jangan tutup modal seolah-olah sukses.** Kalau delete gagal, tampilkan toast error dan biarkan modal
> terbuka (contoh nyata: `app/pages/faq/index.vue` dan halaman CRUD lain) — sebelumnya beberapa halaman
> menutup modal tanpa memberi tahu user bahwa data masih ada.
>
> `DeleteModal` sendiri sudah punya default title/description via i18n (`components.deleteModal.*`) — kirim
> `:title` custom hanya kalau perlu override, seperti contoh di atas.
>
> **Catatan `variant`:** `DeleteModal` (konfirmasi destruktif) memakai Cancel `variant="outline"`, sedangkan
> modal form (Add/Update/Editor) memakai `variant="soft"`. Pembeda ini disengaja — jangan diseragamkan.

## Pattern: Upload Gambar — WAJIB `useImageUpload`

Semua alur "pilih file → preview lokal → upload → simpan path → rollback bila gagal" **WAJIB** lewat
composable `useImageUpload` (`app/composables/useImageUpload.ts`). Jangan menulis sendiri
`URL.createObjectURL` + panggil service upload manual di modal/halaman.

```vue
<template>
  <!-- Preview -->
  <UAvatar v-if="previewUrl" :src="previewUrl" size="3xl" />

  <UFileUpload
    v-model="photoFile"
    variant="button"
    size="xs"
    color="neutral"
    icon="i-lucide-upload"
    accept="image/*"
    reset
    :label="$t('components.user.addModal.choosePhoto')"
    :disabled="isUploading"
  />
</template>

<script setup lang="ts">
const photoFile = ref<File | null>(null)

const { isUploading, previewUrl, uploadFile, clearPreview } = useImageUpload({
  upload: file => userService.uploadPhoto(file),   // method upload dari service
  onUploaded: (path) => { form.photo = path },     // simpan path hasil upload ke form
  successMessage: t('components.user.addModal.photoUploadSuccess'),
  errorMessage: t('components.user.addModal.photoUploadFailed')
})

// Auto-upload begitu user memilih file
watch(photoFile, (file) => {
  if (file) uploadFile(file)
})
</script>
```

| Return | Tipe | Keterangan |
| ------ | ---- | ---------- |
| `isUploading` | `Ref<boolean>` | Untuk `:disabled` / spinner |
| `previewUrl` | `Ref<string \| null>` | Blob lokal (setelah pilih file) atau URL tersimpan |
| `uploadFile` | `(file) => Promise<boolean>` | Jalankan upload; `false` kalau gagal |
| `clearPreview` | `() => void` | Buang preview + revoke object URL |
| `setPreviewFromUrl` | `(url) => void` | Pasang preview dari path yang sudah tersimpan (mode edit) |

Contoh nyata: `app/components/user/AddModal.vue`, `app/components/user/UpdateModal.vue`,
`app/pages/settings/meta.vue` (logo/favicon/og-image), `app/pages/profile/information.vue`, dan
`app/components/content/ArticleForm.vue` (cover artikel).

Jaminan yang sudah dipegang composable ini — **jangan diduplikasi di komponen**:

1. **Object URL selalu di-revoke** saat preview diganti, di-rollback, atau komponen di-unmount
   (`onBeforeUnmount(clearPreview)`). Sebelumnya blob tertahan di memori selama sesi berlangsung.
2. **Preview selalu di-rollback saat upload gagal** — URL lama dipulihkan dan toast error muncul, sehingga
   preview tidak lagi "berbohong" menampilkan gambar yang sebenarnya gagal tersimpan.

> `app/utils/file.ts` (`createPreviewUrl`/`revokePreviewUrl`) dipakai **dari dalam** composable tersebut,
> bukan dipanggil langsung dari modal/halaman.

## Pattern: `SortableHeader` (Header Kolom Tabel)

`app/components/common/SortableHeader.vue` adalah header kolom `UTable` yang bisa diklik untuk sorting.
**Jangan** menulis header sendiri di kolom: pakai `sortHeader()` dari `useTableQuery`, yang otomatis
memasang komponen ini beserta state `sortBy`/`order`-nya.

```typescript
const { search, page, perPage, sortBy, order, sortHeader } = useTableQuery(fetchFaqs)

const columns = computed<TableColumn<Faq>[]>(() => [
  {
    accessorKey: 'question',
    header: sortHeader(() => t('pages.faq.question'), 'question'),
    cell: ({ row }) => row.original.question
  }
])
```

**Kenapa harus komponen `.vue`, bukan render function di file `.ts`?** `SortableHeader` memakai `UIcon` dan
token warna semantik NuxtUI di template-nya. Komponen NuxtUI tidak bisa dirender lewat `h(...)` dari file
`.ts` biasa tanpa resolve manual; dengan file `.vue`, auto-import Nuxt dan kompilasi template Tailwind
tetap jalan normal. Ini alasan `sortHeader()` di `useTableQuery.ts` menerima **fungsi** `() => string`
(bukan string) — label harus reaktif terhadap locale, dan komponennya hidup di file `.vue`.

## Pattern: `EditorUrlModal` (Link & Gambar Tiptap)

`window.prompt` **DILARANG** (tidak bisa i18n, tidak ada validasi, tidak bisa di-style). Untuk input URL
link/gambar di editor, `TiptapEditor.vue` membuka `app/components/common/EditorUrlModal.vue`:

```vue
<CommonEditorUrlModal
  v-model="showUrlModal"
  :mode="urlModalMode"          <!-- 'link' | 'image' -->
  :initial-url="currentUrl"
  @submit="applyUrl"
/>
```

- `mode="link"` → label/judul modal untuk menyisipkan tautan; `mode="image"` → untuk menyisipkan gambar.
- `initialUrl` diisi URL node yang sedang aktif, supaya user bisa mengedit (bukan cuma menambah).
- `@submit` mengirim URL yang sudah lolos validasi Zod (`z.string().url()`), lalu `TiptapEditor` memanggil
  command Tiptap yang sesuai.
- Modal ini mengecilkan lebar (`content: 'sm:max-w-md'`) karena kontennya cuma satu input — inilah contoh
  override `:ui` yang **sah**: memang beda dari default global (`sm:max-w-lg`).

## Pattern: `ArticleForm` (Form Halaman Penuh, Bukan Modal)

`app/components/content/ArticleForm.vue` adalah form artikel bersama untuk halaman **create** dan **edit**.
Halaman `app/pages/app/content/article/create.vue` dan `[id].vue` hanyalah pembungkus tipis:

```vue
<!-- create.vue -->
<ContentArticleForm />

<!-- [id].vue -->
<ContentArticleForm :article-id="articleId" />
```

Ketika `articleId` kosong → mode create; ketika diisi → mode edit (fetch by id lalu hydrate form). Detail
pola ini ada di [page-pattern.md](./page-pattern.md) §"Pattern 4: Halaman Form Create / Edit".

## Pattern: Header Component

Digunakan di setiap dashboard page sebagai header pertama:

```vue
<Header
  :title="$t('pages.[feature].title')"
  :description="$t('pages.[feature].description')"
>
  <!-- Optional: Tab navigation -->
  <template #tabs>
    <NuxtLink to="/feature" class="...">Tab 1</NuxtLink>
    <NuxtLink to="/feature/other" class="...">Tab 2</NuxtLink>
  </template>

  <!-- Optional: Action buttons -->
  <template #actions>
    <UButton icon="i-lucide-download">{{ $t('pages.[feature].export') }}</UButton>
  </template>
</Header>
```

## Checklist Membuat Feature Component Baru

Saat menambah fitur CRUD baru (misal: `product`):

1. **Types**: Buat `app/types/product.d.ts`
   - Interface `Product` (data dari API)
   - Interface `ProductPayload` (payload create/update)

2. **Service**: Buat `app/services/product-service.ts`
   - Class `ProductService` mengikuti pattern `FaqService` (`app/services/faq-service.ts`)
   - Export singleton: `export const productService = new ProductService()`

3. **Components**: Buat folder `app/components/product/`
   - `AddModal.vue` — Form create
   - `UpdateModal.vue` — Form update
   - Gunakan `DeleteModal` global (jangan buat baru)

4. **Page**: Buat `app/pages/product/index.vue`
   - Mengikuti pattern `app/pages/faq/index.vue` (halaman CRUD paling ringkas)
   - Kalau butuh filter status/tanggal, lihat `app/pages/messages/index.vue`
   - Kalau ada form create + edit halaman penuh (bukan modal), lihat pola `ContentArticleForm` di
     [page-pattern.md](./page-pattern.md) §"Pattern 4"

5. **Navigation**: Update `app/composables/useNavigation.ts`
   - Tambahkan nav item baru di `navGroups`, pakai pola stable-`id` (lihat [i18n-guide.md](./i18n-guide.md) §5)

6. **i18n**: Tambahkan semua key teks baru ke `i18n/locales/en.json` **dan** `id.json`
   - Namespace: `components.product.*` (modal) dan `pages.product.*` (page) — lihat [i18n-guide.md](./i18n-guide.md)

## v-model Pattern untuk Modal

Semua modal menggunakan `defineModel` untuk two-way binding:

```vue
<!-- Component -->
<script setup>
const open = defineModel<boolean>({ default: false })
</script>

<!-- Parent -->
<ComponentModal v-model="showModal" />
```

## Slot Pattern

| Komponen | Slot | Fungsi |
|----------|------|--------|
| `Header` | `#tabs` | Tab navigation links |
| `Header` | `#actions` | Action buttons (filter, export, dll) |
| `DataTable` | `#filters` | Control tambahan di baris search (mis. `USelectMenu` status) |
| `DataTable` | `#actions` | Tombol/aksi di kanan baris search |
| `DataTable` | `#expanded` | Konten baris yang di-expand (`{ row }`) |
| `DeleteModal` | `#description` | Custom delete message |
| `UModal` | `#body` | Modal body content |
| `UModal` | `#footer` | Modal footer (action buttons) |
| `UModal` | `#content` | Full custom modal content (dipakai `DeleteModal`) |
| `UInput` | `#trailing` | Trailing element (password toggle) |
| `UFormField` | `#hint` | Hint text/link |
| `UserPopover` | `default` | Custom trigger element |
| `UPopover` | `#content` | Popover body |

> **Empty state `DataTable` tidak perlu diisi manual** — `DataTable.vue` sudah memasang `<UEmpty>` lewat slot
> `#empty` milik `UTable`, jadi semua halaman CRUD otomatis punya tampilan "tidak ada data" (teksnya dari
> `components.dataTable.emptyTitle` / `emptyDescription`). Jangan buat empty state sendiri di halaman.

### Shared live chat components

- `ChatMessageBubble`: one message renderer for visitor and staff views; `ownSender` controls alignment.
- `ChatComposer`: Nuxt UI/Zod message form with attachment preview and translated validation, emits `sent` and `selected`.
- `ChatAttachmentButton`: Nuxt UI file picker for already-uploaded attachments; no local image object URLs are created.
- `useVisitorChat` / `useStaffChat`: API orchestration and state; `useChatPolling`: serial polling and unmount cleanup. A failed poll stops retries to avoid repeated API-error toasts.
- The ticket queue is a conversation selector, using server pagination internally and infinite scroll in the UI; it is not a CRUD data table.
