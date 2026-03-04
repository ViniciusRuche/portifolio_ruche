import { mount } from '@vue/test-utils'
import router from '/tests/helpers/router'
import { describe, it, expect, beforeEach } from 'vitest'
import GeneralRegistrationSubMenu from '@/layouts/v1/components/GeneralRegistrationsSubMenu.vue'

let wrapper

beforeEach(async () => {
  wrapper = mount(GeneralRegistrationSubMenu, {
    global: {
      plugins: [router] // Provide the router
    }
  })

  // Wait for router to be ready
  await router.isReady()
})
describe('GeneralRegistrationSubMenu', () => {
  it('matches snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })
})
