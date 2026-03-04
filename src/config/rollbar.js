import Rollbar from 'rollbar'
import config from '/rollbar.config.js'

const isProd = import.meta.env.MODE === 'production'

export default {
  install(app) {
    if (!isProd) {
      return
    }

    const rollbar = new Rollbar(config)
    app.config.errorHandler = (error, vm, info) => {
      try {
        rollbar.error(error)
        if (app.config.devtools) {
          console.error(error)
        }
      } catch (error) {
        console.error('Rollbar Failed:', error)
      }
    }
    app.provide('rollbar', rollbar)
  }
}
