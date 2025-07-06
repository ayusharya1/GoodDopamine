import { useEffect, useState } from "react"

export function LoadingBar({ theme = 'light' }: { theme?: 'light' | 'dark' }) {
  const [progress, setProgress] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          setIsLoading(false)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 200)

    return () => clearInterval(interval)
  }, [])

  if (!isLoading) {
    return null
  }

  return (
    <div className={`fixed top-0 left-0 w-full h-1 z-50 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'}`}>
      <div 
        className={`h-full transition-all duration-300 ease-out ${theme === 'dark' ? 'bg-blue-400' : 'bg-blue-600'}`}
        style={{ width: `${Math.min(progress, 100)}%` }}
      />
    </div>
  )
} 