import { shallowMount } from '@vue/test-utils'
import { describe, it, expect, beforeEach } from 'vitest'
import router from '/tests/helpers/router'
import AppNavbar from '@/layouts/v1/AppNavbar.vue'

let wrapper

beforeEach(async () => {
  wrapper = shallowMount(AppNavbar, {
    global: {
      plugins: [router] // Provide the router
    },
    stubs: {
      UsersNavbarIcon: true,
      RouterLink: true
    }
  })

  // Wait for router to be ready
  await router.isReady()
})

describe('AppNavbar', () => {
  it('matches the snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('contains the logo and is clickable to go to Dashboard', () => {
    const dashboardLink = wrapper.findComponent({
      name: 'RouterLink',
      props: { to: { name: 'Dashboard' } }
    })

    // Assert that the RouterLink exists
    expect(dashboardLink.exists()).toBe(true)
  })

  it('contains the mobile menu icon', () => {
    const mobileMenuIcon = wrapper.find('#navbar-toggle')

    // Assert that the hamburger icon exists
    expect(mobileMenuIcon.exists()).toBe(true)
  })
})
