/* eslint-disable */

declare module '*.module.scss' {
  const result: Record<string, string>

  export default result
}

declare module '*.json' {
  const value: any
  export default value
}

declare module '*.png' {
  const url: string
  export default url
}

declare module '*.md' {
  const url: string
  export default url
}

declare module '!!html-loader!*' {
  const content: string
  export default content
}
