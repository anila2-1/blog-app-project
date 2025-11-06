declare module '*.css' {
  export default '' as string
}

declare module '*.scss' {
  const content: Record<string, string>
  export default content
}
