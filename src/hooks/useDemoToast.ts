import { useCallback, useEffect, useState } from 'react'

export function useDemoToast(durationMs = 3000) {
  const [message, setMessage] = useState<string | null>(null)

  const showToast = useCallback((text: string) => {
    setMessage(text)
  }, [])

  const dismiss = useCallback(() => setMessage(null), [])

  useEffect(() => {
    if (!message) return
    const timer = setTimeout(dismiss, durationMs)
    return () => clearTimeout(timer)
  }, [message, durationMs, dismiss])

  return { message, showToast, dismiss }
}
