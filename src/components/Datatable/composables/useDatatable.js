import { reactive, onBeforeMount } from 'vue'
import { debounce } from 'lodash-es'
/**
 * Composable for managing a datatable with sorting, filtering, and pagination.
 * @param {Function} apiCall - The API call function to fetch data.
 */
export default function useDatatable(apiCall, paramsOverride = {}) {
  const params = reactive({
    page_size: 20,
    page: 1,
    ordering: '',
    search: '',
    ...paramsOverride
  })

  onBeforeMount(() => {
    apiCall(params)
  })

  const handleSorting = (sort) => {
    params.ordering = sort
    apiCall(params)
  }

  const handleFilter = (filters) => {
    Object.assign(params, filters)
    apiCall(params)
  }

  const handleSearch = debounce((searchTerm) => {
    params.search = searchTerm
    apiCall(params)
  }, 150)

  const handlePagination = (page) => {
    params.page = page
    apiCall(params)
  }

  const refreshTable = (override_params = {}) => {
    apiCall({ ...params, ...override_params })
  }

  return {
    params,
    refreshTable,
    handleSorting,
    handleFilter,
    handleSearch,
    handlePagination
  }
}
