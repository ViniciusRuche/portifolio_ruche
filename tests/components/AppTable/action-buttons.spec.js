import { mount } from '@vue/test-utils'
import ActionButtons from '@/components/AppTable/action-buttons.vue'
import { describe, it, expect, beforeAll } from 'vitest'

describe('ActionButtons.vue', () => {
  it('matches the snapshot', async () => {
    const wrapper = mount(ActionButtons, {
      props: {
        deleteable: true,
        editable: true
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders dropdown when deleteable is true', () => {
    const wrapper = mount(ActionButtons, {
      props: {
        deleteable: true,
        editable: false
      }
    })

    expect(wrapper.findComponent({ name: 'FwbDropdown' }).exists()).toBe(true)
  })

  it('renders dropdown when editable is true', () => {
    const wrapper = mount(ActionButtons, {
      props: {
        deleteable: false,
        editable: true
      }
    })

    expect(wrapper.findComponent({ name: 'FwbDropdown' }).exists()).toBe(true)
  })

  describe('on actions button click', async () => {
    it('opens the dropdown on actions button click', async () => {
      const wrapper = mount(ActionButtons, {
        props: {
          deleteable: true,
          editable: true
        }
      })

      await wrapper.find('button').trigger('click')
      expect(wrapper.findComponent({ name: 'FwbListGroup' }).exists()).toBe(true)
    })

    it('renders edit button if editable', async () => {
      const wrapper = mount(ActionButtons, {
        props: {
          deleteable: false,
          editable: true
        }
      })

      await wrapper.find('button').trigger('click')
      const actionsWrapper = wrapper.findComponent({ name: 'FwbListGroup' })
      expect(actionsWrapper.find('button').text()).toEqual('Editar')
    })

    it('renders delete button if deleteable', async () => {
      const wrapper = mount(ActionButtons, {
        props: {
          deleteable: true,
          editable: false
        }
      })

      await wrapper.find('button').trigger('click')
      const actionsWrapper = wrapper.findComponent({ name: 'FwbListGroup' })
      expect(actionsWrapper.find('button').text()).toEqual('Deletar')
    })

    describe('on delete button click', async () => {
      it('emits delete event on delete', async () => {
        const wrapper = mount(ActionButtons, {
          props: {
            deleteable: true,
            editable: false
          }
        })

        await wrapper.find('button').trigger('click')
        const actionsWrapper = wrapper.findComponent({ name: 'FwbListGroup' })
        await actionsWrapper.find('button').trigger('click')
        expect(wrapper.emitted('delete')).toBeTruthy()
      })
    })

    describe('on edit button click', async () => {
      it('emits edit event on edit', async () => {
        const wrapper = mount(ActionButtons, {
          props: {
            deleteable: false,
            editable: true
          }
        })

        await wrapper.find('button').trigger('click')
        const actionsWrapper = wrapper.findComponent({ name: 'FwbListGroup' })
        await actionsWrapper.find('button').trigger('click')
        expect(wrapper.emitted('edit')).toBeTruthy()
      })
    })
  })

  it('does not render dropdown when deleteable and editable are false', () => {
    const wrapper = mount(ActionButtons, {
      props: {
        deleteable: false,
        editable: false
      }
    })

    expect(wrapper.findComponent({ name: 'FwbDropdown' }).exists()).toBe(false)
  })
})
