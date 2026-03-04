import { expect, test, beforeEach, vi, describe } from 'vitest'
import { useSessionStore } from '@/stores/session'
import { setActivePinia, createPinia } from 'pinia'
import webStorageMock from '../__mocks__/sessionStorageMock'

const today = new Date()
const tomorrow = new Date(today)
tomorrow.setDate(today.getDate() + 1)

webStorageMock()
const sessionObject = {
  token: '123',
  expiry: tomorrow,
  user: {
    id: 1,
    first_name: 'John',
    last_name: 'Doe',
    email: 'johndoe@email.com',
    kind: 'admin'
  }
}

const loginParams = {
  id: sessionObject.user.id,
  first_name: sessionObject.user.first_name,
  email: sessionObject.user.email,
  last_name: sessionObject.user.last_name,
  kind: sessionObject.user.kind,
  token: sessionObject.token,
  expiry: sessionObject.expiry
}

beforeEach(async (context) => {
  setActivePinia(createPinia())
  context.store = useSessionStore()
  sessionStorage.clear()
})

describe('store getters', () => {
  describe('isAuthenticated', () => {
    test('returns true if user has a token and expiry date is in the future', ({ store }) => {
      store.login(loginParams)
      expect(store.isAuthenticated).toBe(true)
    })

    test('returns false if user has no token', ({ store }) => {
      store.login({ ...sessionObject, token: null })
      expect(store.isAuthenticated).toBe(false)
    })

    test('returns false if user has an empty token', ({ store }) => {
      store.login({ ...sessionObject, token: '' })
      expect(store.isAuthenticated).toBe(false)
    })

    test('returns false if user has an expired token', ({ store }) => {
      store.login({ ...sessionObject, expiry: new Date(2020, 0, 1) })
      expect(store.isAuthenticated).toBe(false)
    })
  })

  describe('currentSession', () => {
    test('returns the current session', ({ store }) => {
      store.login(loginParams)
      expect(store.currentSession).toEqual(sessionObject)
    })
  })
})

describe('store actions', () => {
  describe('retrieveSession', () => {
    test('should retrieve the session from the sessionStorage', ({ store }) => {
      sessionStorage.setItem('session', JSON.stringify(sessionObject))
      store.retrieveSession()
      expect(store.currentSession).toEqual(sessionObject)
    })
  })

  describe('saveSession', () => {
    test('should save the session in the sessionStorage', ({ store }) => {
      const windowSessionStorageSpy = vi.spyOn(window.sessionStorage, 'setItem')

      store.login(loginParams)
      expect(windowSessionStorageSpy).toHaveBeenCalledWith('session', JSON.stringify(store.$state))
      expect(sessionStorage.getItem('session')).toEqual(JSON.stringify(sessionObject))
    })
  })

  describe('destroySession', () => {
    test('should clear the sessionStorage', ({ store }) => {
      store.login(loginParams)
      const windowSessionStorageSpy = vi.spyOn(window.sessionStorage, 'removeItem')
      store.logout()
      expect(windowSessionStorageSpy).toHaveBeenCalledWith('session')
    })
  })

  describe('logout', () => {
    test('should clear the store data', ({ store }) => {
      store.login(loginParams)
      const storeSpy = vi.spyOn(store, 'destroySession')
      store.logout()
      expect(storeSpy).toHaveBeenCalled()
      const oldSession = store.currentSession
      store.$reset()
      expect(store.currentSession).toEqual(oldSession)
      storeSpy.mockRestore()
    })

    test('should reset the sessionStorage data', ({ store }) => {
      store.login(loginParams)
      store.logout()
      const sessionState = store.currentSession
      store.$reset()
      expect(store.currentSession).toEqual(sessionState)
    })
  })

  describe('login', () => {
    test('should login a user', ({ store }) => {
      store.login(loginParams)
      expect(store.currentSession).toEqual(sessionObject)
    })

    test('saveSession should store state in browser sessionStore', ({ store }) => {
      const storeSpy = vi.spyOn(store, 'saveSession')

      store.login(loginParams)
      expect(storeSpy).toHaveBeenCalled()
      storeSpy.mockRestore()
    })
  })
})
