// src/queryClient.ts
import { QueryClient } from '@tanstack/react-query'

// ตั้ง config ของ QueryClient
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // ค่าเริ่มต้นของทุก query
      staleTime: 1000 * 60, // 1 นาที: ข้อมูลจะถือว่าสด
      gcTime: 1000 * 60 * 5, // 5 นาที: เก็บใน cache ก่อนถูกลบ
      retry: 1, // ลองใหม่ถ้าล้มเหลว 1 ครั้ง
      refetchOnWindowFocus: false, // ไม่ refetch ตอนโฟกัสหน้าต่าง
    },
  },
})
