# 📄 Page Pattern Guide

## Aturan Umum

1. **Setiap page HARUS mendefinisikan layout** via `definePageMeta({ layout: '...' })`
2. **Setiap page HARUS menggunakan `Header` component** sebagai elemen pertama (untuk dashboard pages)
3. **Setiap auth page HARUS memiliki `useHead`** untuk SEO
4. **Modal di page** — Hanya panggil component, jangan tulis inline
5. **Root wrapper** — Gunakan `<div class="space-y-6">` sebagai wrapper utama

## Layout Assignment

| Layout      | Halaman                                                          | Middleware               |
| ----------- | ---------------------------------------------------------------- | ------------------------ |
| `dashboard` | `/` (dashboard), `/faq`, `/user`, `/roles`, `/messages`, `/content/category`, `/content/article`, `/settings/*`, `/profile/*` | `auth.global` (otomatis) |
| `auth`      | `/auth/sign-in`, `/auth/forgot-password`, `/auth/reset-password` | `guest`                  |

## Pattern 1: Dashboard Page (CRUD Listing)

Referensi: `app/pages/faq/index.vue` (modul CRUD paling bersih), `app/pages/messages/index.vue` (ada filter +
kolom tanggal), `app/pages/content/article/index.vue` (filter + kolom relasi).

> ⚠️ Semua teks (`title`, `description`, `placeholder`, label button, header kolom tabel, toast)
> WAJIB lewat `$t()` / `t()`. Lihat [i18n-guide.md](./i18n-guide.md). Namespace di bawah:
> `pages.[feature].*`.

Listing page **WAJIB** pakai component global `DataTable` + composable `useTableQuery` (lihat
[component-guide.md](./component-guide.md) §"Global Components") — jangan tulis ulang search/pagination/table
manual seperti versi lama. `DataTable` menangani search (debounced), per-page select, table, pagination, dan
**empty state bawaan** (`UEmpty` — tidak perlu dikonfigurasi per halaman). `useTableQuery` menangani state-nya
(search/page/perPage/sortBy/order) dan `sortHeader()` untuk kolom yang bisa diklik untuk sorting.

```vue
<template>
  <div class="space-y-6">
    <!-- 1. Header -->
    <Header :title="$t('pages.[feature].title')" :description="$t('pages.[feature].description')" />

    <!-- 2. DataTable — search, sort, pagination sudah built-in -->
    <DataTable
      v-model:search="search"
      v-model:page="page"
      v-model:per-page="perPage"
      :data="data"
      :columns="columns"
      :loading="isLoading"
      :total="meta.total"
      :from="meta.from"
      :to="meta.to"
      :search-placeholder="$t('pages.[feature].searchPlaceholder')"
    >
      <template #actions>
        <UButton
          color="primary"
          variant="solid"
          icon="i-lucide-plus"
          class="w-full sm:w-auto justify-center"
          @click="() => { showAddModal = true }"
        >
          {{ $t('pages.[feature].addFeature') }}
        </UButton>
      </template>
    </DataTable>

    <!-- 3. Modals (Component terpisah) -->
    <FeatureAddModal v-model="showAddModal" @created="fetchItems" />
    <FeatureUpdateModal
      v-model="showUpdateModal"
      :item="selectedItem"
      @updated="fetchItems"
    />
    <DeleteModal
      v-model="showDeleteModal"
      :title="$t('pages.[feature].deleteTitle')"
      :item-name="selectedItem?.name"
      :loading="isDeleting"
      @confirm="handleDelete"
    />
  </div>
</template>

<script setup lang="ts">
import { h, resolveComponent } from "vue";
import type { TableColumn } from "@nuxt/ui";
import type { Row } from "@tanstack/vue-table";
import { featureService } from "~/services/feature-service";
import type { Feature } from "~/types/feature";

// formatDate/formatDateTime dari app/utils/format.ts (auto-import, tidak perlu import manual)

// Page meta
definePageMeta({
  layout: "dashboard",
});

// Resolve components untuk render function di column
const UButton = resolveComponent("UButton");
const UDropdownMenu = resolveComponent("UDropdownMenu");
const { t, locale } = useI18n();

// State
const data = ref<Feature[]>([]);
const isLoading = ref(false);
const selectedItem = ref<Feature | null>(null);

// Modal states
const showAddModal = ref(false);
const showUpdateModal = ref(false);
const showDeleteModal = ref(false);
const isDeleting = ref(false);

// Pagination meta
const meta = reactive({
  total: 0,
  from: 0,
  to: 0,
});

// Fetch data — function declaration (hoisted) supaya bisa dipakai sebagai
// callback useTableQuery sebelum search/page/dst dideklarasikan di bawahnya
async function fetchItems() {
  isLoading.value = true;
  try {
    const response = await featureService.getAll(
      page.value,
      perPage.value,
      search.value,
      sortBy.value,
      order.value,
    );
    if (response.success) {
      data.value = response.data;
      if (response.meta) {
        meta.total = response.meta.total;
        meta.from = response.meta.from;
        meta.to = response.meta.to;
      }
    }
  } finally {
    isLoading.value = false;
  }
}

// search/page/perPage/sortBy/order + sortHeader() dari useTableQuery.
// onQueryChange (fetchItems) otomatis dipanggil saat salah satu state berubah.
const { search, perPage, page, sortBy, order, sortHeader } = useTableQuery(fetchItems);

// Table columns — kolom yang bisa di-sort pakai sortHeader(labelFn, columnKey),
// columnKey HARUS ada di whitelist SORTABLE_COLUMNS backend (lihat DATABASE_GUIDE.md §5).
// Kolom lain (id, actions) tetap header: () => t('...') biasa.
const columns = computed<TableColumn<Feature>[]>(() => [
  {
    accessorKey: "id",
    header: () => t("pages.[feature].columnId"),
    cell: ({ row }) => `#${row.getValue("id")}`,
  },
  {
    accessorKey: "name",
    header: sortHeader(() => t("pages.[feature].columnName"), "name"),
  },
  // Kolom tanggal — ATURAN TETAP, jangan divariasikan per halaman:
  //  1. Formatter: formatDateTime() dari app/utils/format.ts (tanggal + jam).
  //     formatDate() (tanpa jam) hanya untuk konteks non-tabel yang memang butuh ringkas.
  //  2. Sel dibungkus span dengan class "text-muted whitespace-nowrap" — seragam di semua halaman.
  //  3. Selalu sortable lewat sortHeader(..., "createdAt").
  //  4. Label header: t("common.createdAt") untuk kolom audit standar. Label domain-spesifik
  //     hanya kalau maknanya memang beda (mis. t("pages.user.columnJoinedDate"), t("pages.messages.columnDate")).
  {
    accessorKey: "createdAt",
    header: sortHeader(() => t("common.createdAt"), "createdAt"),
    cell: ({ row }) => {
      const val = row.getValue("createdAt") as string;
      if (!val) return "-";
      return h("span", { class: "text-muted whitespace-nowrap" }, formatDateTime(val, locale.value));
    },
  },
  // ... more columns
  {
    id: "actions",
    header: () => t("pages.[feature].columnAction"),
    meta: {
      class: { td: "text-right", th: "text-right" },
    },
    cell: ({ row }) => {
      // Ukuran ikon aksi SERAGAM: size 'xs' + variant 'ghost' + color 'neutral'
      return h(
        UDropdownMenu,
        {
          content: { align: "end" },
          items: getRowItems(row),
          "aria-label": t("pages.[feature].actionsDropdown"),
        },
        () =>
          h(UButton, {
            'icon': "i-lucide-ellipsis-vertical",
            'size': "xs",
            'color': "neutral",
            'variant': "ghost",
            'aria-label': t("pages.[feature].actionsDropdown"),
          }),
      );
    },
  },
]);

// Row action items
function getRowItems(row: Row<Feature>) {
  return [
    {
      label: t("pages.[feature].editFeature"),
      icon: "i-lucide-edit",
      onSelect() {
        selectedItem.value = row.original;
        showUpdateModal.value = true;
      },
    },
    {
      label: t("pages.[feature].deleteFeature"),
      color: "error",
      icon: "i-lucide-trash",
      onSelect() {
        selectedItem.value = row.original;
        showDeleteModal.value = true;
      },
    },
  ];
}

// Handle delete — modal HANYA ditutup kalau delete benar-benar berhasil,
// dan kegagalan tetap memberi toast error (jangan tutup modal seolah sukses).
const toast = useToast();
const handleDelete = async () => {
  if (!selectedItem.value) return;
  isDeleting.value = true;
  try {
    const response = await featureService.delete(selectedItem.value.id);
    if (response.success) {
      toast.add({
        title: t("pages.[feature].deletedSuccess"),
        color: "success",
        icon: "i-lucide-circle-check",
      });
      showDeleteModal.value = false;
      fetchItems();
    } else {
      toast.add({
        title: response.message || t("common.error"),
        color: "error",
        icon: "i-lucide-circle-alert",
      });
    }
  } finally {
    isDeleting.value = false;
  }
};

// Initial fetch
onMounted(() => {
  fetchItems();
});
</script>
```

### Aturan DataTable / useTableQuery

- **Empty state sudah otomatis** — `DataTable` merender `<UEmpty>` (key `components.dataTable.emptyTitle` /
  `emptyDescription`) saat data kosong. Jangan menambahkan empty state sendiri di halaman.
- **Tombol aksi baris seragam** — `size: 'xs'`, `color: 'neutral'`, `variant: 'ghost'`,
  `icon: 'i-lucide-ellipsis-vertical'`, dan `aria-label: t('pages.<fitur>.actionsDropdown')` (bukan
  `aria-label: 'Actions'` yang hardcode).
- **Service `getAll`** harus menerima `sortBy`/`order` sebagai parameter tambahan dan meneruskannya ke query
  string (`sortBy`, `order`) — lihat `faq-service.ts`/`user-service.ts`. Query string per-page pakai nama
  `limit` (bukan `perPage`), sesuai konvensi backend; `response.meta` tetap memakai `perPage`/`currentPage`/
  `lastPage` (lihat [service-layer.md](./service-layer.md) §4).
- **`sortHeader(labelFn, columnKey, align?)`** — `labelFn` HARUS function (`() => t('...')`), bukan string
  langsung, supaya label tetap reaktif ganti bahasa. `columnKey` harus persis sama dengan key di whitelist
  `SORTABLE_COLUMNS` backend module tersebut. Chevron sorting dirender `app/components/common/SortableHeader.vue`.
- Kolom yang **tidak** perlu sortable (mis. `id`, `actions`, kolom hasil komputasi) tetap pakai
  `header: () => t('...')` biasa, jangan dibungkus `sortHeader`.
- **Kolom tanggal/waktu WAJIB** memakai `formatDate()` / `formatDateTime()` dari `app/utils/format.ts` dengan
  `locale.value` dari `useI18n()` — jangan `toLocaleDateString`/`toLocaleString` langsung (lihat §"Date
  Formatting").
- `columns` ditulis sebagai `computed<TableColumn<T>[]>(() => [...])` supaya ikut berubah saat bahasa diganti.
- `DataTable` sudah merender teks "Showing X to Y of Z results" sendiri (key `components.dataTable.showing`) — jangan tambah key `pages.[feature].showingResults` lagi di halaman.
- Backend WAJIB whitelist kolom yang boleh di-sort (jangan masukkan `sortBy` langsung ke `.orderBy()`) — lihat `docs/DATABASE_GUIDE.md` §5.

## Pattern 2: Auth Page

Referensi: `app/pages/auth/sign-in.vue`

> Namespace i18n: `pages.auth.[pageName].*` (mis. `pages.auth.signIn.*`, `pages.auth.forgotPassword.*`).

```vue
<template>
  <div class="w-full max-w-md mx-auto">
    <!-- 1. Logo + Header — pakai token semantik (text-highlighted/text-toned), bukan text-neutral-900 -->
    <div class="flex flex-col gap-5 mb-6">
      <BrandLogo />
      <div class="space-y-1">
        <h1 class="text-3xl font-bold text-highlighted">{{ $t('pages.auth.[pageName].title') }}</h1>
        <p class="text-toned">{{ $t('pages.auth.[pageName].description') }}</p>
      </div>
    </div>

    <!-- 2. Form -->
    <UForm
      :state="state"
      :schema="schema"
      @submit="handleSubmit"
      class="space-y-4"
    >
      <UFormField
        :label="$t('pages.auth.[pageName].emailLabel')"
        name="email"
        required
      >
        <UInput
          v-model="state.email"
          type="email"
          :placeholder="$t('pages.auth.[pageName].emailPlaceholder')"
          class="w-full"
        />
      </UFormField>

      <!-- 3. Actions -->
      <div class="flex flex-col gap-3 pt-2">
        <UButton type="submit" block color="primary" :loading="loading">
          {{ $t('pages.auth.[pageName].submit') }}
        </UButton>

        <!-- Optional: Back link -->
        <NuxtLink
          to="/auth/sign-in"
          class="flex items-center justify-center gap-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
        >
          <UIcon name="i-lucide-arrow-left" class="w-4 h-4" />
          {{ $t('pages.auth.[pageName].backToSignIn') }}
        </NuxtLink>
      </div>
    </UForm>
  </div>
</template>

<script setup lang="ts">
import { z } from "zod";

definePageMeta({
  layout: "auth",
  middleware: "guest",
});

const { t } = useI18n();

useHead({
  title: t("pages.auth.[pageName].title"),
});

const state = reactive({ email: "" });
const loading = ref(false);
const toast = useToast();

const schema = z.object({
  email: z.string().min(1, t("pages.auth.[pageName].emailRequired")),
});

const handleSubmit = async () => {
  loading.value = true;
  try {
    // ... API call
  } finally {
    loading.value = false;
  }
};
</script>
```

### Auth Page Layout Structure:

```
+-----------------------------------+-------------------+
|                                   |                   |
|   Gradient Background             |   Form Content    |
|   (60% - lg:w-3/5)               |   (40% - lg:w-2/5)|
|                                   |                   |
|   - gradient.svg bg               |   - max-w-md      |
|   - grid.svg overlay              |   - BrandLogo     |
|                                   |   - Title + Desc  |
|                                   |   - UForm         |
|                                   |   - Actions       |
|                                   |                   |
+-----------------------------------+-------------------+
```

## Pattern 3: Simple Dashboard Page

Referensi: `app/pages/index.vue`

```vue
<template>
  <div class="space-y-6">
    <Header :title="$t('pages.dashboard.title')" :description="$t('pages.dashboard.description')" />

    <!-- Page content here -->
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "dashboard",
});
</script>
```

## Pattern 4: Halaman Form Create / Edit (Halaman Tipis + Form Bersama)

Referensi: `app/pages/content/article/create.vue` + `app/pages/content/article/[id].vue` +
`app/components/content/ArticleForm.vue`.

Untuk fitur yang punya halaman **create** dan **edit** dengan form yang sama, JANGAN menulis dua halaman
kembar. Buat satu komponen form bersama, lalu halaman create/edit hanya jadi pembungkus tipis yang mengirim
`Header` + id (kalau mode edit):

```vue
<!-- app/pages/content/article/create.vue — hanya pembungkus -->
<template>
  <div class="space-y-6">
    <Header :title="$t('pages.article.createTitle')" :description="$t('pages.article.createDescription')" />
    <ContentArticleForm />
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'dashboard' })
</script>
```

```vue
<!-- app/pages/content/article/[id].vue — pembungkus + id dari route -->
<template>
  <div class="space-y-6">
    <Header :title="$t('pages.article.editTitle')" :description="$t('pages.article.editDescription')" />
    <ContentArticleForm :article-id="articleId" />
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'dashboard' })

const route = useRoute()
const articleId = Number(route.params.id)
</script>
```

Komponen form (`app/components/content/ArticleForm.vue`) yang menentukan mode:

```typescript
const props = defineProps<{ articleId?: number }>()
const isEditMode = computed(() => props.articleId !== undefined)
// articleId kosong → create; diisi → edit (fetch by id di onMounted, lalu hydrate form)
```

Ketentuan:

- Form bersama memakai `useImageUpload` untuk cover/thumbnail, `isEmptyHtml()` untuk validasi rich text, dan
  `slugify()` untuk auto-slug dari judul.
- Halaman create & edit **tidak boleh** lagi berisi field form, schema Zod, atau panggilan service — semua
  pindah ke komponen form.
- Perubahan field cukup di satu file, sehingga create & edit tidak bisa lagi "jadi beda" tanpa sengaja.

## Responsive Design Pattern

### Toolbar (Search + Action)

```vue
<!-- Stack vertically on mobile, row on desktop -->
<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
  <!-- Left: Search + filter -->
  <div class="flex items-center gap-2 w-full sm:w-auto">
    <UInput :placeholder="$t('pages.[feature].searchPlaceholder')" class="flex-1 sm:flex-none sm:w-64" />
    <USelect class="w-20" />
  </div>

  <!-- Right: Add button (full-width on mobile) -->
  <UButton class="w-full sm:w-auto justify-center">
    {{ $t('pages.[feature].addFeature') }}
  </UButton>
</div>
```

### Pagination

Sudah built-in di `DataTable` — jangan tulis manual di halaman:

```vue
<!-- Isi DataTable.vue -->
<span class="text-sm text-muted">
  {{ $t('components.dataTable.showing', { from, to, total }) }}
</span>
<UPagination v-model:page="page" size="md" :total="total" :items-per-page="perPage" />
```

### Table

```vue
<!-- Horizontal scroll on small screens — lebar minimum via `table-class`, pakai skala max-w standar -->
<div class="overflow-x-auto">
  <UTable class="min-w-2xl" />
</div>
```

> Halaman nyata memakai `table-class="min-w-2xl"` (kategori) sampai `min-w-5xl` (artikel), bukan nilai
> arbitrary seperti `min-w-[640px]` — lihat Larangan #1 di `CLAUDE.md`.

## Date Formatting

**WAJIB lewat util** `app/utils/format.ts` (auto-import) dengan locale i18n aktif. Jangan memanggil
`toLocaleDateString`/`toLocaleString`/`Intl.*` langsung di halaman.

```typescript
const { t, locale } = useI18n();

// Di table column
cell: ({ row }) => {
  const val = row.getValue('createdAt') as string;
  if (!val) return '-';
  return formatDateTime(val, locale.value); // 12 Okt 2026, 14.30
  // formatDate(val, locale.value)       → 12 Okt 2026
  // formatNumber(val, locale.value)     → 12.345
  // formatTimeAgo(val, t)               → 3 jam lalu (teksnya lewat i18n)
};
```

| Fungsi | Output (id) | Output (en) |
| ------ | ----------- | ----------- |
| `formatDate(value, locale)` | `12 Okt 2026` | `Oct 12, 2026` |
| `formatDateTime(value, locale)` | `12 Okt 2026, 14.30` | `Oct 12, 2026, 14:30` |
| `formatNumber(value, locale)` | `12.345` | `12,345` |
| `formatTimeAgo(value, t)` | `3 jam lalu` | `3 h ago` |

> **Alasan historis:** dulu tiap halaman memformat tanggal sendiri — separuh memakai `'en-US'`, separuh
> `'id-ID'` — sehingga dua tabel bisa menampilkan format berbeda pada bahasa yang sama. Util ini yang
> menyatukannya; jangan tambahkan format tanggal manual baru di halaman.

## Toast Pattern

> Title toast WAJIB lewat `t()` — lihat [i18n-guide.md](./i18n-guide.md).

```typescript
const toast = useToast();
const { t } = useI18n();

// Success toast (setelah create/update/delete berhasil)
toast.add({
  title: t("components.faq.addModal.createdSuccess"),
  color: "success",
  icon: "i-lucide-circle-check",
});

// Info toast (setelah action seperti reset link sent)
toast.add({
  title: t("pages.auth.forgotPassword.resetLinkSent"),
  icon: "i-lucide-circle-check",
  color: "success",
});

// Error toast (manual, biasanya sudah di-handle oleh error-helper)
// Dipakai juga saat response.success === false — jangan tutup modal seolah berhasil.
toast.add({
  title: response.message || t("common.error"),
  color: "error",
  icon: "i-lucide-circle-alert",
});
```

## Search Debounce Pattern

Sudah ditangani `useTableQuery()` — **jangan tulis debounce manual di halaman**. Composable itu men-debounce
`search` 300 ms, reset `page` ke 1, lalu memanggil callback `onQueryChange`:

```typescript
// Di dalam useTableQuery.ts — halaman cukup memanggil:
const { search, perPage, page, sortBy, order, sortHeader } = useTableQuery(fetchItems);
// search/page/perPage/sortBy/order berubah → fetchItems() otomatis dipanggil
```

Kalau menambah filter baru (mis. status), reset halaman dan refetch manual seperti halaman `faq`:

```typescript
watch(selectedStatusFilter, () => {
  page.value = 1;
  fetchItems();
});
```

## Middleware Usage

```typescript
// Dashboard page — tidak perlu middleware (sudah ada auth.global.ts)
definePageMeta({
  layout: "dashboard",
});

// Auth page — tambahkan guest middleware
definePageMeta({
  layout: "auth",
  middleware: "guest",
});
```
