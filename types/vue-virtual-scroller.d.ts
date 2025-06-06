declare module 'vue-virtual-scroller' {
  import { DefineComponent } from 'vue'

  export const DynamicScroller: DefineComponent<{
    items: any[]
    minItemSize: number
    pageMode?: boolean
  }>

  export const DynamicScrollerItem: DefineComponent<{
    item: any
    active: boolean
    'data-index': number
    minItemSize: number
    sizeDependencies?: any[]
  }>
} 