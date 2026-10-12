import { h } from 'vue'
import SortableHeader from '../components/common/SortableHeader.vue'

export type SortOrder = 'ASC' | 'DESC'

interface TableQueryOptions {
  defaultSortBy?: string
  defaultOrder?: SortOrder
}

export function useTableQuery(onQueryChange: () => void, options: TableQueryOptions = {}) {
  const { defaultSortBy = '', defaultOrder = 'DESC' } = options

  const search = ref('')
  const limitOptions = ref([10, 25, 50, 100])
  const perPage = ref(10)
  const page = ref(1)
  const sortBy = ref(defaultSortBy)
  const order = ref<SortOrder>(defaultOrder)

  const toggleSort = (column: string) => {
    if (sortBy.value === column) {
      order.value = order.value === 'ASC' ? 'DESC' : 'ASC'
    } else {
      sortBy.value = column
      order.value = 'ASC'
    }
  }

  watch([page, perPage, sortBy, order], onQueryChange)

  let searchTimeout: ReturnType<typeof setTimeout>
  watch(search, () => {
    clearTimeout(searchTimeout)
    searchTimeout = setTimeout(() => {
      page.value = 1
      onQueryChange()
    }, 300)
  })

  /**
   * Render function untuk header kolom yang bisa diklik — dipakai sebagai `header`
   * pada definisi kolom UTable. `label` berupa fungsi (mis. `() => t('...')`) supaya
   * teksnya ikut berubah saat bahasa diganti.
   *
   * Chevron dirender `SortableHeader.vue` (memakai `UIcon`) karena `UIcon` tidak bisa
   * dipakai dari render function di file `.ts` ini.
   */
  const sortHeader = (label: () => string, column: string, align: 'start' | 'center' | 'end' = 'start') => {
    return () => h(SortableHeader, {
      label,
      align,
      active: sortBy.value === column,
      order: order.value,
      onToggle: () => toggleSort(column)
    })
  }

  return {
    search,
    limitOptions,
    perPage,
    page,
    sortBy,
    order,
    toggleSort,
    sortHeader
  }
}
