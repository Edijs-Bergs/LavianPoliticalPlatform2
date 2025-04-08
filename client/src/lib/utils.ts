import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function textWithLineBreaks(text: string): string {
  return text.replace(/\r?\n/g, '<br />')
}
