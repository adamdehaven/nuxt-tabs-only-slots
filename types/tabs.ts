import type { Ref } from 'vue'

export interface TabPanel {
  header: () => any
  id: string
}

export interface TabContext {
  selectedId: Ref<string | null>
  panels: Ref<TabPanel[]>
  registerPanel: (panel: TabPanel) => void
  unregisterPanel: (id: string) => void
}

export const TAB_CONTEXT_KEY = Symbol('TabContext')