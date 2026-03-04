import { mount } from '@vue/test-utils'
import AppPagination from '@/components/AppTable/app-pagination.vue'
import { describe, it, expect } from 'vitest'

describe('AppPagination.vue', () => {
  it('matches the snapshot', async () => {
    const wrapper = mount(AppPagination, {
      props: {
        modelValue: 1,
        pageCount: 5,
        pageSize: 10,
        recordsCount: 49
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders pagination component with correct props', () => {
    const wrapper = mount(AppPagination, {
      props: {
        modelValue: 1,
        pageCount: 5,
        pageSize: 10,
        recordsCount: 49
      }
    })
    expect(wrapper.find('nav').exists()).toBe(true)
    expect(wrapper.find('span').text()).toContain('Mostrando')
    expect(wrapper.findComponent({ name: 'FwbPagination' }).exists()).toBe(true)
  })

  it('computes currentPageFirstRecordCount correctly', async () => {
    const wrapper = mount(AppPagination, {
      props: {
        modelValue: 2,
        pageCount: 5,
        pageSize: 10,
        recordsCount: 49
      }
    })
    expect(wrapper.vm.pageMinRecordCount).toBe(11)
    expect(wrapper.vm.pageMaxRecordCount).toBe(20)
  })
})
