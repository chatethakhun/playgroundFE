// src/i18n/index.ts
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import HttpBackend from 'i18next-http-backend'

// ใส่ URL จริงของคุณจาก myJson.online ทีละ namespace
// (แต่ละ record จะมีลิงก์เป็นของมันเอง; ใส่ให้ครบ ns ที่ใช้)
const URL = import.meta.env.VITE_API_URL
const SUPPORTED = ['en', 'th'] as const

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: SUPPORTED[0],
    supportedLngs: SUPPORTED as unknown as string[],
    ns: ['common', 'kit', 'runner', 'subassembly', 'part', 'color'],
    defaultNS: 'common',
    backend: {
      // เลือก URL จาก REMOTE_I18N_MAP
      loadPath: `${URL}/i18n/{{lng}}/{{ns}}.json`,
      // ถ้าต้องแนบ header เพิ่ม (ไม่จำเป็นส่วนใหญ่)
      // requestOptions: { mode: 'cors' }
    },
    detection: {
      order: ['localStorage', 'querystring', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
    interpolation: { escapeValue: false },
    returnEmptyString: false,
  })

export default i18n
