import { mount } from '@vue/test-utils'
import router from '/tests/helpers/router'
import { describe, it, expect, beforeEach } from 'vitest'
import AppSideMenu from '@/layouts/v1/AppSideMenu.vue'
import { createTestingPinia } from '@pinia/testing'

import { useSessionStore } from '@/stores/session'

let wrapper
let sessionStore // Move this inside beforeEach

beforeEach(async () => {
  wrapper = mount(AppSideMenu, {
    global: {
      plugins: [router, createTestingPinia()] // Provide the router
    },
    stubs: {}
  })
  sessionStore = useSessionStore()

  // Wait for router to be ready
  await router.isReady()
})

describe('AppSideMenu', () => {
  it('matches snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })
})
