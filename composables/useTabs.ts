import { ref, provide, inject, type Ref } from 'vue'

export interface TabContext {
  selectedIndex: Ref<number>
  panels: Ref<{ header: () => any }[]>
  registerTabPanel: (panel: { header: () => any }) => number
  unregisterTabPanel: (index: number) => void
}

const TAB_CONTEXT_KEY = Symbol('TabContext')

export function createTabContext() {
  const selectedIndex = ref(0)
  const panels = ref<{ header: () => any }[]>([])

  const registerTabPanel = (panel: { header: () => any }): number => {
    const index = panels.value.length
    panels.value.push(panel)
    return index
  }

  const unregisterTabPanel = (index: number): void => {
    panels.value = panels.value.filter((_, i) => i !== index)
    if (selectedIndex.value >= panels.value.length) {
      selectedIndex.value = Math.max(0, panels.value.length - 1)
    }
  }

  const context: TabContext = {
    selectedIndex,
    panels,
    registerTabPanel,
    unregisterTabPanel
  }

  provide(TAB_CONTEXT_KEY, context)
  return context
}

export function useTabContext() {
  const context = inject<TabContext>(TAB_CONTEXT_KEY)
  if (!context) {
    throw new Error('useTabContext must be used within a TabGroup component')
  }
  return context
}