import { useEffect, useState } from "react"

const biosLines = [
  "THINGSBIOS © 1986 Things, Inc.",
  "All Rights Reserved",
  "",
  "BIOS Version 1.0",
  "System Configuration:",
  "  - CPU: Intel 8086",
  "  - Memory: 640K",
  "  - Storage: 5.25\" Floppy",
  "  - Display: Monochrome",
  "",
  "Loading system files...",
  "Initializing hardware...",
  "Starting Things OS...",
  "",
  "Welcome to Things, Inc.",
  "Where innovation meets imagination.",
  "",
  "Press any key to continue..."
]

export function BiosText({ theme = 'light' }: { theme?: 'light' | 'dark' }) {
  const [currentLine, setCurrentLine] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [isTyping, setIsTyping] = useState(true)

  useEffect(() => {
    if (currentLine >= biosLines.length) {
      setIsTyping(false)
      return
    }

    const line = biosLines[currentLine]
    let charIndex = 0

    const typeInterval = setInterval(() => {
      if (charIndex <= line.length) {
        setDisplayText(line.substring(0, charIndex))
        charIndex++
      } else {
        clearInterval(typeInterval)
        setTimeout(() => {
          setCurrentLine(prev => prev + 1)
          setDisplayText("")
        }, 500)
      }
    }, 50)

    return () => clearInterval(typeInterval)
  }, [currentLine])

  return (
    <div className={`font-mono text-sm ${theme === 'dark' ? 'text-green-400' : 'text-green-800'} bg-black p-4 rounded-lg`}>
      <div className="whitespace-pre-line">
        {displayText}
        {isTyping && <span className="animate-pulse">|</span>}
      </div>
    </div>
  )
} 