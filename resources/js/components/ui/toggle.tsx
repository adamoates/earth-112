import * as React from "react"
import * as TogglePrimitive from "@radix-ui/react-toggle"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const toggleVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium hover:bg-gray-100 hover:text-gray-900 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-gray-200 data-[state=on]:text-gray-900 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 focus-visible:ring-blue-500/50 focus-visible:ring-[3px] outline-none transition-[color,box-shadow] aria-invalid:ring-red-500/20 dark:aria-invalid:ring-red-500/40 dark:hover:bg-gray-700 dark:hover:text-white dark:data-[state=on]:bg-gray-600 dark:data-[state=on]:text-white",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline:
          "border border-gray-300 bg-transparent shadow-xs hover:bg-gray-50 hover:text-gray-900 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:text-white",
      },
      size: {
        default: "h-9 px-2 min-w-9",
        sm: "h-8 px-1.5 min-w-8",
        lg: "h-10 px-2.5 min-w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Toggle({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof TogglePrimitive.Root> &
  VariantProps<typeof toggleVariants>) {
  return (
    <TogglePrimitive.Root
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Toggle, toggleVariants }
