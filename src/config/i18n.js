import { createI18n } from 'vue-i18n'

export default createI18n({
  legacy: false,
  locale: 'pt-BR',
  fallbackLocale: 'pt-BR',
  numberFormats: {
    'pt-BR': {
      currency: {
        style: 'currency',
        currency: 'BRL',
        notation: 'standard'
      },
      decimal: {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      },
      percent: {
        style: 'percent',
        useGrouping: false
      }
    }
  }
})
