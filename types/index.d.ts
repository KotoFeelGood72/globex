/// <reference types="next" />
/// <reference types="react" />
/// <reference types="react-dom" />
/// <reference types="@nextui-org/react" />
/// <reference types="framer-motion" />
/// <reference types="next-themes" />
/// <reference types="tailwindcss" />

declare module "@nextui-org/theme" {
  import { NextUITheme } from "@nextui-org/react"
  export const nextui: (config?: any) => any
}

declare module "*.svg" {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>
  export default content
}
