import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-9 w-full min-w-0 rounded-md border border-gray-300 bg-white px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "text-gray-900 placeholder:text-gray-500",
        "file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-gray-900",
        "selection:bg-blue-500 selection:text-white",
        "focus-visible:border-blue-500 focus-visible:ring-blue-500/50 focus-visible:ring-[3px]",
        "aria-invalid:border-red-500 aria-invalid:ring-red-500/20",
        // Dark mode styles
        "dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-400",
        "dark:file:text-white",
        "dark:focus-visible:border-blue-400 dark:focus-visible:ring-blue-400/50",
        "dark:aria-invalid:border-red-400 dark:aria-invalid:ring-red-400/40",
        className
      )}
      {...props}
    />
  )
}

export { Input }
