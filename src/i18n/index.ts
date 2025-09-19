// src/i18n/index.ts
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import HttpBackend from 'i18next-http-backend'

// ใส่ URL จริงของคุณจาก myJson.online ทีละ namespace
// (แต่ละ record จะมีลิงก์เป็นของมันเอง; ใส่ให้ครบ ns ที่ใช้)
const MYJSON_TOKEN = import.meta.env.VITE_MYJSON_TOKEN as string
const REMOTE_I18N_MAP: Record<string, Record<string, string>> = {
  en: {
    common:
      'https://api.myjson.online/v1/records/71778107-4dd5-40ad-bad9-9c3947c68650',
    kit: 'https://api.myjson.online/v1/records/9653b4b0-d5a2-4960-8307-59f9dcc31993',
    runner:
      'https://api.myjson.online/v1/records/1b6077f6-9748-4c96-a7ef-a4ec850bcd2a',
    subassembly:
      'https://api.myjson.online/v1/records/70a15bcf-e0a8-4805-9ec6-fce114acfe4e',
    part: 'https://api.myjson.online/v1/records/6d7f99a3-36ee-41e6-b906-86aaa3f94464',
  },
  th: {
    common:
      'https://api.myjson.online/v1/records/2b771c5a-fa6d-497c-9291-f7a576fcc7cc',
    kit: 'https://api.myjson.online/v1/records/90ef217a-e394-4220-86d1-6b6af38fddb4',
    runner:
      'https://api.myjson.online/v1/records/326acfd7-4c5b-4107-abcc-3a179c9fce57',
    subassembly:
      'https://api.myjson.online/v1/records/01c36f8d-938d-4640-b676-f14f95409caa',
    part: 'https://api.myjson.online/v1/records/3aa8f7df-5f01-409a-a44b-21cc87ea5a46',
  },
}

const SUPPORTED = ['en', 'th'] as const

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: SUPPORTED[0],
    supportedLngs: SUPPORTED as unknown as string[],
    ns: ['common', 'kit', 'runner', 'subassembly', 'part'],
    defaultNS: 'common',
    backend: {
      // เลือก URL จาก REMOTE_I18N_MAP
      loadPath: `${import.meta.env.VITE_API_URL}/i18n/{{lng}}/{{ns}}.json`,
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
