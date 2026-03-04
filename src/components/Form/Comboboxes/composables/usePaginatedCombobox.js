import { debounce } from 'lodash'
import { ref } from 'vue'
export default function usePaginatedCombobox(getDataFn, extraParams = {}, handlers = {}) {
  const selectedValue = ref({ label: '', value: '' })

  const onSearch = debounce(async (query) => {
    await getDataFn({
      search: query,
      ...extraParams
    })
    handlers.onSearch && handlers.onSearch(query)
  }, 300)

  const onSelect = async (item) => {
    selectedValue.value = item
    handlers.onSelect && handlers.onSelect(item)
  }

  return {
    selectedValue,
    onSearch,
    onSelect
  }
}
