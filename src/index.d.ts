declare module 'element-plus/dist/locale/*.js'
declare module '*.svg' {
  const content: string
  export default content
}
declare module 'vuex' {
  function useStore<T = any>(key?: string): T
}
