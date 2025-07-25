import { twMerge } from 'tailwind-merge'
import { clsx } from 'clsx'
import type { ClassValue } from 'clsx'

export function cn(...args: Array<ClassValue | undefined>) {
  return twMerge(clsx(args))
}
