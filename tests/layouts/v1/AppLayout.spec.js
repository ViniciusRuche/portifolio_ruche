import { shallowMount } from '@vue/test-utils'
import router from '/tests/helpers/router'
import { describe, it, expect } from 'vitest'
import AppLayout from '@/layouts/v1/AppLayout.vue'

describe('AppLayout', () => {
  it('matches the snapshot', async () => {
    const wrapper = shallowMount(AppLayout, {
      global: {
        plugins: [router] // Provide the router
      }
    })

    // Wait for router to be ready
    await router.isReady()

    expect(wrapper.html()).toMatchSnapshot()
  })
})
