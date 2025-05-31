/** @type {import('tailwindcss').Config} */
export default {
  content: ["./client/index.html", "./client/src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "purple-50": "#f8f5ff",
      },
      animation: {
        fadeIn: "fadeIn 0.2s ease-in-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      screens: {
        xs: "375px", // iPhone and other small mobile devices
      },
    },
  },
  plugins: [],
  safelist: [
    // Background colors
    "bg-purple-50",
    "bg-purple-100",
    "bg-purple-200",
    "bg-purple-300",
    "bg-purple-600",
    "bg-purple-700",
    "bg-blue-50",
    "bg-gray-50",
    "bg-gray-100",
    "bg-gray-200",
    "bg-black",
    "bg-red-50",

    // Dark mode background colors
    "dark:bg-gray-800",
    "dark:bg-gray-900",
    "dark:bg-gray-700",
    "dark:bg-purple-900",
    "dark:bg-purple-800",
    "dark:bg-purple-700",
    "dark:bg-purple-600",
    "dark:bg-purple-500",
    "dark:bg-blue-900",
    "dark:bg-blue-800",
    "dark:bg-red-900",
    "dark:bg-red-800",

    // Text colors
    "text-gray-400",
    "text-gray-500",
    "text-gray-600",
    "text-gray-700",
    "text-gray-800",
    "text-gray-900",
    "text-amber-500",
    "text-blue-500",
    "text-purple-500",
    "text-purple-600",
    "text-purple-800",
    "text-red-400",
    "text-red-500",
    "text-red-600",
    "text-white",

    // Dark mode text colors
    "dark:text-gray-100",
    "dark:text-gray-200",
    "dark:text-gray-300",
    "dark:text-gray-400",
    "dark:text-white",
    "dark:text-purple-300",
    "dark:text-purple-400",
    "dark:text-blue-300",
    "dark:text-red-300",

    // Font sizes
    "text-xs",
    "text-sm",
    "text-base",
    "text-lg",
    "text-xl",
    "text-2xl",
    "text-3xl",

    // Borders
    "border-gray-200",
    "border-gray-300",
    "border-purple-200",
    "border-purple-300",

    // Dark mode borders
    "dark:border-gray-600",
    "dark:border-gray-700",
    "dark:border-purple-700",
    "dark:border-purple-800",

    // Border radius
    "rounded-lg",
    "rounded-xl",
    "rounded-md",

    // Font weights
    "font-medium",
    "font-semibold",
    "font-bold",

    // Widths and heights
    "w-4",
    "w-6",
    "w-10",
    "w-12",
    "w-14",
    "h-4",
    "h-6",
    "h-10",
    "h-12",
    "h-14",
    "w-[76px]",

    // Backgrounds and opacities
    "bg-opacity-50",

    // Hover states
    "hover:bg-gray-100",
    "hover:bg-gray-200",
    "hover:bg-purple-100",
    "hover:bg-purple-200",
    "hover:bg-purple-700",
    "hover:text-gray-700",
    "hover:text-gray-800",
    "hover:text-red-600",
    "hover:shadow-md",
    "hover:border-purple-200",
    "hover:underline",

    // Dark mode hover states
    "dark:hover:bg-gray-700",
    "dark:hover:bg-gray-600",
    "dark:hover:bg-purple-800",
    "dark:hover:bg-purple-700",
    "dark:hover:text-gray-200",
    "dark:hover:text-gray-100",
    "dark:hover:text-red-300",
    "dark:hover:border-purple-700",

    // Group hover
    "group-hover:flex",
    "group-hover:invisible",
    "group-hover:scale-100",
    "group-hover:opacity-100",

    // Focus states
    "focus:outline-none",
    "focus:ring-2",
    "focus:ring-purple-300",
    "focus:ring-purple-500",

    // Text styling
    "line-clamp-2",

    // Overflow
    "overflow-hidden",
    "overflow-x-hidden",

    // Transforms
    "scale-95",

    // Shadows
    "shadow-sm",
    "shadow-md",

    // Transitions
    "transform",
    "transition-all",
    "transition-colors",
    "transition-opacity",
    "transition-shadow",
    "duration-200",
    "duration-300",
    "opacity-0",

    // Grid
    "grid",
    "grid-cols-1",
    "md:grid-cols-2",
    "gap-4",
    "col-span-full",

    // Scrollbar
    "scrollbar-hide",
    "smooth-scroll",

    // Mobile specific
    "xs:text-sm",
    "xs:p-2",
    "xs:px-3",
    "xs:py-1.5",
    "xs:gap-1",
    "xs:w-full",
    "xs:h-full",
  ],
};
