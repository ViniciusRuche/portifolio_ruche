export default {
  accessToken: import.meta.env.VITE_ROLLBAR_POST_CLIENT_ITEM_ACCESS_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,
  payload: {
    environment: import.meta.env.MODE,
    client: {
      javascript: {
        code_version: '1.0.0'
      }
    }
  }
}
