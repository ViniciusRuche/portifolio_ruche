import { mount } from '@vue/test-utils'
import AppTable from '@/components/AppTable/app-table.vue'
import { describe, it, expect } from 'vitest'

describe('AppTable.vue', () => {
  const columns = [
    { key: 'id', label: 'label_id' },
    { key: 'name', label: 'label_name' },
    { key: 'age', label: 'label_age' },
    { key: 'email', label: 'label_email' }
  ]
  const data = [
    { id: 1, name: 'John Doe', age: 30, email: 'john@example.com' },
    { id: 2, name: 'Jane Doe', age: 25, email: 'jane@example.com' }
  ]

  it('matches the snapshot', () => {
    const wrapper = mount(AppTable, {
      props: {
        columns,
        pageCount: 1,
        data
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders the columns headers in order', () => {
    const wrapper = mount(AppTable, {
      props: {
        columns,
        pageCount: 1,
        data
      }
    })

    const headers = wrapper.findAllComponents({ name: 'FwbTableHeadCell' })
    expect(headers.length).toBe(5)
    expect(headers[0].text()).toBe(columns[0].label)
    expect(headers[1].text()).toBe(columns[1].label)
    expect(headers[2].text()).toBe(columns[2].label)
    expect(headers[3].text()).toBe(columns[3].label)
    expect(headers[4].text()).toBe('Actions')
  })

  it('renders the data', () => {
    const wrapper = mount(AppTable, {
      props: {
        columns,
        pageCount: 1,
        data
      }
    })

    const rows = wrapper.findAllComponents({ name: 'FwbTableRow' })
    for (const [index, row] of rows.entries()) {
      const cells = row.findAllComponents({ name: 'FwbTableCell' })
      expect(cells[0].text()).toEqual(data[index].id.toString())
      expect(cells[1].text()).toEqual(data[index].name.toString())
      expect(cells[2].text()).toEqual(data[index].age.toString())
      expect(cells[3].text()).toEqual(data[index].email.toString())
      expect(cells.length).toBe(5)
    }
    expect(rows.length).toBe(2)
  })
})
