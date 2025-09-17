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
      'https://api.myjson.online/v1/records/9653b4b0-d5a2-4960-8307-59f9dcc31993',
    subassembly: 'https://api.myjson.online/v1/records/EN_SUB_ID',
    part: 'https://api.myjson.online/v1/records/EN_PART_ID',
  },
  th: {
    common:
      'https://api.myjson.online/v1/records/2b771c5a-fa6d-497c-9291-f7a576fcc7cc',
    kit: 'https://api.myjson.online/v1/records/90ef217a-e394-4220-86d1-6b6af38fddb4',
    runner:
      'https://api.myjson.online/v1/records/326acfd7-4c5b-4107-abcc-3a179c9fce57',
    subassembly: 'https://api.myjson.online/v1/records/TH_SUB_ID',
    part: 'https://api.myjson.online/v1/records/TH_PART_ID',
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
      loadPath: (lngs: string[] | string, nss: string[] | string) => {
        const lng = Array.isArray(lngs) ? lngs[0] : lngs
        const ns = Array.isArray(nss) ? nss[0] : nss

        if (!lng || !ns) throw new Error('Missing language')

        const url = REMOTE_I18N_MAP[lng]?.[ns]
        if (!url) throw new Error(`Missing i18n url for ${lng}/${ns}`)
        return url
      },
      requestOptions: {
        headers: {
          'x-collection-access-token': `${MYJSON_TOKEN}`, // 🔑 ใส่ token ที่นี่
        },
      },
      // myJson.online บางที response อาจห่อ { data: {...} }
      parse: (data: string) => {
        try {
          const obj = JSON.parse(data)
          // ปรับให้รองรับทั้งสองกรณี
          if (obj && typeof obj === 'object') {
            // กรณีตอบกลับแบบ { data: { ...translations } }
            if ('data' in obj && typeof obj.data === 'object') return obj.data
          }
          return obj
        } catch {
          return {} // กันพัง
        }
      },
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
