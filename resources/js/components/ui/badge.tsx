import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:ring-blue-500/50 focus-visible:ring-[3px] aria-invalid:ring-red-500/20 dark:aria-invalid:ring-red-500/40 transition-[color,box-shadow] overflow-auto",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-blue-600 text-white [a&]:hover:bg-blue-700 dark:bg-blue-500 dark:[a&]:hover:bg-blue-600",
        secondary:
          "border-transparent bg-gray-100 text-gray-900 [a&]:hover:bg-gray-200 dark:bg-gray-700 dark:text-white dark:[a&]:hover:bg-gray-600",
        destructive:
          "border-transparent bg-red-600 text-white [a&]:hover:bg-red-700 dark:bg-red-500 dark:[a&]:hover:bg-red-600 focus-visible:ring-red-500/20 dark:focus-visible:ring-red-500/40",
        outline:
          "text-gray-900 [a&]:hover:bg-gray-100 [a&]:hover:text-gray-900 dark:text-white dark:[a&]:hover:bg-gray-700 dark:[a&]:hover:text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
