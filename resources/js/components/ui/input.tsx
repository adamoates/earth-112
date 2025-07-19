import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      style={{ 
        color: 'rgb(0, 0, 0)',
        '--tw-text-opacity': '1',
        'color-scheme': 'light dark'
      } as React.CSSProperties}
      className={cn(
        "border-input file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "text-black dark:text-white",
        "text-gray-900 dark:text-gray-100",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        "[color:rgb(0,0,0)] dark:[color:rgb(255,255,255)]",
        "[color:rgb(17,24,39)] dark:[color:rgb(243,244,246)]",
        className
      )}
      {...props}
    />
  )
}

// Force rebuild for production deployment - final update
export { Input }
